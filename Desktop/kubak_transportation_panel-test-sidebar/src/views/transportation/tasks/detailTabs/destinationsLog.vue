<template>
  <div class="w-full flex justify-content-center align-items-center">
    <div class="destinationRoutesLog destinationRoutesStatus w-full">
      <div class="w-full grid" style="min-height: calc(100vh - 200px)">
        <div class="col-12 xl:col-8">
          <div id="destinationsRouteMap"></div>
        </div>
        <div class="col-12 xl:col-4">
          <div
            class="h-full flex flex-column justify-content-between align-items-around"
          >
            <div
              class="timeLineDestinationContainer w-full h-full flex flex-column justify-content-center align-items-center"
            >
              <TabView style="height: 100%; width: 100%">
                <TabPanel header="task logs">
                  <div
                    class="w-full flex flex-column justify-content-center align-items-center"
                    style="height: calc(100vh - 400px)"
                  >
                    <div>
                      <h1 class="text-center mb-4">Task Status Log</h1>
                      <Timeline :value="taskTimeline" style="">
                        <template #marker="slotProps">
                          <div
                            v-html="taskStatusSvg[slotProps.item.status]"
                          ></div>
                        </template>
                        <template #opposite="slotProps">
                          <small class="p-text-secondary">{{
                            slotProps.item.date
                          }}</small>
                        </template>
                        <template #content="slotProps">
                          {{
                            $t(`statuses.taskStatus.${slotProps.item.status}`)
                          }}
                        </template>
                      </Timeline>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel header="destinations detail">
                  <!-- card detail -->
                  <div
                    class="border-gray-400 p-3 border-round-lg mb-5 bg-opacity-30 shadow-sm"
                    style=""
                  >
                    <div class="flex justify-content-between flex-wrap p-2">
                      <div class="icon-text">
                        <span
                          class="p-2 border-circle"
                          style="
                            background-color: var(
                              --icon-background-color-kubak
                            );
                          "
                        >
                          <ion-icon
                            name="location-outline"
                            style="
                              font-size: 2rem;
                              color: var(--icon-color-kubak);
                            "
                          ></ion-icon>
                        </span>
                        <span class="pt-3">
                          {{ props.taskDetailData.distance }}</span
                        >
                      </div>
                      <div class="icon-text">
                        <span
                          class="p-2 border-circle"
                          style="
                            background-color: var(
                              --icon-background-color-kubak
                            );
                          "
                        >
                          <ion-icon
                            name="time-outline"
                            style="
                              font-size: 2rem;
                              color: var(--icon-color-kubak);
                            "
                          ></ion-icon>
                        </span>

                        <span class="pt-3">{{
                          props.taskDetailData.duration
                        }}</span>
                      </div>
                      <div class="icon-text">
                        <span
                          class="p-2 border-circle"
                          style="
                            background-color: var(
                              --icon-background-color-kubak
                            );
                          "
                        >
                          <ion-icon
                            name="cash-outline"
                            style="
                              font-size: 2rem;
                              color: var(--icon-color-kubak);
                            "
                          ></ion-icon>
                        </span>

                        <div class="pt-2 font-semibold">
                          {{ props.taskDetailData.rawPrice }}
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex justify-content-center align-item-center px-2 py-4"
                    >
                      <div
                        :class="`flex justify-content-center align-item-center   w-full p-2 border-round-lg ${taskDetailData.status}`"
                        style="color: white"
                      >
                        <div
                          class="flex justify-content-center align-item-center"
                        >
                          <ion-icon
                            name="information-circle-outline"
                            style="font-size: 2rem; color: white"
                          ></ion-icon>
                          <span class="p-2">
                            {{ taskDetailData.status }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-full h-full flex flex-column justify-content-center align-items-center"
                  >
                    <Accordion :activeIndex="0" class="w-full">
                      <AccordionTab
                        v-for="(destination, index) of destinations"
                        class="w-full"
                        :key="index"
                      >
                        <template #header>
                          <div
                            :style="`color:${getMultiDestinationRouteColor(
                              index
                            )}`"
                          >
                            {{ `Destination ${index + 1}` }}
                          </div>
                        </template>
                        <Timeline
                          :value="destination.logs"
                          layout="horizontal"
                          align="top"
                        >
                          <template #marker="slotProp">
                            <div
                              style="
                                height: 1rem;
                                width: 1rem;
                                border-radius: 50%;
                              "
                              :class="slotProp.item.status"
                            ></div>
                          </template>
                          <template #content="slotProps">
                            <p>
                              {{
                                moment
                                  .utc(slotProps.item.date)
                                  .local()
                                  .format("DD/MM/YYYY")
                              }}
                            </p>
                            <p class="my-1">
                              {{
                                moment
                                  .utc(slotProps.item.date)
                                  .local()
                                  .format("HH:mm:ss")
                              }}
                            </p>
                          </template>
                          <template #opposite="slotProps">
                            {{ slotProps.item.status }}
                          </template>
                        </Timeline>
                        <div
                          class="flex justify-content-center my-4 py-4 border-round-lg"
                          style="
                            background-color: var(
                              --icon-background-color-kubak
                            );
                          "
                        >
                          <ion-icon
                            name="location-outline"
                            class="text-xl mx-1"
                          ></ion-icon>

                          {{ destination.targetLocationTitle }}
                        </div>
                        <div
                          class="flex justify-content-center align-items-center"
                        >
                          <div class="flex flex-wrap align-items-center">
                            <div class="col-6">
                              <ion-icon name="location-outline"></ion-icon>
                              {{ convertDistance(destination.distance) }}
                            </div>
                            <div class="col-6">
                              <ion-icon name="time-outline"></ion-icon>

                              {{ convertTime(destination.duration) }}
                            </div>
                            <div class="col-6">
                              <ion-icon name="cash-outline"></ion-icon>

                              {{ destination.price }}
                            </div>
                            <div class="col-6 flex align-items-center">
                              <div
                                :class="`mx-1 p-2 border-round-lg ${destination.status}`"
                                style="color: white"
                              >
                                {{ destination.status }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </TabPanel>
              </TabView>
            </div>
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
import decodeCoordinates from "@/composables/decodeCoordinates";
import Timeline from "primevue/timeline";
import moment from "moment";
import { getMultiDestinationRouteColor } from "../../support/monitoring/composables/multiDestinationRouteColos";
import { taskStatusSvg } from "@/composables/taskStatusIcons";
import { toLocalTimeFormat } from "@/composables/customRequest";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { convertDistance } from "@/composables/convertDistance";
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

const taskDetail = ref();
const destinations = ref();
let map;
const taskTimeline = ref<
  {
    status?: undefined;
    date: string;
  }[]
>([]);
onMounted(() => {
  taskDetail.value = props.taskDetailData;
  destinations.value = props.taskDetailData?.destinations;
  renderData();
});
watch(
  () => props.taskDetailData,
  () => {
    taskDetail.value = props.taskDetailData;
    destinations.value = props.taskDetailData?.destinations;
  }
);
function renderData() {
  if (props.taskDetailData) {
    if (maplibregl.getRTLTextPluginStatus() != "loaded") {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        () => {
          //nothing
        }
      );
    }
    if (taskDetail.value) {
      mapRender();
      addIcons();
      drawRoute();
    }
  }
}
function mapRender() {
  map = leaflet
    .map("destinationsRouteMap", {
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

function addIcons() {
  if (!taskDetail.value?.taskStatusLogs) return;
  for (const taskStatus of taskDetail.value.taskStatusLogs) {
    if (taskStatus.location) {
      const myIcon = leaflet.divIcon({
        className: "leaflet-data-marker",
        html: taskStatusSvg[taskStatus.status],
      });
      leaflet
        .marker([taskStatus.location.lat, taskStatus.location.lng], {
          icon: myIcon,
        })
        .addTo(map);
    }
    taskTimeline.value.push({
      status: taskStatus.status,
      date:
        moment(taskStatus.date).format("DD/MM/YYYY") +
        " " +
        toLocalTimeFormat(taskStatus.date),
    });
  }
}
function drawRoute() {
  let index = 0;
  for (const destination of destinations.value) {
    const route = destination.routes.find((x) => x.isAccepted);
    if (!route) continue;
    leaflet
      .polyline(decodeCoordinates(route?.optimizedRoute), {
        color: getMultiDestinationRouteColor(index),
      })
      .addTo(map);
    leaflet
      .circleMarker(decodeCoordinates(route?.optimizedRoute)[0], {
        radius: 8,
        color: getMultiDestinationRouteColor(index),
        fillColor: getMultiDestinationRouteColor(index),
        fillOpacity: 0.8,
      })
      .addTo(map);
    index++;
  }
}
</script>
<style lang="scss">
#destinationsRouteMap {
  height: 100%;
  border-radius: 10px;
  min-height: calc(100vh - 500px);
}
.destinationRoutesLog {
  .Inactive {
    background-color: #97999b;
  }
  .Active {
    background-color: #22be60;
  }
  .Arrived {
    background-color: var(--arrived-color-kubak);
  }
  .Canceled {
    background-color: #ca472f;
  }
}
.timeLineDestinationContainer {
  min-height: calc(100vh - 500px);
  padding: 30px 10px;
  background-color: var(--background-color-kubak);
  border-radius: 5px;

  .p-timeline-event-content {
    margin-top: 8px;
  }
  .p-timeline-event-opposite {
    margin-top: 8px;
  }
  .p-tabview .p-tabview-panels {
    height: 90% !important;
    width: 100% !important;
  }
  .p-tabview-panel {
    width: 100% !important;
  }
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.destinationRoutesStatus {
  .Reserve {
    background-color: #97999b;
  }
  .Start {
    background-color: #224ebe;
  }
  .Arrive {
    background-color: var(--arrived-color-kubak);
  }
  .Stop,
  .CanceledAfterStart,
  .CanceledAfterArrive,
  .CanceledAfterReserve {
    background-color: #ca472f;
  }

  .Continue {
    background-color: #a28a0f;
  }
  .End {
    background-color: #22be60;
  }
}
</style>
