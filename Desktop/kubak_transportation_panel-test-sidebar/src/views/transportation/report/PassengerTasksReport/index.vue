<template>
  <div class="page-style" @keyup.enter="search">
    <div class="page-container">
      <div class="w-full">
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
                      <ion-icon
                        name="color-filter-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <MultiSelect
                      :options="taskStatuses"
                      display="chip"
                      :placeholder="
                        $t('dropdowns.tasks.taskStatus.placeholder')
                      "
                      v-model="filterData.taskStatuses"
                    >
                      <template #value="valueProp">
                        {{
                          valueProp.value
                            ? valueProp.value.map((x: any) => x).join(" , ")
                            : valueProp.placeholder
                        }}
                      </template>
                      <template #option="slotProps">
                        <p>
                          {{ slotProps.option }}
                        </p>
                      </template>
                    </MultiSelect>
                  </div>
                </div>

                <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                  <SearchUserComponent
                    @selectedUsers="
                      (selectedUser) => {
                        filterData.passengerUsers = selectedUser;
                      }
                    "
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
                  :label="$t('buttons.filter')"
                  @click="search"
                  :loading="requestStatusStore.loading"
                  :disabled="filterData.fromDate > filterData.toDate"
                  icon="pi pi-filter"
                />
              </div>
            </div>
          </Transition>
        </div>
        <div>
          <TableComponent
            :tableInformation="tableInformation"
            :response="passengersTasks"
            @page="paginate"
            @clickedFirstCell="detail"
            @middleClickedFirstCell="openNewTab"
          >
          </TableComponent>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { TaskStatusEnum } from "@/backend/transport/models/TaskStatusEnum";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  PassengerTasksFilterDataDto,
  createMapPassengerFilterDtoToPassengerFilter,
} from "./mapper";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { PassengersService, type ServiceDto } from "@/backend/transport";
import { getAllRegions } from "@/views/auth/regions/regions";
import { getAllServices } from "../../services/getAllService";
import MultiSelect from "primevue/multiselect";

const taskStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);
const regions = ref<RegionDto[]>();
const services = ref<ServiceDto[]>();
const requestStatusStore = requestStatus();

const passengersTasks = ref();

const selectedRegion = ref();

const tableInformation = {
  clickFirstCell: true,
  middleClickedFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "userDisplayName",
      header: "transportation.passenger.displayName",
    },
    {
      field: "userPhoneNumber",
      header: "transportation.passenger.passengerMobile",
    },
    {
      field: "numberOfTask",
      header: "transportation.tasks.fields.numberOfTask",
    },
    {
      field: "totalTaskRawPrice",
      header: "transportation.tasks.fields.totalTaskRawPrice",
    },
  ],
  actions: { info: true },
  policies: {
    infoPolicy: "ReadTask",
  },
};
const filterData = ref<PassengerTasksFilterDataDto>({
  fromDate: new Date(startOfToday),
  toDate: new Date(endOfToday),
  region: undefined,
  service: undefined,
  taskStatuses: undefined,
  passengerUsers: undefined,
  paginated: undefined,
  page: undefined,
});
const router = useRouter();

onMounted(async () => {
  regions.value = await getAllRegions();
  services.value = await getAllServices();
  getPassengersTasks();
});

async function getPassengersTasks() {
  await PassengersService.getPassengersReport(
    createMapPassengerFilterDtoToPassengerFilter(filterData.value)
  ).then((res) => {
    passengersTasks.value = res;
  });
}

// open it on the same tab
function detail(data) {
  router.push({
    name: "userDetail",
    params: {
      id: data.userId,
    },
  });
}

// open it on a new tab
function openNewTab(data, event) {
  if (event.button === 1) {
    const routeData = router.resolve({
      name: "userDetail",
      params: {
        id: data.userId,
      },
    });
    window.open(routeData.href, "_blank");
  }
}

function search() {
  getPassengersTasks();
}

function clearData() {
  filterData.value = {
    fromDate: new Date(startOfToday),
    toDate: new Date(endOfToday),
    region: undefined,
    service: undefined,
    taskStatuses: undefined,
    passengerUsers: undefined,
    paginated: undefined,
    page: undefined,
  };
  selectedRegion.value = undefined;
}
function paginate(event) {
  filterData.value.page = event.page;
  getPassengersTasks();
}
async function exportAsExcel() {
  const paginateFilterData = Object.assign({}, filterData.value);
  paginateFilterData.paginated = false;
  await PassengersService.getPassengersReport(
    createMapPassengerFilterDtoToPassengerFilter(paginateFilterData)
  ).then((res) => {
    exportAsXlsx(
      res,
      "passengersTasksReport.xlsx",
      "passengersTasksReport.xlsx"
    );
  });
}
</script>
<style lang="scss"></style>
