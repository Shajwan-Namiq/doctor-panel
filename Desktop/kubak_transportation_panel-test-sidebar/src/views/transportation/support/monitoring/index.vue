<!-- eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain -->
<template>
  <div
    class="flex px-2"
    style="margin-top: 1px; height: calc(100vh - 75px)"
    @keydown.esc="hideAlerts"
  >
    <div style="padding: 6px 0; height: 100%; width: 100%">
      <div id="monitoringMap">
        <CardCounts :totalCounts="totalCounts" />
        <div
          class="socketStatus"
          :style="`background-color: ${socketIsConnected ? 'green' : 'red'}`"
        ></div>
        <MapTheme />
        <div class="taskDetail w-full flex justify-content-center">
          <RequestList
            v-if="!showTaskDetailComponent"
            @scrolling="scrolling"
            @stopScrolling="stopScrolling"
            @hideAlerts="hideAlerts"
          />
          <div
            class="toggleDriveListIcon cursor-pointer"
            :style="getDriverIconStyle()"
            @click="toggleDriverList()"
          >
            <ion-icon
              :name="showDriverContainer ? 'close-outline' : 'car-outline'"
            />
          </div>

          <OnTaskDetail
            v-if="showTaskDetailComponent"
            :taskDetail="taskDetail"
          />
        </div>
      </div>
    </div>
    <div
      class="driversContainer right-0 absolute lg:relative"
      :style="!showDriverContainer ? 'display:none' : ''"
    >
      <DriversList @closeDriverList="closeDriverList" />
    </div>
  </div>
</template>
<script setup lang="ts">
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet/dist/leaflet.css";

import type { TripStatusDto } from "@/backend/transport";
import decodeCoordinates from "@/composables/decodeCoordinates";
import connection from "@/services/signalR";
import NotificationAudio from "@/static/audio/notification.wav";
import { requestStatus } from "@/stores/common/requestStatus";
import "leaflet-draw";
import { createApp, onMounted, onUnmounted, ref, watch } from "vue";
import {
  checkIfTripStatusExistInSelectedStatuses,
  checkRequestStatus,
} from "./checkRequestStatus";
import DriversList from "./driversList.vue";
import requestMarkerSvg from "./icons/requestMarker";
import servantMarkerSvg from "./icons/servantMarker";
import MapTheme from "./mapTheme.vue";
import { MonitoringStore } from "./monitoringStore";
import OnTaskDetail from "./onTaskDetail/index.vue";
import popupDetail from "./popupDetail.vue";
import RequestList from "./requestList.vue";
import { useRouter } from "vue-router";
import { currentUser } from "@/stores/currentUser";
import CardCounts from "./topCardCounts/index.vue";
import {
  RequestService,
  ServantService,
  ServantStatusEnum,
  TaskRouteType,
  TaskService,
  TripStatusEnum,
} from "@/backend/transport";
import { useI18n } from "vue-i18n";
import "@maplibre/maplibre-gl-leaflet";
import maplibregl from "maplibre-gl";
import HelpIcon from "./icons/helpIcon2.gif";
import { HubConnectionState } from "@microsoft/signalr";
import {
  endOfTodayUtcTimeStamp,
  startOfTodayUtcTimeStamp,
} from "@/composables/customRequest";
import { getMultiDestinationRouteColor } from "./composables/multiDestinationRouteColos";
import DestinationDetailPopup from "./onTaskDetail/destinationDetailPopup.vue";
import { RegionStore } from "@/stores/common/region";
import { getRegionById } from "@/views/auth/regions/regions";

const { t } = useI18n();
const socketIsConnected = ref(connection.state === "Connected" ?? false);
setInterval(() => {
  if (connection.state === "Connected") {
    socketIsConnected.value = true;
  } else {
    socketIsConnected.value = false;
  }
}, 5000);
const getServantStatusesInterval = ref<any>(null);
const currentUserStore = currentUser();
const requestStatusStore = requestStatus();
const monitoringStore = MonitoringStore();
const maplibreGlOptions = {
  style: "https://tiles.b.kubak.co/styles/kubak/style.json",
  fadeAnimation: false,
  zoomAnimation: true,
};

