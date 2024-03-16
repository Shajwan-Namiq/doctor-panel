<template>
  <div class="grid">
    <div class="col-12 xl:col-8">
      <div id="stopsRouteMap"></div>
    </div>
    <div class="col-12 xl:col-4">
      <div class="timeLineContainer w-full h-full">
        <div
          class="flex align-items-center justify-content-between p-4 flex-wrap border-round-md"
          style="background-color: white"
        >
          <div
            class="flex flex-column justify-content-center align-items-center"
          >
            <p>{{ $t("transportation.tasks.stopLog.numberOfSTops") }}</p>
            <p class="mt-1">{{ stops.numberOfStops }}</p>
          </div>
          <div
            class="flex flex-column justify-content-center align-items-center"
          >
            <p>{{ $t("transportation.tasks.stopLog.totalTime") }}</p>

            <p class="mt-1">{{ convertTime(stops.totalStopTimeInSecond) }}</p>
          </div>
          <div
            class="flex flex-column justify-content-center align-items-center"
          >
            <p>{{ $t("transportation.tasks.stopLog.numberOfSTops") }}</p>

            <p class="mt-1">{{ convertTime(stops.totalStopTimeInSecond) }}</p>
          </div>
        </div>
        <div
          class="w-full h-full flex flex-column justify-content-center align-items-center"
        >
          <div>
            <Timeline :value="stops.logs" style="">
              <template #marker="slotProps">
                <div
                  class="h-3rem w-3rem m-2 border-circle flex align-items-center justify-content-center"
                  :style="`background-color: ${returnColorDependOnStatus(
                    slotProps.item.status
                  )}; color: white`"
                >
                  <small style="font-size: 10px">
                    {{
                      $t(
                        `transportation.tasks.statuses.${slotProps.item.status}`
                      )
                    }}
                  </small>
                </div>
              </template>
              <template #opposite="slotProps">
                <small>
                  {{
                    moment.utc(slotProps.item.date).local().format("DD/MM/YYYY")
                  }}
                </small>
                <br />
                <small class="my-1">
                  {{
                    moment.utc(slotProps.item.date).local().format("HH:mm:ss")
                  }}
                </small>
              </template>
              <template #content="slotProps">
                <p>{{ slotProps.item.locationTitle }}</p>
              </template>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import { currentUser } from "@/stores/currentUser";
import { onMounted, ref, watch } from "vue";
import { MonitoringStore } from "../../support/monitoring/monitoringStore";
import maplibregl from "maplibre-gl";
import Timeline from "primevue/timeline";
import moment from "moment";
import { convertTime } from "@/composables/convertTime";

const props = defineProps(["taskDetailData"]);
const currentUserStore = currentUser();
const monitoringStore = MonitoringStore();
const maplibreGlOptions = {
  style: "https://tiles.b.kubak.co/styles/kubak/style.json",
  fadeAnimation: false,
  zoomAnimation: true,
};

const tileLayer = ref(monitoringStore.mapTileURL);

const taskDetail = ref(props.taskDetailData);
const stops = ref(props.taskDetailData?.taskStopLogDetail);
let map;

onMounted(() => {
  renderData();
});
watch(
  () => props.taskDetailData,
  () => {
    taskDetail.value = props.taskDetailData;
    stops.value = props.taskDetailData?.taskStopLogDetail;
  }
);
function renderData() {
  if (props.taskDetailData) {
    if (maplibregl.getRTLTextPluginStatus() != "loaded") {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        () => {
          ///
        }
      );
    }
    if (taskDetail.value) {
      mapRender();
      drawRoute();
    }
  }
}
function mapRender() {
  map = leaflet
    .map("stopsRouteMap", {
      zoomControl: false,
    })
    .setView(
      [
        taskDetail.value?.origin?.lat ??
          currentUserStore?.userInfo?.region?.location?.lat ??
          35.564558,
        taskDetail.value?.origin?.lng ??
          currentUserStore?.userInfo?.region?.location?.lng ??
          45.437937,
      ],
      14
    );
  if (tileLayer.value.includes("kubak")) {
    leaflet.maplibreGL(maplibreGlOptions).addTo(map);
  } else {
    leaflet
      .tileLayer(tileLayer.value, {
        subdomains: ["a", "b"],
        maxZoom: 20,
      })
      .addTo(map);
  }
}

function drawRoute() {
  for (const log of stops.value.logs) {
    leaflet
      .circleMarker(log.location, {
        radius: 10,
        color: returnColorDependOnStatus(log.status),
        fillColor: returnColorDependOnStatus(log.status),
        fillOpacity: 0.8,
      })
      .addTo(map);
  }
}
function returnColorDependOnStatus(status) {
  switch (status) {
    case "Stop":
      return "#fba801";
    case "Continue":
      return "#db0efd";
    case "End":
      return "#22be60";
  }
}
</script>
<style lang="scss" scoped>
#stopsRouteMap {
  height: 100%;
  border-radius: 10px;
  min-height: calc(100vh - 500px);
}
.timeLineContainer {
  padding: 30px 10px;
  pointer-events: none;
  background-color: var(--background-color-kubak);
  border-radius: 6px;
}
</style>
