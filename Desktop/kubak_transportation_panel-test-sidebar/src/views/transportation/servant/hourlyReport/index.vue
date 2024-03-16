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
                      dateFormat="dd-mm-yy "
                      hourFormat="24"
                      showTime
                      showSeconds
                      v-model="filterData.startDateTime"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy "
                      hourFormat="24"
                      showTime
                      showSeconds
                      v-model="filterData.endDateTime"
                      :class="{
                        'p-invalid':
                          filterData.startDateTime > filterData.endDateTime,
                      }"
                    />
                    <label for="inputgroup">{{
                      filterData.startDateTime > filterData.endDateTime
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
                    display="chip"
                    :placeholder="$t('auth.area.region')"
                    :options="regions"
                    v-model="filterData.region"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.name ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option.name }}</p>
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
                    display="chip"
                    :placeholder="$t('transportation.services.title')"
                    :options="services"
                    v-model="filterData.service"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.title ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option.title }}</p>
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
                @click="fetchData"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startDateTime > filterData.endDateTime"
              />
            </div>
          </div>
        </Transition>
      </div>
      <DataTable
        :value="servantData"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
        :rowReorder="true"
      >
        <template #header>
          <div class="table-header">
            {{ $t("transportation.hourlyReport.title") }}
          </div>
        </template>

        <Column :expander="true" headerStyle="width: 3rem" />
        <Column :header="$t('transportation.common.date')">
          <template #body="slotProps">
            <p>
              {{ slotProps.data.date }}
            </p>
          </template>
        </Column>

        <template #expansion="servantsProps">
          <div class="orders-subtable">
            <DataTable
              :value="servantsProps.data.items"
              responsiveLayout="scroll"
            >
              <Column :header="$t('transportation.hourlyReport.fields.hour')">
                <template #body="itemsProps">
                  <p>
                    {{ itemsProps.data.hour }}
                  </p>
                </template>
              </Column>
              <Column
                :header="
                  $t('transportation.hourlyReport.fields.onlineServants')
                "
              >
                <template #body="itemsProps">
                  <p>
                    {{ itemsProps.data.onlineServants }}
                  </p>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #empty>
          <div
            class="w-full flex justify-content-center flex-column align-items-center py-6"
          >
            <img
              src="@/static/images/empty.png"
              style="height: 80px; width: 150px"
            />

            <h3 class="mt-3">{{ $t("reusables.emptyRecordHeader") }}</h3>
            <p>{{ $t("reusables.emptyRecordDesc") }}</p>
          </div>
        </template>
        <ConfirmDialog></ConfirmDialog>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import { ServantService, type ServiceDto } from "@/backend/transport";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import {
  ServantHourlyReportFilterDto,
  mapServantHourlyReportFilter,
} from "./mapper";
import { getAllRegions } from "@/views/auth/regions/regions";
import { getAllServices } from "../../services/getAllService";

const regions = ref<RegionDto[]>();
const services = ref<ServiceDto[]>();
const requestStatusStore = requestStatus();

const servantData = ref();
const filterData = ref<ServantHourlyReportFilterDto>({
  startDateTime: new Date(startOfToday),
  endDateTime: new Date(endOfToday),
  region: undefined,
  service: {},
  page: 0,
});
const expandedRows = ref<any>([]);

onMounted(async () => {
  regions.value = await getAllRegions();
  services.value = await getAllServices();
  filterData.value.service = services.value ? services.value[0] : {};
  fetchData();
});
function fetchData() {
  ServantService.getServantHourlyStats(
    mapServantHourlyReportFilter(filterData.value)
  ).then((Response) => {
    servantData.value = [];
    for (const index in Response) {
      servantData.value[parseInt(index)] = {
        id: parseInt(index),
        date: Response[index].day,
        items: Response[index].items,
      };
    }
  });
}

function clearData() {
  filterData.value = {
    startDateTime: new Date(startOfToday),
    endDateTime: new Date(endOfToday),
    region: undefined,
    service: services.value ? services.value[0] : {},
    page: 0,
  };
}
</script>
<style lang="scss">
.servantStatus {
  height: 34px;
  width: 115px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.Reserve {
    background-color: #1cbfad;
    color: white;
  }
}
</style>