const totalCounts = ref(undefined);
const center = ref([35.564558, 45.437937]);
const showTaskDetailComponent = ref(false);
const showDriverContainer = ref(true);
const map = ref();
const requestMarkers = ref<any>([]);
const servantMarkers = ref<any>([]);
const servants = ref();
const requests = ref<TripStatusDto[]>([]);
const taskDetail = ref();
const audio = new Audio(NotificationAudio);
let currentTaskServantId = "";
let currentTaskDetailRequestId: number | undefined = undefined;
let isServantIconsLoadedAfterStartMonitoring = false;
watch(
  () => showTaskDetailComponent.value,
  () => {
    if (!showTaskDetailComponent.value) {
      currentTaskServantId = "";
      currentTaskDetailRequestId = undefined;
    }
  }
);

watch(
  () => monitoringStore.isShowDetail,
  () => {
    const data = monitoringStore.showDetailData.data;
    if (monitoringStore.isShowDetail) {
      switch (monitoringStore.showDetailData.type) {
        case "servant": {
          showServantDetail(data);
          break;
        }
        case "request": {
          showRequestDetail(data);
          break;
        }
        case "task": {
          showOnTasksDetail(data);
          break;
        }
      }
    }
  }
);
watch(
  () => monitoringStore.cancelTaskDetail,
  () => {
    if (monitoringStore.cancelTaskDetail) cancelTaskDetail();
  }
);
watch(
  () => monitoringStore.servants,
  () => {
    servants.value = monitoringStore.servants;
    if (!monitoringStore.loadingSocket && monitoringStore.servants.length > 0) {
      addServantsMarker();
    }
  }
);
watch(
  () => monitoringStore.trips,
  () => {
    requests.value = monitoringStore.trips;
    addRequestsMarkers();
  },
  {
    deep: true,
  }
);
watch(
  () => monitoringStore.mapTileURL,
  () => {
    tileLayer.value = monitoringStore.mapTileURL;
    if (map.value) {
      map.value.remove();
      renderMap();
      if (monitoringStore.servants.length > 0) {
        addServantsMarker(true);
      }
      localStorage.setItem("mapTileURL", monitoringStore.mapTileURL);
    }
  }
);
watch(
  () => monitoringStore.currentServantStatus,
  () => {
    changeServantsList();
  },
  {
    deep: true,
  }
);
watch(
  () => monitoringStore.currentTripStatuses,
  () => {
    changeTripsList();
  },
  {
    deep: true,
  }
);

watch(
  () => monitoringStore.isShowRequestAlerts,
  () => {
    if (!monitoringStore.isShowRequestAlerts) {
      hideAlerts();
    } else {
      RequestService.getRequestAlerts({
        id: monitoringStore.requestAlertData.requestId,
      }).then((response) => {
        map.value?.setView(
          [
            monitoringStore.requestAlertData.requestLocation.lat,
            monitoringStore.requestAlertData.requestLocation.lng,
          ],
          14
        );
        for (const gap of response) {
          new L.Circle(
            [
              monitoringStore.requestAlertData.requestLocation.lat,
              monitoringStore.requestAlertData.requestLocation.lng,
            ],
            {
              color: "#de6b01",
              fillColor: "#5396f5",
              fillOpacity: 0.2,
              radius: gap.gapRadius,
            }
          ).addTo(map.value);
          for (const markerIndex in servantMarkers.value) {
            servantMarkers.value[markerIndex].setOpacity(0.33);
          }
          if (gap.servants) {
            for (const servant of gap.servants) {
              const contentNode = document.createElement("div");
              const props = {
                servant: servant,
                router: router,
                taskDetailTitle: t("transportation.tasks.taskDetail"),
                alertStatus: servant.status,
              };
              const app = createApp(popupDetail, props);
              app.mount(contentNode);
              const servantIcon = servantMarkerSvg({
                status: "alertedServant" + servant.status,
                direction:
                  monitoringStore.requestAlertData.requestLocation.direction,
              });

              const myIcon = L.divIcon({
                className: "leaflet-data-marker",
                html: servantIcon,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              });
              L.marker(
                [servant.location?.lat ?? 0, servant.location?.lng ?? 0],
                {
                  id: servant.userid,
                  icon: myIcon,
                  name: "alertedServant",
                } as {
                  //
                }
              )
                .bindPopup(contentNode, { autoClose: false })
                .addTo(map.value);
            }
          }
        }
      });
      addRequestsMarkers();
    }
  }
);

