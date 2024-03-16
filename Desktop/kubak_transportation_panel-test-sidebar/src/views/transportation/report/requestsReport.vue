<template>
  <div class="page-style" @keyup.enter="getRequests">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterData.fromDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterData.toDate"
                      :class="{
                        'p-invalid': filterData.fromDate > filterData.toDate,
                      }"
                      hourFormat="24"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      filterData.fromDate > filterData.toDate
                        ? $t(
                            "validationMessages.end_date_must_greater_than_start_date"
                          )
                        : $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="regions"
                    display="chip"
                    :placeholder="$t('auth.area.regions')"
                    v-model="filterData.region"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.name ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.name }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="services"
                    display="chip"
                    :placeholder="$t('transportation.services.title')"
                    v-model="filterData.service"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.title ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.title }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="map-outline" class="text-2xl"></ion-icon>
                  </span>
                  <MultiSelect
                    :options="requestStatuses"
                    v-model="filterData.statuses"
                    optionLabel="name"
                    :placeholder="$t('dropdowns.requestStatuses.Placeholder')"
                    display="chip"
                    style="height: 45px"
                  >
                    <template #value="slotProp">
                      <div class="mt-1">
                        {{
                          slotProp.value && slotProp.value.length > 0
                            ? slotProp.value.map((x) => x).join(" , ")
                            : $t("dropdowns.requestStatuses.Placeholder")
                        }}
                      </div>
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option }}</p>
                    </template>
                  </MultiSelect>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearData"
                icon="pi pi-times"
              />
              <Button
                :label="$t('buttons.filter')"
                @click="getRequests"
                :loading="requestStatusStore.loading"
                :disabled="filterData.fromDate > filterData.toDate"
                icon="pi pi-filter"
              />
            </div>
          </div>
        </Transition>
      </div>
      <div class="grid">
        <div
          class="col-12 md:col-6 xl:col-3"
          v-for="(total, key) in requestsReport"
          :key="key"
        >
          <div
            class="request flex justify-content-between"
            :style="`border-bottom:2px solid ${returnColors(
              key
            )};--hover-color:${returnColors(key)}20`"
          >
            <div class="flex flex-column justify-content-between">
              <p class="text-lg">
                {{ $t(`transportation.hourlyReport.fields.${key}`) }}
              </p>
              <h1 class="flex">
                {{ total }}
              </h1>
            </div>
            <div
              class="pt-2 flex flex-column justify-content-between align-items-center h-full"
            >
              <div
                class="requestIconContainer p-2 flex justify-content-center align-items-center"
                :style="`background-color: ${returnColors(key)}20`"
              >
                <ion-icon
                  :name="returnIcons(key)"
                  class="text-4xl"
                  :style="`color:${returnColors(key)}`"
                ></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RequestService,
  type RequestReport,
  type RegionDto,
  type ServiceDto,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { RegionStore } from "@/stores/common/region";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import { mapRequestFilterDtoToRequestFilter } from "./mapper";
import { ServiceStore } from "@/stores/common/service";
import { RequestStatusEnum } from "@/backend/transport";

const requestStatusStore = requestStatus();
const regionStore = RegionStore();
const serviceStore = ServiceStore();
const requestStatuses = Object.keys(RequestStatusEnum).map(
  (key) => RequestStatusEnum[key]
);
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const services = ref<ServiceDto[]>();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});
const requestsReport = ref<RequestReport>();
const filterData = ref({
  region: undefined,
  service: undefined,
  statuses: undefined,
  fromDate: new Date(startOfToday),
  toDate: new Date(endOfToday),
});
onMounted(() => {
  getRequests();
});
function getRequests() {
  RequestService.requestReport(
    mapRequestFilterDtoToRequestFilter(filterData.value)
  ).then((Response) => {
    requestsReport.value = Response as any;
  });
}
function clearData() {
  filterData.value = {
    region: undefined,
    service: undefined,
    statuses: undefined,
    fromDate: new Date(startOfToday),
    toDate: new Date(endOfToday),
  };
}
function returnColors(requestField: string) {
  switch (requestField) {
    case "totalRequests":
      return "#1c2433";
    case "noServantRequests":
      return "#f6c85f";
    case "canceledRequests":
      return "#ca472f";
    case "timedOutRequests":
      return "#941b5f";
    case "singleDestinationRequests":
      return "#0b84a5";
    case "multiDestinationRequests":
      return "#9c89b8";
    case "withDestinationRequests":
      return "#03045e";
    case "withoutDestinationRequests":
      return "#00bf2d";
    case "numberOfRequesters":
      return "#eb6f33";
  }
}
function returnIcons(requestField: string) {
  switch (requestField) {
    case "totalRequests":
      return "bar-chart-outline";
    case "noServantRequests":
      return "car-outline";
    case "canceledRequests":
      return "close-outline";
    case "timedOutRequests":
      return "timer-outline";
    case "singleDestinationRequests":
      return "pin-outline";
    case "multiDestinationRequests":
      return "map-outline";
    case "withDestinationRequests":
      return "business-outline";
    case "withoutDestinationRequests":
      return "speedometer-outline";
    case "numberOfRequesters":
      return "people-outline";
  }
}
</script>

<style lang="scss">
.requestIconContainer {
  border-radius: 5px;
}
.request {
  &:hover {
    cursor: pointer;
    background-color: var(--hover-color);
  }
  height: 120px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: var(--background-color-kubak);
  padding: 10px;
}
</style>
