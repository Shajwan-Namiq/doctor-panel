<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="page-style">
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
                      v-model="filterData.startDate"
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
                      v-model="filterData.endDate"
                      :class="{
                        'p-invalid': filterData.startAt > filterData.endAt,
                      }"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      filterData.startAt > filterData.endAt
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
                    <ion-icon name="car-outline" class="text-xl"></ion-icon>
                  </span>
                  <span class="w-full">
                    <Dropdown
                      :options="services"
                      optionLabel="Typ"
                      :placeholder="$t('transportation.services.title')"
                      class="w-full"
                      v-model="filterData.service"
                    >
                      <template #value="valueProp">
                        {{ valueProp.value?.title ?? valueProp.placeholder }}
                      </template>
                      <template #option="slotProps">
                        <div class="country-item flex w-full p-2">
                          <div style="font-size: 14px">
                            {{ slotProps.option.title }}
                          </div>
                        </div>
                      </template>
                    </Dropdown>
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-3 flex flex-row flex-wrap justify-content-end">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="
                  exportAsXlsx(reportData, 'dailyReport.xlsx', 'dailyReport')
                "
                class="mr-2 mb-2"
              />
              <Button
                :label="$t('buttons.print')"
                icon="pi pi-print"
                severity="info"
                @click="printDiv('dailyReport')"
                class="mr-2 mb-2"
              />

              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mr-2 p-button-secondary mb-2"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="search"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startAt > filterData.endAt"
                class="mb-2"
              />
            </div>
          </div>
        </Transition>
      </div>
      <div class="w-full my-3 flex justify-content-end"></div>

      <DataTable
        id="dailyReport"
        :loading="requestStatusStore.loading || !reportData"
        :value="reportData"
        scrollHeight="calc(100vh - 430px)"
      >
        <Column
          v-for="(tableData, index) in tableInformation.headers"
          :key="index"
        >
          <template #header>
            <div
              class="h-full w-full flex justify-content-between cursor-pointer headerButton"
              @click="sortField(tableData)"
            >
              <div
                :style="
                  selectedFieldOrder &&
                  selectedFieldOrder.field == tableData.field
                    ? 'color: var(--primary-color-kubak) !important'
                    : ''
                "
              >
                {{ $t(tableData.header) }}
              </div>

              <i
                class="pi pi-sort-amount-down mx-2"
                style="color: var(--primary-color-kubak) !important"
                v-if="
                  selectedFieldOrder &&
                  selectedFieldOrder.field == tableData.field &&
                  selectedFieldOrder.sortOrder == -1
                "
              ></i>
              <i
                class="pi pi-sort-amount-up-alt mx-2"
                style="color: var(--primary-color-kubak) !important"
                v-else-if="
                  selectedFieldOrder &&
                  selectedFieldOrder.field == tableData.field &&
                  selectedFieldOrder.sortOrder == 1
                "
              ></i>
              <i class="pi pi-sort-alt mx-2" v-else></i>
            </div>
          </template>
          <template #body="{ data, column, index }">
            <div :class="reportData?.length == index + 1 ? 'childTest' : ''">
              {{ data[tableData.field] }}
            </div>
          </template>
        </Column>
        <template #empty>
          <div
            class="w-full flex justify-content-center flex-column align-items-center py-6"
            v-if="!requestStatusStore.loading && reportData"
          >
            <img
              src="@/static/images/empty.png"
              style="height: 80px; width: 150px"
            />

            <h3 class="mt-3">{{ $t("reusables.emptyRecordHeader") }}</h3>
            <p>{{ $t("reusables.emptyRecordDesc") }}</p>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import {
  ChartService,
  StaticTypeEnum,
  type MonthlyChartResponse,
  type ServiceDto,
} from "@/backend/transport";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import { printDiv } from "@/composables/printDiv";
import { ServiceStore } from "@/stores/common/service";
import { mapChartFilterDtoToChatFilter } from "./mapper";

const serviceStore = ServiceStore();

