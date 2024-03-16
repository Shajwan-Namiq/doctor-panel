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
                    v-model="requestFilterParameters.startDate"
                    dateFormat="dd-mm-yy"
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
                  <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <Calendar
                    v-model="requestFilterParameters.endDate"
                    dateFormat="dd-mm-yy"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.common.endDate")
                  }}</label>
                </span>
              </div>
            </div>

            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon
                    name="remove-circle-outline"
                    class="text-2xl"
                  ></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    id="inputgroup"
                    v-model="requestFilterParameters.excludeStartHour"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.common.excludeStartHour")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon
                    name="remove-circle-outline"
                    class="text-2xl"
                  ></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    id="inputgroup"
                    v-model="requestFilterParameters.excludeEndHour"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.common.excludeEndHour")
                  }}</label>
                </span>
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
              @click="filterData"
              :loading="requestStatusStore.loading"
            />
          </div>
        </div>
      </Transition>
    </div>
    <DataTable
      class=""
      :value="periodsData?.items"
      v-model:expandedRows="expandedRows"
      dataKey="id"
      responsiveLayout="scroll"
      :lazy="true"
      :loading="requestStatusStore.loading"
      :rowReorder="true"
      :paginator="true"
      :rows="9"
      @page="pagePaginator"
      :totalRecords="totalRecords"
    >
      <template #header>
        <div class="table-header flex w-full justify-content-between px-4">
          <div>
            {{ $t("transportation.servant.onlinePeriod.onlineTime") }} /
            {{ periodsData?.metadata?.totalOnlineTime }}
          </div>
          <div>
            {{ $t("transportation.servant.onlinePeriod.totalTimeSec") }} /
            {{ periodsData?.metadata?.totalOnlineTimeInSeconds }}
          </div>
        </div>
      </template>
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column :header="$t('transportation.servant.onlinePeriod.total')">
        <template #body="slotProps">
          <p>
            {{ slotProps.data.totalOnlineTime }}
          </p>
        </template>
      </Column>
      <Column :header="$t('transportation.common.date')">
        <template #body="slotProps">
          <p>
            {{ toLocalDateFormat(slotProps.data.date) }}
          </p>
        </template>
      </Column>

      <template #expansion="periodProps">
        <div class="orders-subtable">
          <DataTable
            :value="periodProps.data.periods"
            responsiveLayout="scroll"
          >
            <Column field="Name" header="start date">
              <template #body="itemsProp">
                <p>
                  {{ toLocalTimeFormat(itemsProp.data.startAt) }}
                </p>
              </template>
            </Column>
            <Column field="Name" header="end date">
              <template #body="itemsProp">
                <p>
                  {{ toLocalTimeFormat(itemsProp.data.endAt) }}
                </p>
              </template>
            </Column>
            <Column header="total">
              <template #body="itemsProp">
                <p>
                  {{ itemsProp.data.diffInTime }}
                </p>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Calendar from "primevue/calendar";
import { requestStatus } from "@/stores/common/requestStatus";
import {
  toLocalTimeFormat,
  toLocalDateFormat,
  momentToday,
  momentTomorrow,
  startOfToday,
  endOfToday,
} from "@/composables/customRequest";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ServantService } from "@/backend/transport";
import { OnlinePeriodFilterRequestDto, mapOnlinePeriodRequest } from "./mapper";

const requestStatusStore = requestStatus();

const totalRecords = ref<number>(0);
const route = useRoute();
const expandedRows = ref([]);
const periodsData = ref();
const requestFilterParameters = ref<OnlinePeriodFilterRequestDto>({
  id: +route.params.id,
  page: 0,
  startDate: new Date(startOfToday),
  endDate: new Date(endOfToday),
  excludeStartHour: 0,
  excludeEndHour: 0,
});

getPeriods();
function getPeriods() {
  ServantService.getOnlineServantSessions(
    mapOnlinePeriodRequest(requestFilterParameters.value)
  ).then((Response) => {
    periodsData.value = Response;
    totalRecords.value = periodsData.value?.count ?? 0;
  });
}

function filterData() {
  getPeriods();
}
function pagePaginator(event) {
  requestFilterParameters.value.page = event.page;
  getPeriods();
}
function clearData() {
  requestFilterParameters.value = {
    id: +route.params.id,
    page: 0,
    startDate: momentToday.toDate(),
    endDate: momentTomorrow.toDate(),
    excludeStartHour: 0,
    excludeEndHour: 0,
  };
}
</script>
