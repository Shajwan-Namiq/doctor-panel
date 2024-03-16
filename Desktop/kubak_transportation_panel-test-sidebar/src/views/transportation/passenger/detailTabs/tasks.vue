<template>
  <div class="">
    <div class="pageWrapper">
      <Transition name="slide-down">
        <div class="py-3">
          <div class="grid px-6" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    dateFormat="dd-mm-yy"
                    v-model="filterData.servantId"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.id")
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
                    dateFormat="dd-mm-yy"
                    v-model="filterData.startAt"
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
                    dateFormat="dd-mm-yy"
                    v-model="filterData.endAt"
                    :class="{
                      'p-invalid':
                        filterData.startAt && filterData.endAt
                          ? filterData.startAt > filterData.endAt
                          : '',
                    }"
                  />
                  <label for="inputgroup"
                    >{{
                      filterData.startAt && filterData.endAt
                        ? filterData.startAt > filterData.endAt
                          ? $t(
                              "validationMessages.end_date_must_greater_than_start_date"
                            )
                          : ""
                        : $t("transportation.common.endAt")
                    }}
                  </label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="business-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  display="chip"
                  :placeholder="$t('auth.area.region')"
                  v-model="filterData.regionId"
                  :options="regions"
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
                  <ion-icon
                    name="color-filter-outline"
                    class="text-2xl"
                  ></ion-icon>
                </span>
                <Dropdown
                  :options="taskStatuses"
                  display="chip"
                  :placeholder="$t('transportation.tasks.fields.status')"
                  v-model="filterData.status"
                >
                  <template #value="valueProp">
                    {{
                      valueProp.value
                        ? $t(`dropdowns.tasks.taskStatus.${valueProp.value}`)
                        : valueProp.placeholder
                    }}
                  </template>
                  <template #option="slotProps">
                    <p>
                      {{ $t(`dropdowns.tasks.taskStatus.${slotProps.option}`) }}
                    </p>
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>
          <div class="px-6 flex justify-content-end">
            <Button
              :label="$t('buttons.clear')"
              @click="clearData"
              class="mx-2 p-button-secondary"
            />
            <Button
              :label="$t('buttons.filter')"
              @click="getUserTasks"
              :loading="requestStatusStore.loading"
              :disabled="
                filterData.startAt && filterData.endAt
                  ? filterData.startAt > filterData.endAt
                  : false
              "
            />
          </div>
        </div>
      </Transition>
      <TableComponent
        :tableInformation="tableInformation"
        :response="tasks"
        @clickedFirstCell="detail"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TableComponent from "@/common/interfaces/tableComponent.vue";
import Button from "primevue/button";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { customRequestFormFormat } from "@/composables/customRequest";
import { TaskService } from "@/backend/transport/services/TaskService";
import { RegionStore } from "@/stores/common/region";
import { TaskStatusEnum } from "@/backend/transport";
import type { RegionDto } from "@/backend/auth";

const taskStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();
const props = defineProps(["uid"]);

const tableInformation = {
  clickFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "requestId",
      header: "transportation.tasks.fields.requestId",
      clickable: true,
    },
    {
      field: "price",
      header: "transportation.tasks.fields.price",
    },
    {
      field: "tip",
      header: "transportation.tasks.fields.tip",
    },
    {
      field: "distance",
      header: "transportation.tasks.fields.distance",
    },
    {
      field: "duration",
      header: "transportation.tasks.fields.duration",
    },
    {
      field: "createdAt",
      header: "transportation.common.startDate",
      format: "DD-MM-YYYY",
    },
    {
      field: "createdAt",
      header: "transportation.common.startTime",
      format: "hh:mm:ss",
    },
    {
      field: "status",
      header: "transportation.tasks.fields.status",
      status: "Status",
      value: "transportation.tasks.statuses",
    },
  ],
  actions: { info: true },
};
const filterData = ref({
  clientId: props.uid,
  servantId: undefined,
  includeRequest: undefined,
  includeServant: undefined,
  regionId: undefined,
  startAt: undefined,
  endAt: undefined,
  status: undefined,
  page: 0,
});
const tasks = ref();
getUserTasks();
function getUserTasks() {
  TaskService.listTasksByClient(formatData()).then((Response) => {
    tasks.value = Response;
  });
}

const router = useRouter();
function detail(data) {
  router.push({
    name: "detailTask",
    params: {
      id: data.id,
    },
  });
}
function formatData() {
  const requestData: any = {};
  Object.assign(requestData, filterData.value);
  customRequestFormFormat(requestData, {
    startAt: "RequestDateFormat",
    endAt: "RequestDateFormat",
    regionId: "getId",
  });
  return requestData;
}

function clearData() {
  filterData.value = {
    clientId: props.uid,
    servantId: undefined,
    includeRequest: undefined,
    includeServant: undefined,
    regionId: undefined,
    startAt: undefined,
    endAt: undefined,
    status: undefined,
    page: 0,
  };
}
</script>
<style lang="scss"></style>