function hideAlerts() {
  for (const markerIndex in servantMarkers.value) {
    servantMarkers.value[markerIndex].setOpacity(1);
  }
  map.value?.eachLayer(function (layer) {
    if (layer.options.name === "alertedServant") {
      map.value.removeLayer(layer);
    }
    if (layer instanceof L.Circle) {
      map.value.removeLayer(layer);
    }
  });
  monitoringStore.showRequestAlerts({}, true);
  monitoringStore.cancelDetail();
  addRequestsMarkers();
}
const tileLayer = ref(monitoringStore.mapTileURL);
const router = useRouter();

function toggleDriverList() {
  showDriverContainer.value = !showDriverContainer.value;
}
function closeDriverList() {
  showDriverContainer.value = false;
}

async function socketStart() {
  requestStatusStore.ChangeLoadingStatus(true);
  if (!localStorage.getItem("servantStatuses")) {
    monitoringStore.changeServantStatusList([
      "Online",
      "InTrip",
      "DisconnectInTrip",
    ]);
  }

  await monitoringStore
    .startMonitoring(
      monitoringStore.currentServantStatus,
      checkRequestStatus(monitoringStore.currentTripStatuses)
    )
    .then(() => {
      requestStatusStore.ChangeLoadingStatus(false);
    });
  connection.on("NewServant", (Response) => {
    monitoringStore.addNewServant(JSON.parse(Response));
    addNewServant(JSON.parse(Response));
  });
  connection.on("ServantLocationUpdate", async (Response) => {
    const servant = JSON.parse(Response);
    const statuses = localStorage.getItem("servantStatuses")
      ? JSON.parse(localStorage.getItem("servantStatuses")!)
      : [];
    if (statuses.length > 0 && !statuses.includes(servant.status)) {
      monitoringStore.deleteServant(servant);
      deleteServant(servant);
      return;
    } else {
      if (monitoringStore.servants) {
        const index = monitoringStore.servants.findIndex(
          (x) => x.servantUserId == servant.servantUserId
        );

        if (index < 0) {
          if (isServantIconsLoadedAfterStartMonitoring) {
            await getServant(servant.servantUserId);
          }
        } else {
          monitoringStore.updateServant(JSON.parse(Response));
          updateServant(JSON.parse(Response));
        }
      }
    }
  });

  connection.on("TripUpdate", async (Response) => {
    const response = JSON.parse(Response);
    if (
      response.tripStatus == TripStatusEnum.END ||
      response.tripStatus == TripStatusEnum.WAITING ||
      response.tripStatus == TripStatusEnum.CANCELED_AFTER_ARRIVE ||
      response.tripStatus == TripStatusEnum.CANCELED_AFTER_RESERVE ||
      response.tripStatus == TripStatusEnum.CANCELED_AFTER_START
    ) {
      setTimeout(() => {
        connection
          .invoke(
            "GetMonitoringStats",
            startOfTodayUtcTimeStamp,
            endOfTodayUtcTimeStamp
          )
          .then((StateResponse) => {
            totalCounts.value = JSON.parse(StateResponse);
          });
      }, 3000);
    }

    monitoringStore.addNewRequest(response);
    if (response.tripStatus === 1) audio.play();
  });
  connection.on("RemoveTripOnMap", async (Response) => {
    const response = JSON.parse(Response);

    setTimeout(() => {
      removeTrip(response);
    }, 500);
  });
}

