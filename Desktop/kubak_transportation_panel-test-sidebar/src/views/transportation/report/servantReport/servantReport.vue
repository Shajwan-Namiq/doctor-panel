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
                    <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="services"
                    display="chip"
                    :placeholder="$t('fields.service')"
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
                    <i class="pi pi-user-minus" style="color: slateblue"></i>
                  </span>
                  <span class="p-float-label">
                    <InputNumber id="inputgroup" v-model="filterData.minTask" />
                    <label for="inputgroup">{{
                      $t("dropdowns.tasks.taskStatus.MinTask")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user-plus" style="color: slateblue"></i>
                  </span>
                  <span class="p-float-label">
                    <InputNumber id="inputgroup" v-model="filterData.maxTask" />
                    <label for="inputgroup">{{
                      $t("dropdowns.tasks.taskStatus.MaxTask")
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
                      showTime
                      hourFormat="24"
                      showSeconds
                      v-model="filterData.createdFromDate"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.createServant")
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
                      showTime
                      hourFormat="24"
                      showSeconds
                      v-model="filterData.createdTillDate"
                      :class="{
                        'p-invalid':
                          filterData.createdFromDate &&
                          filterData.createdTillDate &&
                          filterData.createdFromDate >
                            filterData.createdTillDate,
                      }"
                    />
                    <label for="inputgroup">{{
                      filterData.createdFromDate &&
                      filterData.createdTillDate &&
                      filterData.createdFromDate > filterData.createdTillDate
                        ? $t(
                            "validationMessages.end_date_must_greater_than_start_date"
                          )
                        : $t("transportation.common.workdayEndsServant")
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
                      showTime
                      hourFormat="24"
                      showSeconds
                      v-model="filterData.tasksFromDate"
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
                      showTime
                      hourFormat="24"
                      showSeconds
                      v-model="filterData.tasksTillDate"
                      :class="{
                        'p-invalid':
                          filterData.tasksFromDate &&
                          filterData.tasksTillDate &&
                          filterData.tasksFromDate > filterData.tasksTillDate,
                      }"
                    />
                    <label for="inputgroup">{{
                      filterData.tasksFromDate &&
                      filterData.tasksTillDate &&
                      filterData.tasksFromDate > filterData.tasksTillDate
                        ? $t(
                            "validationMessages.end_date_must_greater_than_start_date"
                          )
                        : $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchServantsComponent
                  @selectedServants="
                    (selectedServant) => {
                      filterData.servants = selectedServant;
                    }
                  "
                  :clearSelectedUsers="clearSelectedUsersTrigger"
                />
              </div>
            </div>
            <div class="flex justify-content-end mb-3">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="exportAsExcel"
              />
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                @click="clearData"
                class="mx-2 p-button-secondary"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                :loading="requestStatusStore.loading"
                @click="getServantReport"
              />
            </div>
          </div>
        </Transition>
      </div>

      <TableComponent
        :tableInformation="tableInformation"
        :response="servantReportData"
        @page="paginate"
      >
        <template #customColumn="slotProp">
          <StarRating v-model="slotProp.data.servantRating" />
        </template>

        <template #customColumnHeader>{{
          $t("transportation.servantReport.fields.servantRating")
        }}</template>
      </TableComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ServantService, type ServiceDto } from "@/backend/transport";
import { ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import type { RegionDto } from "@/backend/auth";
import { RegionStore } from "@/stores/common/region";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import Calendar from "primevue/calendar";
import { ServiceStore } from "@/stores/common/service";
import StarRating from "@/components/StarRating.vue";
import {
  mapServantReportFilterToServantReportFilterDto,
  type ServantReportFilterDto,
} from "./mapper";
import SearchServantsComponent from "@/components/searchServantDropdown.vue";
import { endOfToday, startOfToday } from "@/composables/customRequest";

const servantReportData = ref({});
const requestStatusStore = requestStatus();

const tableInformation = {
  hideAddDialog: true,
  headers: [
    {
      field: "servantName",
      header: "transportation.servantReport.fields.servantName",
    },
    {
      field: "numberOfTasks",
      header: "transportation.servantReport.fields.numberOfTasks",
    },
    {
      field: "totalRawPriceOfTasks",
      header: "transportation.servantReport.fields.totalRawPriceOfTasks",
    },
    {
      field: "totalCommissionOfTasks",
      header: "transportation.servantReport.fields.totalCommissionOfTasks",
    },
  ],
};

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});

const serviceStore = ServiceStore();
const services = ref<ServiceDto[]>();

serviceStore.getAllServices().then((res) => {
  services.value = res;
});

const filterData = ref<ServantReportFilterDto>({
  region: undefined,
  service: undefined,
  createdFromDate: undefined,
  createdTillDate: undefined,
  tasksFromDate: new Date(startOfToday),
  tasksTillDate: new Date(endOfToday),
  minTask: undefined,
  maxTask: undefined,
  servants: undefined,
  page: 0,
});

const clearSelectedUsersTrigger = ref(false);

function clearData() {
  filterData.value = {
    region: undefined,
    service: undefined,
    createdFromDate: undefined,
    createdTillDate: undefined,
    tasksFromDate: new Date(startOfToday),
    tasksTillDate: new Date(endOfToday),
    minTask: undefined,
    maxTask: undefined,
    servants: undefined,
    page: 0,
  };
  clearSelectedUsersTrigger.value = !clearSelectedUsersTrigger.value;
  getServantReport();
}

getServantReport();
function getServantReport() {
  ServantService.getRankedServantByTaskReport(
    mapServantReportFilterToServantReportFilterDto(filterData.value)
  )
    .then((Response) => {
      servantReportData.value = Response;
    })
    .catch(() => {
      servantReportData.value = [];
    });
}

async function exportAsExcel() {
  const paginateFilterData = Object.assign({}, filterData.value);
  paginateFilterData.paginated = false;
  await ServantService.getRankedServantByTaskReport(
    mapServantReportFilterToServantReportFilterDto(paginateFilterData)
  ).then((res) => {
    exportAsXlsx(res, "servantRankingReport.xlsx", "servantRankingReport.xlsx");
  });
}

function paginate(event) {
  filterData.value.page = event.page;
  getServantReport();
}
</script>
