<template>
  <div>
    <div id="areaContainerMap"></div>
    <div class="areaList">
      <AreaList
        :serviceAreasPrice="serviceAreasPrice"
        @areaReorder="areaReorder"
        @areaLocation="areaLocation"
        @deleteAreaPrice="deleteAreaPrice"
        @editServiceAreaPrice="editServiceAreaPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import "leaflet-draw";
import { onMounted, ref } from "vue";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";
import { currentUser } from "@/stores/currentUser";
import "@maplibre/maplibre-gl-leaflet";
import maplibregl from "maplibre-gl";
import { ServiceAreaPriceService } from "@/backend/transport";
import { useRoute } from "vue-router";
import AreaList from "./areaList.vue";
import type { AreaPriceDto } from "@/backend/transport/models/AreaPriceDto";
import { useDialog } from "primevue/usedialog";
import CreateServiceAreaPriceComponent from "./createServiceAreaPrice.vue";
import EditServiceAreaPriceComponent from "./editServiceAreaPrice.vue";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let dialogRef;
const dialog = useDialog();

const maplibreGlOptions = {
  style: "https://tiles.b.kubak.co/styles/kubak/style.json",
  fadeAnimation: false,
  zoomAnimation: true,
};
const currentUserStore = currentUser();
const monitoringStore = MonitoringStore();
const route = useRoute();
const toast = toastStore();
const { t } = useI18n();

let map: any;
const tileLayer = ref(monitoringStore.mapTileURL);
let drawnItems: any;
const serviceAreasPrice = ref<AreaPriceDto[] | any>([]);

function mapRender() {
  map = L.map("areaContainerMap").setView(
    [
      currentUserStore?.userInfo?.region?.location?.lat ?? 35.564558,
      currentUserStore?.userInfo?.region?.location?.lng ?? 45.437937,
    ],
    12
  );
  drawnItems = L.featureGroup().addTo(map);

  if (tileLayer.value.includes("kubak")) {
    L.maplibreGL(maplibreGlOptions).addTo(map);
  } else {
    L.tileLayer(tileLayer.value, {
      subdomains: ["a", "b"],
      maxZoom: 20,
    }).addTo(map);
  }
  map.addControl(
    new (L.Control as any).Draw({
      draw: {
        circle: false,
        polyline: true,
        polygon: true,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: false,
      },
    })
  );

  map.on("draw:created", createdShape);
  map.on("draw:edited", editShape);
  for (const area of serviceAreasPrice.value) {
    const areaPoints = area.boundary?.map((point) => [point.lat, point.lng]);
    const color = numberToColor(area.id);

    const polygon: any = L.polygon(areaPoints, {
      color: color,
    }).addTo(map);
    area.color = color;
    polygon.polygonId = area.id;
    drawnItems.addLayer(polygon);
  }
}
async function createdShape(e) {
  dialogRef = dialog.open(CreateServiceAreaPriceComponent, {
    data: {
      boundary: e.layer._latlngs[0].map((item) => {
        return { lng: item.lng, lat: item.lat };
      }),
    },
    emits: {
      onCreateServiceAreaPrice: async () => {
        await getServiceAreaPrice();
        map.remove();
        mapRender();
      },
    },

    props: {
      header: "reusables.dialog.add",
      breakpoints: {
        "3000px": "50vw",
        "1000px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
async function editServiceAreaPrice(data) {
  dialogRef = dialog.open(EditServiceAreaPriceComponent, {
    data: {
      serviceAreaPriceData: data,
    },
    emits: {
      onCreateServiceAreaPrice: async () => {
        await getServiceAreaPrice();
        map.remove();
        mapRender();
      },
    },

    props: {
      header: "reusables.dialog.add",
      breakpoints: {
        "3000px": "50vw",
        "1000px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
async function editShape(event) {
  for (const field in event.layers._layers) {
    const serviceArea = serviceAreasPrice.value?.find(
      (area) => area.id === event.layers._layers[field].polygonId
    );
    if (serviceArea) {
      await ServiceAreaPriceService.updateServiceAreaPrice({
        id: serviceArea.id,
        requestBody: {
          boundary: event.layers._layers[field]._latlngs[0].map((item) => {
            return { lng: item.lng, lat: item.lat };
          }),
          destinationTypes: serviceArea.destinationTypes,
        },
      }).then(() => {
        toast.changeToastState({
          severity: t("toasts.added_success_header"),
          summary: t("toasts.added_success_desc", {
            field: t("transportation.services.area.title"),
          }),
          type: "success",
        });
      });
      await getServiceAreaPrice();
      map.remove();
      mapRender();
    }
  }
}

onMounted(async () => {
  if (maplibregl.getRTLTextPluginStatus() != "loaded") {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
      () => {
        ///
      }
    );
  }
  await getServiceAreaPrice();
  mapRender();
});

async function getServiceAreaPrice() {
  await ServiceAreaPriceService.getServiceAreaPrices({
    serviceId: +route.params.id,
  }).then((res) => {
    serviceAreasPrice.value = res;
  });
}
async function areaReorder(order: number, areaPriceId: number) {
  await ServiceAreaPriceService.updateServiceAreaPriceOrder({
    id: areaPriceId,
    requestBody: {
      requestedOrder: order,
    },
  });
  await getServiceAreaPrice();
  map.remove();
  mapRender();
}
function numberToColor(number) {
  const hash = (number * 2654435761) & 0xffffff;
  const colorHex = hash.toString(16).padStart(6, "0");
  return `#${colorHex}`;
}

function areaLocation(area) {
  map.setView([area.boundary[0].lat, area.boundary[0].lng], 14);
}
async function deleteAreaPrice(data) {
  await ServiceAreaPriceService.deleteServiceAreaPrice({
    id: data.id,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.delete_success_header"),
      summary: t("toasts.delete_success_desc", {
        field: t("transportation.services.area.title"),
      }),
      type: "success",
    });
  });
  await getServiceAreaPrice();
  map.remove();
  mapRender();
}
</script>
<style lang="scss">
#areaContainerMap {
  height: calc(100vh - 250px);
  width: 100%;
}
.areaList {
  position: absolute;
  background-color: var(--secondary-background-color-kubak);
  height: auto;
  min-width: 300px;
  right: 100px;
  top: 120px;
  margin: 10px;
  border-radius: 4px;
  padding: 10px;
  z-index: 10000;
}
</style>
