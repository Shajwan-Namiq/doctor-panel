<template>
  <div class="px-3 md:px-6 py-4 w-full flex justify-content-center">
    <div class="pageWrapper xl:w-9 w-full">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid px-6 pt-4" style="width: 100% !important">
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
                      v-model="filterData.startAt"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startAt")
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
                      dateFormat="dd-mm-yy"
                      v-model="filterData.endAt"
                      :class="{
                        'p-invalid': filterData.startAt > filterData.endAt,
                      }"
                    />
                    <label for="inputgroup">{{
                      filterData.startAt > filterData.endAt
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
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    display="chip"
                    :placeholder="$t('auth.area.region')"
                    v-model="selectedRegion"
                    @change="changeRegion"
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
            </div>
            <div class="px-6 mt-3 mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.clear')"
                @click="clearData"
                class="mx-2 p-button-secondary"
              />
              <Button
                :label="$t('buttons.filter')"
                @click="fetchData"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startAt > filterData.endAt"
              />
            </div>
          </div>
        </Transition>
      </div>
      <DataTable
        class="rolesTable px-6"
        :value="taskData.items"
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
              {{ dateFormat(slotProps.data.date) }}
            </p>
          </template>
        </Column>

        <template #expansion="roleProps">
          <div class="orders-subtable">
            <DataTable :value="roleProps.data.hours" responsiveLayout="scroll">
              <Column :header="$t('transportation.hourlyReport.fields.hour')">
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.hour }}
                  </p>
                </template>
              </Column>
              <Column
                :header="$t('transportation.hourlyReport.fields.requests')"
              >
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.requests }}
                  </p>
                </template>
              </Column>
              <Column
                :header="
                  $t('transportation.hourlyReport.fields.noServantRequests')
                "
              >
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.noServantRequests }}
                  </p>
                </template>
              </Column>
              <Column
                :header="
                  $t('transportation.hourlyReport.fields.noAcceptRequests')
                "
              >
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.noAcceptRequests }}
                  </p>
                </template>
              </Column>
              <Column
                :header="$t('transportation.hourlyReport.fields.successTasks')"
              >
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.successTasks }}
                  </p>
                </template>
              </Column>
              <Column
                :header="$t('transportation.hourlyReport.fields.canceledTasks')"
              >
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.canceledTasks }}
                  </p>
                </template>
              </Column>
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
import { ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import {
  customRequestFormFormat,
  momentToday,
  momentTomorrow,
} from "@/composables/customRequest";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import moment from "moment";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { ServiceService } from "@/backend/transport";

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();

const selectedRegion = ref();
const taskData = ref({ items: [] });
const filterData = ref<any>({
  startAt: momentToday.toDate(),
  endAt: momentTomorrow.toDate(),
  regionId: undefined,
});
const expandedRows = ref<any>([]);

function formatData() {
  const requestData: any = {};
  Object.assign(requestData, filterData.value);
  customRequestFormFormat(requestData, {
    startAt: "RequestDateFormat",
    endAt: "RequestDateFormat",
  });
  return requestData;
}
fetchData();
function fetchData() {
  ServiceService.listHourlyServiceStatistic(formatData()).then((Response) => {
    taskData.value = { items: [] };
    for (const index in Response.items) {
      taskData.value.items[index] = {
        id: parseInt(index),
        date: Response.items[index].dateTime,
      };
    }
  });
}

function changeRegion() {
  filterData.value.regionId = selectedRegion.value.id;
}
function clearData() {
  filterData.value = {
    startAt: momentToday.toDate(),
    endAt: momentTomorrow.toDate(),
    regionId: undefined,
  };
  selectedRegion.value = undefined;
}
function dateFormat(date: string) {
  return moment(new Date(date)).format("DD-MM-YYYY");
}
</script>
