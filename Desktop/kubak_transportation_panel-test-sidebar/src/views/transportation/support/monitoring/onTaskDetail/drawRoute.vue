<template>
  <div class="p-4">
    <div style="border-top: 1px solid var(--border-color-kubak)">
      <div class="mt-4">
        <p class="mb-4 text-xl font-medium">
          {{ $t("auth.area.regionInfo.centerPointTitle") }}
        </p>
        <div id="addLocationAreaMap">
          <div
            @click="undoDrawing"
            class="undoContainer flex justify-content-center align-items-center cursor-pointer"
          >
            <ion-icon
              name="arrow-undo-outline"
              class="text-lg"
              style="color: black"
            ></ion-icon>
          </div>
          <div
            @click="changeServantRouteExist"
            class="deleteContainer flex justify-content-center align-items-center cursor-pointer"
            v-if="drawSteps.length == 0"
          >
            <ion-icon
              name="trash-outline"
              class="text-lg"
              style="color: black"
              v-if="servantRoutePolyline"
            ></ion-icon>
            <ion-icon
              name="add-outline"
              class="text-lg"
              style="color: black"
              v-else
            ></ion-icon>
          </div>
        </div>
      </div>
    </div>
    <Message severity="error" v-if="startedDrawing && buttonSubmitted">{{
      $t("validationMessages.draw_error")
    }}</Message>

    <div class="pt-4 flex justify-content-end">
      <Button
        :label="$t('buttons.end_task')"
        :loading="requestStatusStore.loading"
        @click="submit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import L, { LatLng } from "leaflet";
import "leaflet-draw";
import decodeCoordinates from "@/composables/decodeCoordinates";
import {
  MapService,
  TaskManagerService,
  TaskStatusEnum,
} from "@/backend/transport";
import Message from "primevue/message";
import type { Step } from "@/common/models/drawStep";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";

const monitoringStore = MonitoringStore();
const requestStatusStore = requestStatus();
const dialogRef: any = inject("dialogRef");
const taskDetail = ref(dialogRef.value.data);
const startedDrawing = ref(false);
const buttonSubmitted = ref(false);

const drawSteps: Step[] = [];

onMounted(() => {
  taskDetail.value = dialogRef.value.data;
  mapRender();
});
const specifiedRoute = ref<[number, number][]>([]);
let matchedRoute: [number, number][] = [];
let map;
const servantRoutePolyline = ref();
const tileLayer = ref(
  monitoringStore.mapTileURL ??
    "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A"
);
let drawnItems = new L.FeatureGroup();
const drawOptions = {
  draw: {
    circle: false,
    polyline: true,
    polygon: false,
    rectangle: false,
    marker: false,
    circlemarker: false,
  },
  edit: {
    edit: false,
    remove: false,
    featureGroup: drawnItems,
  },
};
const drawControl = new (L.Control as any).Draw(drawOptions);
function mapRender() {
  map = L.map("addLocationAreaMap").setView([35.564558, 45.437937], 12);
  drawnItems = L.featureGroup().addTo(map);

  L.tileLayer(tileLayer.value, {
    subdomains: ["a", "b"],
    maxZoom: 18,
    id: "cl5z8606q002o14odi8ee3hjr",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
  }).addTo(map);
  map.addControl(drawControl);
  if (taskDetail?.value?.servantRoute) {
    const points = decodeCoordinates(taskDetail?.value?.servantRoute) ?? [];
    specifiedRoute.value = points;
    servantRoutePolyline.value = L.polyline(points, { color: "black" }).addTo(
      map
    );
  }

  map.on("draw:created", createdPoint);
  map.on("draw:drawstart", () => {
    startedDrawing.value = true;
  });
  map.on("draw:drawstop", () => {
    startedDrawing.value = false;
  });
}
function createdPoint(e) {
  const step: Step = {
    drawRoute: [],
    matchedRoute: [],
    latLngs: [],
  };
  e.layer._latlngs.forEach((element) => {
    specifiedRoute.value?.push([element.lat, element.lng]);
    step.latLngs.push(specifiedRoute.value.length - 1);
  });
  step.drawRoute.push(e.layer);
  const newRoute: LatLng[] | undefined = specifiedRoute.value?.map(
    (element) => {
      return { lat: element[0], lng: element[1] } as LatLng;
    }
  );
  MapService.mapMatching({ requestBody: newRoute }).then((res: any) => {
    step.matchedRoute.push(
      L.polyline(decodeCoordinates(res.route as string), {
        color: "black",
      }).addTo(map)
    );
  });
  drawnItems.addLayer(e.layer);
  drawSteps.push(step);
}
async function submit() {
  buttonSubmitted.value = true;
  if (startedDrawing.value) {
    return;
  }

  const newRoute: LatLng[] | undefined = specifiedRoute.value?.map(
    (element) => {
      return { lat: element[0], lng: element[1] } as LatLng;
    }
  );

  await TaskManagerService.manageTask({
    requestId: taskDetail.value.requestId,
    requestBody: {
      status: TaskStatusEnum.END,
      specifiedRoute: newRoute,
    },
  }).then(() => {
    dialogRef.value.close();
  });
  buttonSubmitted.value = false;
}
async function undoDrawing() {
  for (
    let index = drawSteps[drawSteps.length - 1].latLngs.length - 1;
    index >= 0;
    index--
  ) {
    specifiedRoute.value.splice(
      drawSteps[drawSteps.length - 1].latLngs[index],
      1
    );
  }
  map.removeLayer(
    drawSteps[drawSteps.length - 1].matchedRoute[
      drawSteps[drawSteps.length - 1].matchedRoute.length - 1
    ]
  );
  map.removeLayer(
    drawSteps[drawSteps.length - 1].drawRoute[
      drawSteps[drawSteps.length - 1].drawRoute.length - 1
    ]
  );
  drawSteps.pop();
  matchedRoute.pop();

  const newRoute: LatLng[] | undefined = specifiedRoute.value?.map(
    (element) => {
      return { lat: element[0], lng: element[1] } as LatLng;
    }
  );
  if (newRoute.length > 0) {
    await MapService.mapMatching({ requestBody: newRoute }).then((res: any) => {
      matchedRoute = decodeCoordinates(res.route as string);
    });
  }
}
function changeServantRouteExist() {
  if (servantRoutePolyline.value) {
    map.removeLayer(servantRoutePolyline.value);
    specifiedRoute.value = [];
    servantRoutePolyline.value = undefined;
  } else {
    if (taskDetail?.value?.servantRoute) {
      const points = decodeCoordinates(taskDetail?.value?.servantRoute) ?? [];
      specifiedRoute.value = points;
      servantRoutePolyline.value = L.polyline(points, { color: "black" }).addTo(
        map
      );
    }
  }
}
</script>
<style lang="scss">
#addLocationAreaMap {
  height: 800px;
  width: 100%;
  .undoContainer {
    left: 0;

    height: 33px;
    width: 33px;
    background-color: white;
    z-index: 1000000;
    position: absolute;
    top: auto;
    margin-top: 130px;
    margin-left: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  .deleteContainer {
    height: 33px;
    left: 0;

    width: 33px;
    background-color: white;
    z-index: 1000000;
    position: absolute;
    top: auto;
    margin-top: 170px;
    margin-left: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
}
</style>