const services = ref<ServiceDto[]>([]);

const requestStatusStore = requestStatus();

const reportData = ref<MonthlyChartResponse[]>();

let totalData = {
  onlineServants: 0,
  requests: 0,
  noServantRequests: 0,
  noAcceptRequests: 0,
  successTasks: 0,
  canceledTasks: 0,
};
const tableInformation = {
  hideAddDialog: true,
  headers: [
    {
      field: "date",
      header: "transportation.common.date",
    },
    {
      field: "canceledTasks",
      header: "transportation.hourlyReport.fields.canceledTasks",
    },
    {
      field: "noAcceptRequests",
      header: "transportation.hourlyReport.fields.noAcceptRequests",
    },
    {
      field: "noServantRequests",
      header: "transportation.hourlyReport.fields.noServantRequests",
    },
    {
      field: "onlineServants",
      header: "transportation.hourlyReport.fields.onlineServants",
    },
    {
      field: "requests",
      header: "transportation.hourlyReport.fields.requests",
    },
    {
      field: "successTasks",
      header: "transportation.hourlyReport.fields.successTasks",
    },
  ],
};

const filterData = ref<any>({
  startDate: new Date(startOfToday),
  endDate: new Date(endOfToday),
  service: services.value[0],
  type: StaticTypeEnum.DAILY,
});
const selectedFieldOrder = ref<any>({
  field: "",
  sortOrder: 1,
});
onMounted(async () => {
  await serviceStore.getAllServices().then((res) => {
    services.value = res as ServiceDto[];
    filterData.value.service = services.value[0];
  });
  getDailyReport();
});
async function getDailyReport() {
  totalData = {
    onlineServants: 0,
    requests: 0,
    noServantRequests: 0,
    noAcceptRequests: 0,
    successTasks: 0,
    canceledTasks: 0,
  };
  ChartService.getTaskStatus(
    mapChartFilterDtoToChatFilter(filterData.value)
  ).then((Response) => {
    reportData.value = Response;
    reportData.value.map((item: any) => {
      totalData.onlineServants += item.onlineServants;
      totalData.requests += item.requests;
      totalData.noServantRequests += item.noServantRequests;
      totalData.noAcceptRequests += item.noAcceptRequests;
      totalData.successTasks += item.successTasks;
      totalData.canceledTasks += item.canceledTasks;
    });
    reportData.value.push({
      date: "Total",
      onlineServants: totalData.onlineServants,
      requests: totalData.requests,
      noServantRequests: totalData.noServantRequests,
      noAcceptRequests: totalData.noAcceptRequests,
      successTasks: totalData.successTasks,
      canceledTasks: totalData.canceledTasks,
    });
  });
}

function clearData() {
  filterData.value = {
    startDate: new Date(startOfToday),
    endDate: new Date(endOfToday),
    service: services.value[0],
    type: StaticTypeEnum.DAILY,
  };
}
function search() {
  getDailyReport();
}
async function sortField(data: any) {
  selectedFieldOrder.value = {
    field: data.field,
    sortOrder: selectedFieldOrder.value.sortOrder == 1 ? -1 : 1,
  };
  reportData.value = reportData.value?.sort((a, b) => {
    if (a.date == "Total" || b.date == "Total") return 1;
    if (selectedFieldOrder.value.sortOrder === -1) {
      return a[data.field] > b[data.field] ? 1 : -1;
    } else {
      return a[data.field] < b[data.field] ? 1 : -1;
    }
  });
}
</script>
<style lang="scss">
.dailyReportPage {
  .p-datatable .p-datatable-thead > tr > th {
    padding: 0 !important;
  }
  .headerButton {
    padding: 1.4rem 1rem;
    background-color: transparent;
    &:hover {
      background-color: var(--surface-hover);
    }
  }
}
td:has(> .childTest) {
  background-color: var(--icon-background-color-kubak);
  position: sticky;
  bottom: 0;
  z-index: 1;
  height: 60px;
}
</style>
