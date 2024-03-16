<template>
  <div class="page-style">
    <div class="page-container">
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
          @click="deletePoint"
          class="deleteContainer flex justify-content-center align-items-center cursor-pointer"
          v-if="routingPoints.origin"
        >
          <ion-icon
            name="trash-outline"
            class="text-lg"
            style="color: black"
          ></ion-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import L, { LatLng } from "leaflet";
import "leaflet-draw";
import decodeCoordinates from "@/composables/decodeCoordinates";
import { MapService } from "@/backend/transport";
import type { Step } from "@/common/models/drawStep";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";

const monitoringStore = MonitoringStore();
const startedDrawing = ref(false);
const drawSteps: Step[] = [];
const routingPoints = ref({
  destination: [] as LatLng[],
  origin: undefined,
});

onMounted(() => {
  mapRender();
});
const specifiedRoute = ref<[number, number][]>([]);
let matchedRoute: [number, number][] = [];
let map;
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
    marker: true,
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

  map.on("draw:created", createdPoint);
  map.on("draw:drawstart", () => {
    startedDrawing.value = true;
  });
  map.on("draw:drawstop", () => {
    startedDrawing.value = false;
  });
}
function createdPoint(e) {
  if (e.layerType === "marker") {
    const requestIcon = L.divIcon({
      className: "leaflet-data-marker",
      html: routingPoints.value.origin ? marker("#0044CB") : marker("black"),
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    if (routingPoints.value.origin) {
      routingPoints.value.destination.push(e.layer._latlng);
      const markerMark: any = L.marker(e.layer._latlng, {
        icon: requestIcon,
      }).addTo(map);
      markerMark._leafletId = `destination${routingPoints.value.destination.length}`;

      MapService.routing({
        requestBody: {
          origin: routingPoints.value.origin,
          destination: routingPoints.value.destination,
        },
      }).then((res: any) => {
        const routingPolyline: any = L.polyline(
          decodeCoordinates(res.route as string),
          {
            color: "#3D4042",
            dashArray: "10,10",
            className: "estimatedRoute",
          }
        ).addTo(map);
        routingPolyline._leafletId = "routing";
      });
    } else {
      routingPoints.value.origin = e.layer._latlng;
      const markerMark: any = L.marker(e.layer._latlng, {
        icon: requestIcon,
      }).addTo(map);
      markerMark._leafletId = "origin1";
    }
  } else {
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
async function deletePoint() {
  let layerId;
  if (routingPoints.value.destination.length > 0) {
    routingPoints.value.destination.pop();
    layerId = `destination${routingPoints.value.destination.length + 1}`;
  } else {
    routingPoints.value.origin = undefined;
    layerId = "origin1";
  }
  for (const index in map._layers) {
    if (
      map._layers[index]._leafletId == layerId ||
      map._layers[index]._leafletId == "routing"
    ) {
      map.removeLayer(map._layers[index]);
    }
  }
  if (
    routingPoints.value.destination.length > 0 &&
    routingPoints.value.origin
  ) {
    MapService.routing({
      requestBody: {
        origin: routingPoints.value.origin,
        destination: routingPoints.value.destination,
      },
    }).then((res: any) => {
      const routingPolyline: any = L.polyline(
        decodeCoordinates(res.route as string),
        {
          color: "#3D4042",
          dashArray: "10,10",
          className: "estimatedRoute",
        }
      ).addTo(map);
      routingPolyline._leafletId = "routing";
    });
  }
}
function marker(color: string) {
  return `<svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="${color}"/>
`;
}
</script>
<style lang="scss">
#addLocationAreaMap {
  height: calc(100vh - 150px);
  width: 100%;
  .undoContainer {
    left: 0;
    height: 33px;
    width: 33px;
    background-color: white;
    z-index: 1000000;
    position: absolute;
    top: auto;
    margin-top: 160px;
    margin-left: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  .deleteContainer {
    left: 0;

    height: 33px;
    width: 33px;
    background-color: white;
    z-index: 1000000;
    position: absolute;
    top: auto;
    margin-top: 200px;
    margin-left: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
}
.estimatedRoute {
  animation: dash 1s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}
</style>
