<template>
  <div class="py-4">
    <div class="toggleFilterAnimation">
      <Transition name="slide-down">
        <div>
          <div class="grid">
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <Calendar
                    v-model="filterParameters.startAt"
                    dateFormat="dd/mm/yy"
                    showTime
                    showSeconds
                  />

                  <label for="inputgroup">{{
                    $t("transportation.common.startAt")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <Calendar
                    v-model="filterParameters.endAt"
                    :class="{
                      'p-invalid':
                        filterParameters.startAt > filterParameters.endAt,
                    }"
                    dateFormat="dd/mm/yy"
                    showTime
                    showSeconds
                  />
                  <label for="inputgroup">{{
                    filterParameters.startAt > filterParameters.endAt
                      ? $t(
                          "validationMessages.end_date_must_greater_than_start_date"
                        )
                      : $t("transportation.common.endAt")
                  }}</label>
                </span>
              </div>
            </div>

            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="car-outline" class="text-xl"></ion-icon>
                </span>

                <Dropdown
                  :options="servicesToServant"
                  optionLabel="Typ"
                  :placeholder="$t('transportation.serviceType.name')"
                  class="w-15rem"
                  v-model="filterParameters.service"
                >
                  <template #value="valueProp">
                    {{ valueProp.value?.title ?? valueProp.placeholder }}
                  </template>
                  <template #option="slotProps">
                    <div class="w-full flex align-items-center">
                      <p>{{ slotProps.option?.title }}</p>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>
          <div class="mb-3 flex justify-content-end">
            <Button
              icon="pi pi-times"
              :label="$t('buttons.clear')"
              @click="clearData"
              class="mx-2 p-button-secondary"
            />
            <Button
              icon="pi pi-filter"
              :label="$t('buttons.filter')"
              @click="getPerformance"
              :loading="requestStatusStore.loading"
              :disabled="
                filterParameters.startAt > filterParameters.endAt ||
                !filterParameters.service
              "
            />
          </div>
        </div>
      </Transition>
    </div>

    <div class="grid">
      <div
        class="col-12 md:col-4 xl:col-3 mb-4"
        v-for="(performanceItem, field) in filteredPerformance"
        :key="field"
      >
        <div
          class="performanceCard flex justify-content-between align-items-center p-4"
        >
          <div class="performanceIcon">
            <ion-icon :name="icons[field]"></ion-icon>
          </div>
          <div
            class="flex flex-column justify-content-center align-items-center"
          >
            <p>{{ $t(`transportation.servant.performance.${field}`) }}</p>
            <div class="mt-3" v-if="field === 'serviceId'">
              {{ getServiceNameById(performanceItem) }}
            </div>
            <h1 class="mt-2" v-else>
              {{
                field === "durationOnTask" || field === "onlineDuration"
                  ? convertTime(performanceItem)
                  : performanceItem ?? 0
              }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import {
  endOfToday,
  momentToday,
  momentTomorrow,
  startOfToday,
} from "@/composables/customRequest";
import Button from "primevue/button";
import {
  ServantService,
  type ServantStatisticDto,
  type ServiceDto,
} from "@/backend/transport";
import {
  mapServantPerformanceRequest,
  ServantPerformanceFilterRequestDto,
} from "./mapper";
import { ServiceStore } from "@/stores/common/service";

const requestStatusStore = requestStatus();
const route = useRoute();

// return service data
const serviceStore = ServiceStore();
const services = ref<ServiceDto[]>();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});

// Method to get service name by ID
function getServiceNameById(serviceId) {
  if (serviceId === 0) {
    return "";
  }
  const service = services?.value?.find((service) => service.id === serviceId);
  return service ? service.title : "Unknown Service";
}

const filterParameters = ref<ServantPerformanceFilterRequestDto>({
  id: +route.params.id,
  startAt: new Date(startOfToday),
  endAt: new Date(endOfToday),
  service: undefined,
});

const performance = ref<ServantStatisticDto>({
  id: 0,
  requestAlerts: 0,
  rejectedRequest: 0,
  ignoredRequest: 0,
  acceptedRequest: 0,
  outOfRangeRequest: 0,
  successTask: 0,
  canceledTask: 0,
  onlineDuration: 0,
  durationOnTask: 0,
  distanceOnTask: 0,
  tasksAmount: 0,
  tasksCommission: 0,
  dateTime: "",
  servantId: 0,
  serviceId: 0,
});

const icons = ref({
  requestAlerts: "alert-circle-outline",
  rejectedRequest: "close-circle",
  ignoredRequest: "close-circle-outline",
  acceptedRequest: "checkmark-circle-outline",
  outOfRangeRequest: "stats-chart-outline",
  successTask: "checkmark-done-circle-outline",
  canceledTask: "close-circle",
  onlineDuration: "hourglass-outline",
  durationOnTask: "timer-outline",
  distanceOnTask: "analytics-outline",
  tasksAmount: "list-outline",
  tasksCommission: "card-outline",
  dateTime: "hourglass-outline",
  servantId: "hourglass-outline",
  serviceId: "list-circle-outline",
});

const filteredPerformance = computed(() => {
  const fieldsToExclude = ["id", "servantId", "dateTime"];
  return Object.fromEntries(
    Object.entries(performance.value).filter(
      ([key, value]) => !fieldsToExclude.includes(key)
    )
  );
});

// return performance data
getPerformance();
function getPerformance() {
  ServantService.getServantStatistic(
    mapServantPerformanceRequest(filterParameters.value)
  ).then((Response) => {
    performance.value = Response;
  });
}

// return services to this servant
const servicesToServant = ref<ServiceDto[]>();
getServicesToThisServant();
async function getServicesToThisServant() {
  await ServantService.getServantServices({ id: +route.params.id }).then(
    (Response) => {
      servicesToServant.value = Response?.services as [ServiceDto];
    }
  );
}

function clearData() {
  filterParameters.value = {
    id: +route.params.id,
    startAt: momentToday.toDate(),
    endAt: momentTomorrow.toDate(),
  };
  getPerformance();
}
function convertTime(timeInSeconds) {
  if (timeInSeconds < 60) {
    return timeInSeconds + "s"; // Seconds
  } else if (timeInSeconds < 3600) {
    const minutes = Math.floor(timeInSeconds / 60);
    return minutes + "m"; // Minutes
  } else {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return hours + "h " + minutes + "m"; // Hours and minutes
  }
}
</script>
<style lang="scss">
.performanceCard {
  height: 100px;
  background-color: var(--icon-background-color-kubak);
  border-radius: 5px;
  ion-icon {
    height: 50px;
    width: 50px;
    color: #aba9a9;
  }
}
</style>
