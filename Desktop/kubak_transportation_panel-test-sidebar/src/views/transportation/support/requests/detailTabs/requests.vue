<template>
  <div class="w-full flex justify-content-between align-items-start">
    <Avatar
      style="height: 150px; width: 150px"
      class="mt-3 mx-4"
      shape="circle"
      :image="getImage(requestDetail?.requester?.user?.photoUrl)"
    />
    <Button @click="goToDetail()">{{
      $t("transportation.requests.gotoDetailPage")
    }}</Button>
  </div>
  <div class="grid my-4 mx-2" style="width: 100% !important">
    <div
      class="col-6 md:col-3 mb-2"
      v-for="(data, index) in showData"
      :key="index"
    >
      <p class="m-1">
        {{
          $t(
            `transportation.requests.${
              data.field.split(".")[data.field.split(".").length - 1]
            }`
          )
        }}
      </p>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon :name="`${data.icon}-outline`" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label inputData">
          <label for="inputgroup">{{
            data.field == "status"
              ? requestDetail?.status
                ? $t(`statuses.requestStatuses.${requestDetail.status}`)
                : ""
              : data.field
                  .replace(/\[|\]\.?/g, ".")
                  .split(".")
                  .filter((s) => s)
                  .reduce((acc, val) => acc && acc[val], requestDetail)
          }}</label>
        </span>
      </div>
    </div>
    <div class="col-6 md:col-3 mb-2">
      <p class="m-1">
        {{ $t(`transportation.common.startDate`) }}
      </p>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputText autofocus id="inputgroup" type="text" :disabled="true" />
          <label for="inputgroup">
            {{ moment(requestDetail?.createdAt).format("DD/MM/YYYY") }}
          </label>
        </span>
      </div>
    </div>
    <div class="col-6 md:col-3 mb-2">
      <p class="m-1">
        {{ $t(`transportation.common.startTime`) }}
      </p>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="time-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputText autofocus id="inputgroup" type="text" :disabled="true" />
          <label for="inputgroup">
            {{ toLocalTimeFormat(requestDetail?.createdAt) }}
          </label>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  toLocalTimeFormat,
  toLocalDateFormat,
} from "@/composables/customRequest";
import InputText from "primevue/inputtext";
import { RequestService } from "@/backend/transport";
import moment from "moment";
import { getImage } from "@/composables/getImage";
import Avatar from "primevue/avatar";

const route = useRoute();
const router = useRouter();
const requestDetail = ref();
const showData = [
  { field: "requester.user.displayName", icon: "color-filter" },
  { field: "requester.user.phoneNumber", icon: "color-filter" },
  { field: "rawPrice", icon: "cash" },
  { field: "userPrice", icon: "cash" },
  { field: "discount.discountCode", icon: "gift" },
  { field: "type", icon: "location" },
  { field: "status", icon: "color-filter" },
  { field: "paymentType", icon: "color-filter" },
  { field: "status", icon: "color-filter" },
];
getRequestDetail();
function getRequestDetail() {
  RequestService.getRequestById({ id: +route.params.id }).then((Response) => {
    requestDetail.value = Response;
    requestDetail.value.reserveDate = toLocalDateFormat(Response.reserveTime);
    requestDetail.value.reserveTime = toLocalTimeFormat(
      requestDetail.value.reserveTime
    );
  });
}
function goToDetail() {
  router.push({
    name: "passengerDetail",
    query: {
      phoneNumber: requestDetail.value.requester.user.phoneNumber,
    },
  });
}
</script>
