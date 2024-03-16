<template>
  <div style="min-width: 200px">
    <div class="flex flex-column align-items-center px-2" style="width: 100%">
      <div class="flex flex-column align-items-center" v-if="request">
        <Avatar
          v-if="request.clientPhotoUrl"
          :image="getImage(request.clientPhotoUrl)"
          shape="circle"
          class="w-4rem h-4rem"
        />
        <Avatar
          v-else
          :label="request?.clientName?.charAt(0)"
          shape="circle"
          class="w-4rem h-4rem"
        />
        <h3 class="mt-2">{{ request.clientName }}</h3>
      </div>
      <div class="flex flex-column align-items-center" v-else-if="servant">
        <Avatar
          v-if="servant.avatarUrl"
          :image="getImage(servant.avatarUrl)"
          shape="circle"
          class="w-4rem h-4rem"
          style="border: 2px solid #048c11"
        />
        <Avatar
          v-else
          :label="servant?.firstName?.charAt(0)"
          shape="circle"
          class="w-4rem h-4rem"
        />
        <div class="flex flex-column align-items-center">
          <h3 class="mt-2">{{ servant.fullName }}</h3>
          <span class="mt-1">{{ servant.servantId }}</span>
        </div>
      </div>
      <div>
        <div class="flex justify-content-between">
          <div class="flex align-items-center mx-1">
            <ion-icon
              name="call"
              class="text-xl mx-1"
              style="color: #35b368"
            ></ion-icon>
            <h4 style="color: var(--secondary-text-color-kubak) !important">
              {{ request?.clientPhoneNumber ?? servant?.phoneNumber ?? "" }}
            </h4>
          </div>
          <div class="flex align-items-center mx-1">
            <ion-icon
              name="home"
              class="text-xl mx-1"
              style="color: #1662f4"
            ></ion-icon>
            <h4 style="color: var(--secondary-text-color-kubak) !important">
              {{ servant?.address ?? "" }}
            </h4>
          </div>
        </div>
        <div
          v-if="servant && props.alertStatus"
          style="min-width: 80px; height: 25px"
          :style="`background-color: ${alertServantStatusColor(
            props.alertStatus
          )}60;${alertServantStatusColor(props.alertStatus)}`"
          class="border-round-sm flex justify-content-center align-items-center px-2 my-1"
        >
          <h4>{{ props.alertStatus }}</h4>
        </div>
        <div
          v-if="request"
          style="min-width: 80px; height: 25px"
          :style="`background-color: ${tripStatusesColor(
            request?.tripStatus
          )}60;${tripStatusesBorderColor(request?.tripStatus)}`"
          class="border-round-sm flex justify-content-center align-items-center"
        >
          <h4>{{ props.status ?? request?.tripStatus }}</h4>
        </div>
        <div class="w-full flex justify-content-between mt-3">
          <div
            v-if="
              servant?.status == ServantStatusEnum.IN_TRIP ||
              servant?.status == ServantStatusEnum.DISCONNECT_IN_TRIP
            "
            @click="taskDetail"
            style="min-width: 80px; background-color: #ed7f22"
            class="border-round-sm flex justify-content-center align-items-center cursor-pointer px-2"
          >
            <span style="color: white">{{ props.taskDetailTitle }}</span>
          </div>
          <div
            v-else-if="checkTripStatus(request?.tripStatus)"
            @click="taskDetail"
            style="min-width: 80px; background-color: #ed7f22"
            class="border-round-sm flex justify-content-center align-items-center cursor-pointer px-2"
          >
            <span style="color: white">{{ props.taskDetailTitle }}</span>
          </div>

          <div class="flex">
            <div class="">
              <Button
                type="button"
                class="p-1"
                style="background-color: #048c1140; border: none"
              >
                <ion-icon
                  name="call"
                  class="text-lg mx-1"
                  style="color: #048c11"
                ></ion-icon>
              </Button>
            </div>
            <div>
              <Button
                type="button"
                class="p-1 mx-1"
                style="background-color: #ed7f2240; border: none"
                @click="detail"
              >
                <ion-icon
                  name="information-circle"
                  class="text-lg mx-1"
                  style="color: var(--primary-color-kubak)"
                ></ion-icon>
              </Button>
            </div>
            <div v-if="request">
              <Button
                type="button"
                class="p-1"
                style="background-color: #cf070740; border: none"
                @click="showRequestAlerts"
              >
                <ion-icon
                  name="map"
                  class="text-lg mx-1"
                  style="color: #cf0707"
                ></ion-icon>
              </Button>
            </div>
          </div>
        </div>
        <div class="mt-2 w-full" v-if="request?.askForHelp">
          <Button type="button" class="p-1 w-full" @click="removeAskForHelp">
            <ion-icon
              name="help-circle-outline"
              class="text-xl mx-1"
            ></ion-icon>
            {{ props.removeHelpTitle }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ServantStatusDto, TripStatusDto } from "@/backend/transport";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { ref } from "vue";
import {
  tripStatusesColor,
  tripStatusesBorderColor,
} from "@/global/transportation/tripStatusColors";
import { getImage } from "@/composables/getImage";
import { MonitoringStore } from "./monitoringStore";
import { ServantStatusEnum } from "@/backend/transport";
import { checkTripStatus } from "./checkRequestStatus";
import connection from "@/services/signalR";
import { alertServantStatusColor } from "./composables/alertServantsStatusColors";
// import useImageCompressor from "@/utils/useImageCompressor";
const props = defineProps([
  "request",
  "servant",
  "router",
  "taskDetailTitle",
  "status",
  "removeHelpTitle",
  "alertStatus",
]);
const request = ref<TripStatusDto>(props.request);
const servant = ref<ServantStatusDto>(props.servant);
const router = props.router;

function detail() {
  if (servant.value) {
    router.push({
      name: "detailServant",
      params: {
        id: servant.value.servantId,
      },
    });
  }
  if (request.value) {
    router.push({
      name: "requestsDetail",
      params: {
        id: request.value.requestId,
      },
    });
  }
}
function taskDetail() {
  const monitoringStore = MonitoringStore();
  monitoringStore.showDetail(
    request.value ?? servant.value,
    request.value ? "request" : "servant"
  );
}
function showRequestAlerts() {
  const monitoringStore = MonitoringStore();
  monitoringStore.showRequestAlerts(request.value);
}
function removeAskForHelp() {
  connection.send("RemoveAskForHelp", request.value.requestId);
}
</script>
