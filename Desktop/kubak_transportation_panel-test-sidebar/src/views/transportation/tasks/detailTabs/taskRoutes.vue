<template>
  <div>
    <div class="mt-6">
      <TabView class="w-full">
        <TabPanel
          class="w-full"
          v-for="(destination, index) in taskDetail?.destinations"
          :key="index"
        >
          <template #header>
            <div class="flex align-items-center">
              <div>
                {{ "destination " + (+index + 1) }}
              </div>
              <div
                class="mx-2 p-2 flex justify-content-center align-items-center border-round-md destinationHideShow"
                @click.stop.prevent="hideDestination(destination.id)"
              >
                <ion-icon
                  name="eye-off-outline"
                  class="text-xl"
                  v-if="destination.hideDestination"
                ></ion-icon>
                <ion-icon name="eye-outline" class="text-xl" v-else></ion-icon>
              </div>
            </div>
          </template>
          <template #default>
            <div class="grid w-full">
              <div
                v-for="(route, index) in destination?.routes"
                :key="index"
                class="mb-3 flex flex-column justify-content-between col-3 cursor-pointer"
                style="min-width: 400px"
                @click="hideShowRoute(route)"
              >
                <div
                  class="flex flex-column justify-content-between routeContainer p-3"
                >
                  <div class="flex justify-content-between">
                    <div class="-mt-2 -mx-2">
                      <ion-icon
                        name="eye-outline"
                        class="text-xl"
                        v-if="!route.hideRoute"
                      ></ion-icon>
                      <ion-icon
                        name="eye-off-outline"
                        class="text-xl"
                        v-else
                      ></ion-icon>
                    </div>
                    <div
                      class="flex align-items-center"
                      v-if="route.isAccepted"
                    >
                      <ion-icon
                        name="checkmark-done-circle-outline"
                        class="text-2xl"
                        style="color: #2e6700"
                      ></ion-icon>
                      <p class="mx-1">
                        {{
                          $t(`transportation.tasks.routeDetail.acceptedRoute`)
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="flex align-items-center">
                    <img
                      :src="returnImage(route.routeType)"
                      style="width: 33px; height: 33px"
                    />
                    <div class="mx-2">
                      {{
                        $t(
                          `transportation.tasks.routeDetail.taskRouteType.${route?.routeType}`
                        )
                      }}
                    </div>
                  </div>
                  <div class="flex justify-content-between align-items-center">
                    <div class="flex">
                      <div
                        class="flex align-items-center justify-content-center"
                      >
                        <ion-icon name="cash-outline" class="mx-1"></ion-icon>
                        <p class="text-sm">
                          {{ Math.round(route.taskPriceForThisRoute) }}
                        </p>
                      </div>
                      <div
                        class="flex align-items-center justify-content-center mx-2"
                      >
                        <ion-icon name="earth-outline" class="mx-1"></ion-icon>
                        <p class="text-sm">
                          {{ convertDistance(route.routeDistance) }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <SelectButton
                        :options="options"
                        optionLabel="value"
                        dataKey="value"
                        aria-labelledby="custom"
                        v-model="route.showRouteType"
                        :unselectable="false"
                        @click.stop.prevent="
                          changeRouteType(route.showRouteType?.value, route)
                        "
                      >
                        <template #option="slotProps">
                          <div>
                            <img
                              :src="slotProps.option.image"
                              style="height: 15px; width: 20px"
                            />
                          </div>
                        </template>
                      </SelectButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </TabPanel>
      </TabView>
      <div class="w-full grid" style="min-height: calc(100vh - 500px)">
        <div class="col-12 xl:col-8">
          <div id="mapDetailContainer" class="w-full"></div>
        </div>
        <div class="col-12 xl:col-4">
          <div
            class="h-full flex flex-column justify-content-between align-items-around"
          >
            <div
              class="timeLineContainer w-full h-full flex flex-column justify-content-center align-items-center"
            >
              <div>
                <h1 class="text-center mb-4">Task Status Log</h1>
                <Timeline :value="taskTimeline" style="">
                  <template #marker="slotProps">
                    <div v-html="taskStatusSvg[slotProps.item.status]"></div>
                  </template>
                  <template #opposite="slotProps">
                    <small class="p-text-secondary">{{
                      slotProps.item.date
                    }}</small>
                  </template>
                  <template #content="slotProps">
                    {{ $t(`statuses.taskStatus.${slotProps.item.status}`) }}
                  </template>
                </Timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { MonitoringStore } from "../../support/monitoring/monitoringStore";
import { currentUser } from "@/stores/currentUser";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import decodeCoordinates from "@/composables/decodeCoordinates";
import { taskStatusSvg } from "@/composables/taskStatusIcons";
import moment from "moment";
import Timeline from "primevue/timeline";
import servantTrackedRoute from "@/static/images/routes/servantRoute.png";
import panelProvidedRoute from "@/static/images/routes/panelProvidedRoute.png";
import servantLocalStoredRoute from "@/static/images/routes/servantLocalStoredRoute.png";
import estimatedRoute from "@/static/images/routes/estimatedRoute.png";
import { TaskRouteType } from "@/backend/transport";
import { convertDistance } from "@/composables/convertDistance";
import { toLocalTimeFormat } from "@/composables/customRequest";
import SelectButton from "./selectRouteButton.vue";
import OptimizedRoute from "./routeIcons/optimizedRoute.svg";
import OptimizedPoint from "./routeIcons/optimizedPoint.svg";
import RawPoint from "./routeIcons/rawPoint.svg";
import RawRoute from "./routeIcons/rawRoute.svg";
import maplibregl from "maplibre-gl";
import RouteToClientImage from "@/static/images/routes/servantToClientRoute.png";
import "@maplibre/maplibre-gl-leaflet";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

enum RouteTypeEnum {
  OPTIMIZED = "optimizedRoute",
  Raw = "rawRoute",
}
const maplibreGlOptions = {
  style: "https://tiles.b.kubak.co/styles/kubak/style.json",
  fadeAnimation: false,
  zoomAnimation: true,
};
enum ShowRouteTypesEnum {
  OPTIMIZEDPOINT = "optimizedPoint",
  RAWPOINT = "rawPoint",
  OPTIMIZEDROUTE = "optimizedRoute",
  RAWROUTE = "rawRoute",
}
const monitoringStore = MonitoringStore();
const currentUserStore = currentUser();
const points = ref<any>([]);
const options = ref([
  { value: ShowRouteTypesEnum.OPTIMIZEDROUTE, image: OptimizedRoute },
  { value: ShowRouteTypesEnum.RAWROUTE, image: RawRoute },
  { value: ShowRouteTypesEnum.OPTIMIZEDPOINT, image: OptimizedPoint },
  { value: ShowRouteTypesEnum.RAWPOINT, image: RawPoint },
]);
const taskTimeline = ref<
  {
    status?: undefined;
    date: string;
  }[]
>([]);
const taskRoutesPolyline = ref<
  {
    taskRouteType: any;
    polyline: any;
    type: RouteTypeEnum;
    destinationId: number;
    routeId: number;
  }[]
>([]);
const taskDetail = ref();
const props = defineProps(["taskDetailData"]);
watch(
  () => props.taskDetailData,
  () => {
    taskDetail.value = props.taskDetailData;
    renderData();
  }
);
let map;
const tileLayer = ref(monitoringStore.mapTileURL);
onMounted(async () => {
  renderData();
});
function renderData() {
  if (props.taskDetailData) {
    if (maplibregl.getRTLTextPluginStatus() != "loaded") {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        () => {
          //
        }
      );
    }
    taskDetail.value = props.taskDetailData;

    if (taskDetail.value) {
      taskDetail.value.taskRoutes = taskDetail.value.taskRoutes.map(
        (routeData) => {
          const newRouteData = {
            ...routeData,
            showRouteType: routeData.optimizedRoute
              ? options.value[0]
              : options.value[1],
          };
          return newRouteData;
        }
      );
      mapRender();
      addIcons();
      addRoutes();
    }
  }
}
function mapRender() {
  map = leaflet
    .map("mapDetailContainer", {
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
  for (const taskStatus of taskDetail.value.taskStatusLogs!) {
    if (taskStatus.location) {
      const myIcon = leaflet.divIcon({
        className: "leaflet-data-marker",
        html: taskStatusSvg[taskStatus.status!],
      });
      leaflet
        .marker([taskStatus.location.lat!, taskStatus.location.lng!], {
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
function addRoutes() {
  let index = 0;
  for (const destination of taskDetail.value.destinations) {
    for (const taskRoute of destination.routes) {
      taskRoute.showRouteType = taskRoute.optimizedRoute
        ? options.value[0]
        : options.value[1];

      const route = decodeCoordinates(taskRoute.rawRoute);
      if (route && route.length > 0) {
        taskRoutesPolyline.value.push({
          taskRouteType: taskRoute.optimizedRoute
            ? RouteTypeEnum.OPTIMIZED
            : RouteTypeEnum.Raw,
          destinationId: destination.id,
          routeId: taskRoute.id,
          polyline: leaflet
            .polyline(route, {
              color: getRouteColor(taskRoute.routeType),
              className: taskRoute.routeType,
              dashArray:
                taskRoute.routeType == TaskRouteType.ESTIMATED_ROUTE
                  ? "10,10"
                  : "",
            })
            .addTo(map),
          type: taskRoute.id,
        });
        if (destination.changedLocationFrom) {
          points.value.push({
            destinationId: destination.id,
            point: leaflet
              .circleMarker(destination.changedLocationFrom, {
                radius: 10,
                color: "black",
                fillColor: "black",
                fillOpacity: 1,
              })
              .addTo(map),
          });
        }
      }
      index = index++;
    }
  }
}
function hideShowRoute(route: {
  routeType: TaskRouteType;
  showRouteType: any;
  hideRoute: boolean;
  id: number;
}) {
  route.hideRoute = !route.hideRoute;
  if (route.hideRoute) {
    route.showRouteType = undefined;
  } else if (route.hideRoute == false) {
    route.showRouteType = route.showRouteType ?? options.value[0];
  }
  const polyline = taskRoutesPolyline.value.find(
    (r) => r.routeId == (route.id as any)
  )?.polyline;
  if (polyline?.options?.hideDestination) return;
  if (!polyline && !route.hideRoute) {
    changeRouteType(ShowRouteTypesEnum.OPTIMIZEDROUTE, route);
  }
  if (polyline) {
    polyline.setStyle({
      opacity: route.hideRoute ? 0 : 1,
      hideRoute: route.hideRoute ? true : false,
    });
  }
  if (
    route.showRouteType == ShowRouteTypesEnum.OPTIMIZEDPOINT ||
    route.showRouteType == ShowRouteTypesEnum.RAWPOINT ||
    route.hideRoute
  ) {
    points.value.map((r) => {
      if (r.taskRouteType == route.routeType) {
        r.point.setStyle({
          opacity: route.hideRoute ? 0 : 1,
          fillOpacity: route.hideRoute ? 0 : 1,
        });
      }
    });
  }
}
function returnImage(routeType: TaskRouteType) {
  switch (routeType) {
    case TaskRouteType.ESTIMATED_ROUTE:
      return estimatedRoute;
    case TaskRouteType.SERVANT_TRACKED_ROUTE:
      return servantTrackedRoute;
    case TaskRouteType.SERVANT_LOCAL_STORED_ROUTE:
      return servantLocalStoredRoute;
    case TaskRouteType.PANEL_PROVIDED_ROUTE:
      return panelProvidedRoute;
    case TaskRouteType.ROUTE_TO_CLIENT:
      return RouteToClientImage;
  }
}
function getRouteColor(routeType) {
  switch (routeType) {
    case TaskRouteType.ESTIMATED_ROUTE:
      return "#000000";
    case TaskRouteType.PANEL_PROVIDED_ROUTE:
      return "#078cae";
    case TaskRouteType.SERVANT_LOCAL_STORED_ROUTE:
      return "#9b0a01";
    case TaskRouteType.SERVANT_TRACKED_ROUTE:
      return "#2e6700";
    case TaskRouteType.ROUTE_TO_CLIENT:
      return "#db0efd";
  }
}
function changeRouteType(selectedRouteType, taskRoute) {
  const polyline = taskRoutesPolyline.value.find(
    (r) => r.routeId == taskRoute.id
  )?.polyline;
  if (polyline?.options?.hideRoute) return;
  if (polyline?.options?.hideDestination) return;

  const polylineIndex = taskRoutesPolyline.value.findIndex(
    (r) => r.routeId == taskRoute.id
  );
  if (polylineIndex > -1) {
    taskRoutesPolyline.value.splice(polylineIndex, 1);
    map.removeLayer(polyline);
  }

  for (const point of points.value) {
    if (point.routeId == taskRoute.id) {
      map.removeLayer(point.point);
    }
  }

  const routePoints = decodeCoordinates(
    selectedRouteType == ShowRouteTypesEnum.OPTIMIZEDROUTE ||
      selectedRouteType == ShowRouteTypesEnum.OPTIMIZEDPOINT
      ? taskRoute.optimizedRoute
      : taskRoute.rawRoute
  );

  if (
    selectedRouteType == ShowRouteTypesEnum.OPTIMIZEDROUTE ||
    selectedRouteType == ShowRouteTypesEnum.RAWROUTE
  ) {
    taskRoutesPolyline.value.push({
      taskRouteType: taskRoute.routeType,
      destinationId: taskRoute.destinationId,
      routeId: taskRoute.id,
      polyline: leaflet
        .polyline(routePoints, {
          color: getRouteColor(taskRoute.routeType),
          className: taskRoute.routeType,
          dashArray:
            taskRoute.routeType == TaskRouteType.ESTIMATED_ROUTE ? "10,10" : "",
        })
        .addTo(map),
      type: selectedRouteType,
    });
  } else if (
    selectedRouteType == ShowRouteTypesEnum.RAWPOINT ||
    selectedRouteType == ShowRouteTypesEnum.OPTIMIZEDPOINT
  ) {
    for (const routePoint of routePoints) {
      points.value.push({
        taskRouteType: taskRoute.routeType,
        destinationId: taskRoute.destinationId,
        routeId: taskRoute.id,
        point: leaflet
          .circleMarker(routePoint, {
            radius: 3,
            color: getRouteColor(taskRoute.routeType),
            fillColor: getRouteColor(taskRoute.routeType),
            fillOpacity: 1,
          })
          .addTo(map),
        type: selectedRouteType,
      });
    }
  }
  taskRoute.hideRoute = false;
}
function hideDestination(destinationId: number) {
  taskRoutesPolyline.value.map((route) => {
    if (route.destinationId == destinationId) {
      route.polyline.setStyle({
        opacity: route.polyline.options.opacity ? 0 : 1,
        hideDestination: route.polyline.options.opacity ? true : false,
      });
    }
  });
  points.value.map((route) => {
    if (route.destinationId == destinationId) {
      route.point.setStyle({
        opacity: route.point.options.opacity ? 0 : 1,
        fillOpacity: route.point.options.opacity ? 0 : 1,
      });
    }
  });
  taskDetail.value?.destinations?.map((destination) => {
    if (destination.id == destinationId) {
      destination.hideDestination = !destination.hideDestination;
    }
  });
}
</script>
<style lang="scss" scoped>
#mapDetailContainer {
  height: 100%;
  border-radius: 10px;
  min-height: 400px;
}
.timelineCard {
  height: 700px;
}
.timeLineContainer {
  padding: 30px 10px;
  pointer-events: none;
  background-color: var(--background-color-kubak);
  border-radius: 5px;

  .p-timeline-event-content {
    margin-top: 8px;
  }
  .p-timeline-event-opposite {
    margin-top: 8px;
  }
}
.routeTypeContainer {
  font-size: 12px !important;
  .p-button {
    padding: 0px 5px !important;
    font-size: 12px !important;
  }
}
.routeContainer {
  height: 130px;
  min-width: 350px;
  background-color: var(--background-color-kubak);
  border-radius: 5px;
  // border: 1px solid var(--primary-color-kubak);
}
.destinationHideShow {
  &:hover {
    background-color: var(--icon-background-color-kubak);
  }
}
</style>