async function getServant(servantUserId: string) {
  await ServantService.getServantStatus({ userId: servantUserId }).then(
    (Response) => {
      const index = monitoringStore.servants.findIndex(
        (x) => x.servantUserId == servantUserId
      );
      if (index < 0) {
        setTimeout(() => {
          monitoringStore.addNewServant(Response);
          addNewServant(Response);
        }, 100);
      }
    }
  );
}

function showOnTasksDetail(detail) {
  const latLng = detail.servantId
    ? [detail.currentLocation?.lat, detail.currentLocation?.lng]
    : [detail.requestLocation?.lat, detail.requestLocation?.lng];

  center.value = latLng;
  requestStatusStore.ChangeLoadingStatus(true);
  connection
    .invoke("GetTripDetail", detail.servantUserId, detail.requestId)
    .then(async (Response) => {
      requestStatusStore.ChangeLoadingStatus(false);
      taskDetail.value = JSON.parse(Response);
      try {
        taskDetail.value.data.estimatedRoute = decodeCoordinates(
          taskDetail?.value?.data?.estimatedRoute
        );
      } catch (e) {
        ///
      }
      monitoringStore.addOnTaskDetail(taskDetail.value);
      const taskDetailData = taskDetail.value.data;
      currentTaskServantId = taskDetailData.servantUserId;
      currentTaskDetailRequestId = taskDetailData.requestId;
      map.value.fitBounds([
        [
          taskDetailData.sourceLocation?.lat,
          taskDetailData.sourceLocation?.lng,
        ],
        [
          taskDetailData.servantCurrentLocation?.lat,
          taskDetailData.servantCurrentLocation?.lng,
        ],
        taskDetailData.destinationsLocation
          ? [
              taskDetailData.destinationsLocation[0]?.lat,
              taskDetailData.destinationsLocation[0]?.lng,
            ]
          : [],
      ]);
      const currentRequestMarker = requestMarkers.value.findIndex(
        (x) => x.options.id == taskDetailData.requestId
      );
      for (const markerIndex in requestMarkers.value) {
        if (markerIndex != currentRequestMarker) {
          requestMarkers.value[markerIndex].setOpacity(0.33);
        }
      }
      const currentServantMarker = servantMarkers.value.findIndex(
        (x) => x.options.id == taskDetailData.servantUserId
      );
      for (const markerIndex in servantMarkers.value) {
        if (markerIndex != currentServantMarker) {
          servantMarkers.value[markerIndex].setOpacity(0.33);
        }
      }
      TaskService.getServantRouteInTask({
        id: taskDetailData.taskId,
      }).then((Response) => {
        if (
          Response.route &&
          monitoringStore.onTaskDetail?.taskId &&
          monitoringStore.onTaskDetail?.taskId == Response.taskId
        ) {
          L.polyline(decodeCoordinates(Response.route), {
            color: "black",
            className: "servantRoute",
          }).addTo(map.value);
        }
      });
      if (taskDetailData.destinationsLocation) {
        L.circle(
          [
            taskDetailData.destinationsLocation[0]?.lat,
            taskDetailData.destinationsLocation[0]?.lng,
          ],
          {
            color: "black",
            fillColor: "black",
            fillOpacity: 0.33,
            radius: 100,
          }
        ).addTo(map.value);
      }
      let index = 0;
      for (const destination of taskDetailData.destinations) {
        for (const route of destination.routes) {
          if (route.routeType == TaskRouteType.ESTIMATED_ROUTE) {
            const props = {
              destination: destination,
            };
            const contentNode = document.createElement("div");
            const app = createApp(DestinationDetailPopup, props);
            app.mount(contentNode);

            L.polyline(decodeCoordinates(route.optimizedRoute), {
              color: getMultiDestinationRouteColor(index),
              dashArray: "10,10",
              className: "estimatedRoute",
            })
              .bindPopup(contentNode, { autoClose: false })
              .addTo(map.value);
            L.circleMarker(
              decodeCoordinates(route?.optimizedRoute)[
                decodeCoordinates(route?.optimizedRoute).length - 1
              ],
              {
                radius: 8,
                color: getMultiDestinationRouteColor(index),
                fillColor: getMultiDestinationRouteColor(index),
                fillOpacity: 1,
              }
            )
              .bindPopup(contentNode, { autoClose: false })
              .addTo(map.value);
          }
        }
        index++;
        if (index == 5) index = 0;
      }
    })
    .catch(() => {
      requestStatusStore.ChangeLoadingStatus(false);
    });
  monitoringStore.changeRequestListStatus(false);
  showTaskDetailComponent.value = true;
  stopScrolling();
  monitoringStore.cancelDetail();
}

