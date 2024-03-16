/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import connection, { getAccessToken } from "@/services/signalR";
import { HubConnectionState } from "@microsoft/signalr";
import {
  checkIfTripStatusExistInSelectedStatuses,
  checkTripStatus,
} from "./checkRequestStatus";
import { mapType } from "@/global/map";
import { ServantStatusEnum } from "@/backend/transport";

export type RootState = {
  showRequestsList: boolean;
  mapTileURL: "";
  userDetail: {};
  onTaskDetail: any;
  servants: any;
  servantUpdated: boolean;
  trips: any;
  showDetailData: { data: {}; type: "servant" | "request" | "task" } | any;
  isShowDetail: boolean;
  cancelTaskDetail: boolean;
  selectedTripsStatus: number[];
  currentServantStatus: string[];
  currentTripStatuses: string[];
  loadingSocket: boolean;
  requestAlertData: any;
  servantsTest: any;
  isShowRequestAlerts: boolean;
};

export const MonitoringStore = defineStore("monitoringStore", {
  state: () =>
    ({
      showRequestsList: true,
      mapTileURL:
        localStorage.getItem("mapTileURL") ??
        mapType[0].url ??
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
      userDetail: {},
      onTaskDetail: {},
      servants: [],
      servantUpdated: false,
      trips: [],
      showDetailData: {},
      isShowDetail: false,
      cancelTaskDetail: false,
      selectedTripsStatus: [] as number[],
      currentServantStatus: JSON.parse(
        localStorage.getItem("servantStatuses")!
      ) ?? ["Online", "InTrip", "DisconnectInTrip"],
      currentTripStatuses: JSON.parse(
        localStorage.getItem("tripStatuses")!
      ) ?? ["Timeout", "Waiting", "Completed", "CanceledRequest", "Accepted"],
      loadingSocket: false,
      requestAlertData: {},
      isShowRequestAlerts: false,
    } as RootState),

  actions: {
    changeRequestListStatus(cond) {
      this.showRequestsList = cond;
    },

    showRequestAlerts(request, removeAlert?: boolean) {
      if (removeAlert) {
        this.requestAlertData = {};
        this.isShowRequestAlerts = false;
      } else if (Object.keys(this.requestAlertData).length < 1) {
        this.requestAlertData = request;
      } else {
        if (this.requestAlertData.requestId === request.requestId) {
          this.requestAlertData = {};
        } else {
          this.requestAlertData = {};

          setTimeout(() => {
            this.requestAlertData = request;
            this.isShowRequestAlerts = true;
          }, 100);
        }
      }

      Object.keys(this.requestAlertData).length < 1
        ? (this.isShowRequestAlerts = false)
        : (this.isShowRequestAlerts = true);
    },

    changeMapTile(url) {
      this.mapTileURL = url;
    },

    addUserDetail(userDetail) {
      this.userDetail = {};
      this.userDetail = userDetail;
    },

    addOnTaskDetail(detail) {
      this.onTaskDetail = detail.data;
    },

    showDetail(data, root: "servant" | "request") {
      let rootType;
      this.isShowDetail = true;
      if (root == "servant") {
        data.status == ServantStatusEnum.IN_TRIP ||
        data.status == ServantStatusEnum.DISCONNECT_IN_TRIP
          ? (rootType = "task")
          : (rootType = "servant");
      }
      if (root == "request") {
        checkTripStatus(data.tripStatus)
          ? (rootType = "task")
          : (rootType = "request");
      }
      this.showDetailData = { data: data, type: rootType };
    },

    cancelDetail() {
      this.isShowDetail = false;
      this.showDetailData = {};
    },

    changeCancelTaskDetail(cond: boolean) {
      this.cancelTaskDetail = cond;
      if (cond == false) {
        this.onTaskDetail = {};
      }
    },

    addServantsList(servants) {
      this.servants = servants;
    },

    async startMonitoring(servantStatuses, requestStatuses) {
      this.servants = [];
      this.trips = [];

      connection.onreconnected(() => {
        this.loadingSocket = true;
        this.servants = [];
        this.trips = [];
        connection
          .invoke("StartMonitoring", servantStatuses, requestStatuses)
          .then((Response) => {
            const response = JSON.parse(Response).data;

            this.servants = response?.servants ?? [];
            this.trips = response?.trips ?? [];
            this.loadingSocket = false;
          })
          .catch(() => {
            this.loadingSocket = false;
          });
      });
      if (connection.state == HubConnectionState.Connected) {
        this.loadingSocket = true;
        await connection
          .invoke("StartMonitoring", servantStatuses, requestStatuses)
          .then((Response) => {
            const response = JSON.parse(Response).data;
            this.servants = response?.servants ?? [];
            this.trips = response?.trips ?? [];
            this.loadingSocket = false;
          })
          .catch(() => {
            this.loadingSocket = false;
          });
      } else {
        if (connection.state == HubConnectionState.Disconnected) {
          connection.baseUrl = `${
            import.meta.env.SIGNAL_R_URL
          }?access_token=${getAccessToken()}`;
          connection.start();
        }
        setTimeout(() => {
          this.startMonitoring(servantStatuses, requestStatuses);
        }, 1000);
      }
    },

    async addNewServant(newServant) {
      const index = this.servants?.findIndex(
        (x) => x.servantUserId == newServant.servantUserId
      );

      if (index < 0) {
        this.servants.push(newServant);
      }
    },

    deleteServant(servant) {
      const markerIndex = this.servants.findIndex(
        (servantItem) => servantItem.servantUserId == servant.servantUserId
      );
      if (markerIndex > -1) {
        this.servants.splice(markerIndex, 1);
      }
    },

    addNewRequest(newRequest) {
      const index = this.trips?.findIndex(
        (trip) => trip.requestId == newRequest.requestId
      );
      if (index >= 0) {
        this.trips[index] = newRequest;
      } else {
        this.trips.unshift(newRequest);
      }
    },

    updateServant(servant) {
      const index = this.servants?.findIndex(
        (x) => x.servantUserId === servant.servantUserId
      );

      this.servants[index].currentLocation = servant.currentLocation;
      this.servants[index].status = servant.status;

      this.servantUpdated = true;
    },
    filterRequestData(status: number) {
      this.selectedTripsStatus?.push(status);
    },

    changeServantStatusList(status) {
      this.currentServantStatus = status;
      localStorage.setItem("servantStatuses", JSON.stringify(status));
    },
    changeServantList(newServants) {
      const spliceIndex = [] as number[];
      for (const servantIndex in this.servants) {
        if (
          !this.currentServantStatus.includes(
            this.servants[servantIndex]?.status
          )
        ) {
          spliceIndex.push(+servantIndex);
        }
      }
      for (let i = spliceIndex.length - 1; i >= 0; i--) {
        this.servants.splice(spliceIndex[i], 1);
      }
      for (const newServant of newServants) {
        this.servants.push(newServant);
      }
    },
    changeTripStatusList(statuses) {
      this.currentTripStatuses = statuses;

      localStorage.setItem("tripStatuses", JSON.stringify(statuses));
    },
    changeTripList(newTrips) {
      const spliceIndex = [] as number[];
      for (const tripIndex in this.trips) {
        if (
          !checkIfTripStatusExistInSelectedStatuses(
            this.trips[tripIndex]?.tripStatus,
            this.currentTripStatuses
          )
        ) {
          spliceIndex.push(+tripIndex);
        }
      }

      for (let i = spliceIndex.length - 1; i >= 0; i--) {
        this.trips.splice(spliceIndex[i], 1);
      }

      for (const newTrip of newTrips) {
        this.trips.push(newTrip);
      }
    },
    removeTrip(tripId) {
      const index = this.trips.findIndex((x) => x.requestId == tripId);
      if (index >= 0) {
        this.trips.splice(index, 1);
      }
    },
    changeLoadingSocket(cond: boolean) {
      this.loadingSocket = cond;
    },
  },
});