function cancelTaskDetail() {
  showTaskDetailComponent.value = false;
  monitoringStore.showDetailData = {};
  monitoringStore.changeCancelTaskDetail(false);
  monitoringStore.changeRequestListStatus(true);
  for (const markerIndex in servantMarkers.value) {
    servantMarkers.value[markerIndex].setOpacity(1);
  }
  for (const markerIndex in requestMarkers.value) {
    requestMarkers.value[markerIndex].setOpacity(1);
  }
  map.value?.eachLayer(function (layer) {
    if (
      layer instanceof L.Polyline ||
      layer instanceof L.Circle ||
      layer instanceof L.CircleMarker
    ) {
      map.value.removeLayer(layer);
    }
  });

  map.value?.setView(
    [
      currentUserStore?.userInfo?.region?.location?.lat ?? 35.564558,
      currentUserStore?.userInfo?.region?.location?.lng ?? 45.437937,
    ],
    13
  );
}
function renderMap() {
  getRegionById(currentUserStore?.userInfo.regionId).then((response) => {
    map.value = L.map("monitoringMap", {
      attributionControl: false,
      zoomControl: false,
      minZoom: 0,
      maxZoom: 20,
    })?.setView(
      [
        response?.location?.lat ?? 35.564558,
        response?.location?.lng ?? 45.437937,
      ],
      13
    );

    if (tileLayer.value.includes("kubak")) {
      L.maplibreGL(maplibreGlOptions).addTo(map.value);
    } else {
      L.tileLayer(tileLayer.value, {
        subdomains: ["a", "b"],
        maxZoom: 20,
      }).addTo(map.value);
    }

    L.Popup.include({
      _animateZoom(e) {
        const pos = map.value._latLngToNewLayerPoint(
            this._latlng,
            e.zoom,
            e.center
          ),
          anchor = this._getAnchor();
        L.DomUtil.setPosition(this._container, pos.add(anchor));
      },
    });
    addRequestsMarkers();
  });
}

onMounted(async () => {
  if (maplibregl.getRTLTextPluginStatus() != "loaded") {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
      () => {
        //
      }
    );
  }

  monitoringStore.changeCancelTaskDetail(false);
  await socketStart();
  getServantStatusesInterval.value = setInterval(() => {
    connection
      .invoke("GetServantStatuses", monitoringStore.currentServantStatus)
      .then((Response) => {
        monitoringStore.addServantsList(JSON.parse(Response).data);
        setTimeout(() => {
          addServantsMarker(true);
        }, 100);
      });
  }, 4000);
  getTotalCount();
  renderMap();
  const div = L.DomUtil.create("div", "taskDetail", map.value.getContainer());
  L.DomEvent.disableScrollPropagation(div);
});

function getTotalCount() {
  if (connection.state == HubConnectionState.Connected) {
    connection
      .invoke(
        "GetMonitoringStats",
        startOfTodayUtcTimeStamp,
        endOfTodayUtcTimeStamp
      )
      .then((Response) => {
        totalCounts.value = JSON.parse(Response);
      });
  } else {
    setTimeout(() => {
      getTotalCount();
    }, 1000);
  }
}

function addServantsMarker(reAddMarkers?) {
  let openedPopupRequestId;

  // remove existing markers and store the ID of opened popup
  for (
    let requestIndex = servantMarkers.value.length - 1;
    requestIndex >= 0;
    requestIndex--
  ) {
    if (servantMarkers.value[requestIndex].getPopup().isOpen()) {
      openedPopupRequestId = servantMarkers.value[requestIndex].options.id;
    }
    map.value.removeLayer(servantMarkers.value[requestIndex]);
    servantMarkers.value.splice(requestIndex, 1);
  }

  if (
    !servantMarkers.value[0] ||
    servantMarkers.value.length < 0 ||
    reAddMarkers
  ) {
    for (const marker of servantMarkers.value) {
      map.value.removeLayer(marker);
    }

    for (const servantIndex in servants.value) {
      const servantIcon = servantMarkerSvg({
        status:
          servants.value[servantIndex].status !==
          ServantStatusEnum.DISCONNECT_IN_TRIP
            ? servants.value[servantIndex].inTripStatus ??
              servants.value[servantIndex].status
            : servants.value[servantIndex].status,
        direction: servants.value[servantIndex].currentLocation.direction,
      });

      const myIcon = L.divIcon({
        className: "leaflet-data-marker",
        html: servantIcon,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      const contentNode = document.createElement("div");

      const props = {
        servant: servants.value[servantIndex],
        router: router,
        taskDetailTitle: t("transportation.tasks.taskDetail"),
      };
      const app = createApp(popupDetail, props);
      app.mount(contentNode);
      servantMarkers.value.push(
        L.marker(
          [
            servants.value[servantIndex].currentLocation.lat,
            servants.value[servantIndex].currentLocation.lng,
          ],
          {
            id: servants.value[servantIndex].servantUserId,
            icon: myIcon,
          } as any
        )
          .setOpacity(
            monitoringStore.isShowRequestAlerts ||
              (currentTaskServantId &&
                currentTaskServantId !=
                  servants.value[servantIndex].servantUserId)
              ? 0.33
              : 1
          )
          .bindPopup(contentNode, { autoClose: false, interactive: false })
          .addTo(map.value)
      );
    }
  }
  isServantIconsLoadedAfterStartMonitoring = true;
  // after adding new markers,check if any of them should have their popup opened
  servantMarkers.value.forEach((marker) => {
    if (marker.options.id === openedPopupRequestId) {
      marker.openPopup();
    }
  });
}

function addRequestsMarkers() {
  let requestIcon;
  let openedPopupRequestId;
  for (
    let requestIndex = requestMarkers.value.length - 1;
    requestIndex >= 0;
    requestIndex--
  ) {
    if (requestMarkers.value[requestIndex].getPopup().isOpen()) {
      openedPopupRequestId = requestMarkers.value[requestIndex].options.id;
    }
    map.value.removeLayer(requestMarkers.value[requestIndex]);
    requestMarkers.value.splice(requestIndex, 1);
  }
  for (const requestIndex in requests.value) {
    const hideRequestIcon =
      (monitoringStore.isShowRequestAlerts &&
        requests.value[requestIndex].requestId !=
          monitoringStore.requestAlertData.requestId) ||
      (monitoringStore.showDetailData?.data &&
        monitoringStore.showDetailData?.data?.requestId !=
          requests.value[requestIndex].requestId);

    const props = {
      removeHelpTitle: t("transportation.monitoring.removeAskForHelp"),
      request: requests.value[requestIndex],
      router: router,
      taskDetailTitle: t("transportation.tasks.taskDetail"),
      status: t(
        `transportation.tasks.statuses.${requests.value[requestIndex].tripStatus}`
      ),
    };
    const contentNode = document.createElement("div");
    const app = createApp(popupDetail, props);
    app.mount(contentNode);

    requestIcon = L.divIcon({
      className: "leaflet-data-marker",
      html: requestMarkerSvg(requests.value[requestIndex].tripStatus),
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    const helpIconGif = L.icon({
      iconUrl: HelpIcon,
      iconSize: [350, 200],
    });

    requestMarkers.value.push(
      L.marker(
        [
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          requests.value[requestIndex]?.requestLocation?.lat!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          requests.value[requestIndex]?.requestLocation?.lng!,
        ],
        {
          id: requests.value[requestIndex].requestId,
          icon: requests.value[requestIndex]?.askForHelp
            ? helpIconGif
            : requestIcon,
          zIndexOffset: requests.value[requestIndex].requestId,
        } as {
          ///
        }
      )
        .setOpacity(
          (currentTaskDetailRequestId &&
            currentTaskDetailRequestId !=
              requests.value[requestIndex].requestId) ||
            hideRequestIcon
            ? 0.33
            : 1
        )
        .bindPopup(contentNode, { autoClose: false })
        .addTo(map.value)
    );
    const currentRequestMarker =
      requestMarkers.value[requestIndex] ?? requestMarkers.value[0];
    currentRequestMarker.setIcon(
      requests.value[requestIndex]?.askForHelp ? helpIconGif : requestIcon
    );
    if (requests.value[requestIndex].requestId == openedPopupRequestId) {
      requestMarkers.value[requestIndex].openPopup();
    }
    requestIcon = ``;
  }
  openedPopupRequestId = 0;
}
function showRequestDetail(request) {
  requestMarkers.value.forEach((marker) => {
    marker.closePopup();
  });
  const index = requestMarkers.value.findIndex(
    (marker) => marker.options.id == request.requestId
  );

  setTimeout(() => {
    map.value?.setView(
      [request.requestLocation.lat, request.requestLocation.lng],
      13
    );
    requestMarkers.value[index].openPopup();
  }, 10);
  monitoringStore.cancelDetail();
}

function updateServant(servant) {
  const newLatLng = L.latLng(
    servant.currentLocation.lat,
    servant.currentLocation.lng
  );
  const markerIndex = servantMarkers.value.findIndex(
    (marker) => marker.options.id == servant.servantUserId
  );
  servantMarkers.value[markerIndex].setLatLng(newLatLng);
  const servantIcon = servantMarkerSvg({
    status: servant.tripStatus ?? servant.status,
    direction: servant.currentLocation.direction,
  });

  const myIcon = L.divIcon({
    className: "leaflet-data-marker",
    html: servantIcon,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  servantMarkers.value[markerIndex].setIcon(myIcon);
}

function deleteServant(servant) {
  const markerIndex = servantMarkers.value.findIndex(
    (marker) => marker.options.id == servant.servantUserId
  );
  map.value.removeLayer(servantMarkers.value[markerIndex]);
  servantMarkers.value.splice(markerIndex, 1);
}

function addNewServant(servant) {
  const contentNode = document.createElement("div");
  const props = {
    servant: servant,
    router: router,
    taskDetailTitle: t("transportation.tasks.taskDetail"),
  };
  const app = createApp(popupDetail, props);
  app.mount(contentNode);
  const servantIcon = servantMarkerSvg({
    status: servant.tripStatus ?? servant.status,
  });

  const myIcon = L.divIcon({
    className: "leaflet-data-marker",
    html: servantIcon,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  if (currentTaskServantId && currentTaskServantId != servant.servantUserId) {
    servantMarkers.value.push(
      L.marker([servant.currentLocation.lat, servant.currentLocation.lng], {
        id: servant.servantUserId,
        icon: myIcon,
      } as {
        //
      })
        .setOpacity(0.33)
        .bindPopup(contentNode, { autoClose: false })
        .addTo(map.value)
    );
  } else {
    const index = monitoringStore.servants.findIndex(
      (x) => x.servantUserId == servant.servantUserId
    );
    const servantMarkerExists = servantMarkers.value.find(
      (x) => x.options.id == servant.servantUserId
    );
    if (index < 0 || !servantMarkerExists) {
      servantMarkers.value.push(
        L.marker([servant.currentLocation.lat, servant.currentLocation.lng], {
          id: servant.servantUserId,
          icon: myIcon,
        } as {
          //
        })
          .setOpacity(monitoringStore.isShowRequestAlerts ? 0.33 : 1)
          .bindPopup(contentNode, { autoClose: false })
          .addTo(map.value)
      );
    }
  }
}
function showServantDetail(servant) {
  servantMarkers.value.forEach((marker) => {
    marker.closePopup();
  });
  const index = servantMarkers.value.findIndex(
    (servantMarker) => servantMarker.options.id === servant.servantUserId
  );
  setTimeout(() => {
    map.value?.setView(
      [servant.currentLocation.lat, servant.currentLocation.lng],
      20
    );
    servantMarkers.value[index].openPopup();
  }, 20);

  monitoringStore.cancelDetail();
}
function scrolling() {
  map.value?.scrollWheelZoom?.disable();
}
function stopScrolling() {
  map.value?.scrollWheelZoom?.enable();
}

async function changeServantsList() {
  monitoringStore.changeLoadingSocket(true);
  await connection
    .invoke(
      "ChangeMonitoringServantStatuses",
      monitoringStore.currentServantStatus
    )
    .then((Response) => {
      for (const servantIndex in servants.value) {
        if (
          !monitoringStore.currentServantStatus.includes(
            servants.value[servantIndex].status
          )
        ) {
          const servantMarkerIndex = servantMarkers.value.findIndex(
            (servantMarker) =>
              servantMarker.options.id ===
              servants.value[servantIndex]?.servantUserId
          );
          if (servantMarkerIndex > -1) {
            map.value.removeLayer(servantMarkers.value[servantMarkerIndex]);
            servantMarkers.value.splice(servantMarkerIndex, 1);
          }
        }
      }
      const newServants = JSON.parse(Response).data;
      for (const NewServant of newServants) {
        addNewServant(NewServant);
      }
      monitoringStore.changeServantList(newServants);
      monitoringStore.changeLoadingSocket(false);
    })
    .catch(() => {
      monitoringStore.changeLoadingSocket(false);
    });
}
function changeTripsList() {
  monitoringStore.changeLoadingSocket(true);
  for (const requestIndex in requests.value) {
    if (
      !checkIfTripStatusExistInSelectedStatuses(
        requests.value[requestIndex].tripStatus!,
        monitoringStore.currentTripStatuses
      )
    ) {
      const requestMarkerIndex = requestMarkers.value.findIndex(
        (requestMarker) =>
          requestMarker.options.id === requests.value[requestIndex].requestId
      );
      if (requestMarkerIndex != -1) {
        map.value.removeLayer(requestMarkers.value[requestMarkerIndex]);
        requestMarkers.value.splice(requestMarkerIndex, 1);
      }
    }
  }
  connection
    .invoke(
      "ChangeMonitoringTripStatuses",
      checkRequestStatus(monitoringStore.currentTripStatuses)
    )
    .then((Response) => {
      const newRequests = JSON.parse(Response).data;
      monitoringStore.changeTripList(newRequests);
      addRequestsMarkers();
      monitoringStore.changeLoadingSocket(false);
    })
    .catch(() => {
      monitoringStore.changeLoadingSocket(false);
    });
}
function removeTrip(requestId) {
  const requestMarkerIndex = requestMarkers.value.findIndex(
    (requestMarker) => requestMarker.options.id == requestId
  );
  if (requestMarkerIndex != -1) {
    map.value.removeLayer(requestMarkers.value[requestMarkerIndex]);
    requestMarkers.value.splice(requestMarkerIndex, 1);
    monitoringStore.removeTrip(requestId);
  }
}
onUnmounted(() => {
  clearInterval(getServantStatusesInterval.value);
  connection.stop();
  monitoringStore.showRequestAlerts({}, true);
  monitoringStore.changeCancelTaskDetail(true);
});
function getDriverIconStyle() {
  let style = "";
  localStorage.getItem("direction")
    ? localStorage.getItem("direction") == "ltr"
      ? (style =
          "right:0;  border-top-left-radius: 4px;border-bottom-left-radius: 4px;")
      : (style =
          "left:0;  border-top-right-radius: 4px;border-bottom-right-radius: 4px;")
    : (style =
        "right:0;  border-top-left-radius: 4px;border-bottom-left-radius: 4px;");
  return style;
}

// return regions data from store
const regionStore = RegionStore();
regionStore.getAllRegion();
</script>
<style lang="scss">
@import "./monitoring.scss";

@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}
.socketStatus {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 10px;
  position: absolute;
  z-index: 10000;
}
</style>
