<template>
  <div class="page-style requestsList">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid pt-4">
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
                      showTime
                      showSeconds
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
                    :placeholder="$t('auth.area.regions')"
                    v-model="filterData.region"
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
                    :options="requestStatuses"
                    display="chip"
                    :placeholder="$t('dropdowns.requestStatuses.Placeholder')"
                    v-model="filterData.status"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(`dropdowns.requestStatuses.${valueProp.value}`)
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(`dropdowns.requestStatuses.${slotProps.option}`)
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="getAllRequests()"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startAt > filterData.endAt"
              />
            </div>
          </div>
        </Transition>
      </div>
      <DataTable
        :value="requests.items"
        v-model:expandedRows="expandedRows"
        dataKey="phoneNumber"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestLoading"
        :rowReorder="true"
        :paginator="true"
        :rows="requests?.limit ?? 10"
        :totalRecords="requests?.count"
        @page="paginate"
      >
        <template #header>
          <div class="table-header">
            {{ $t("transportation.serviceType.name") }}
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column
          v-for="(header, index) in tableHeaders.headers"
          :key="index"
          :header="$t(`transportation.requests.${header}`)"
        >
          <template #body="slotProps">
            {{
              header == "lastRequestAt"
                ? moment
                    .utc(slotProps.data[header])
                    .local()
                    .format("DD-MM-YYYY hh:mm:ss ")
                : slotProps.data[header]
            }}
          </template>
        </Column>

        <Column :exportable="false" style="width: 10rem"> </Column>
        <template #expansion="serviceProps">
          <div class="orders-subtable">
            <DataTable
              :value="serviceProps.data.requests"
              responsiveLayout="scroll"
              class="expanded-table"
            >
              <Column
                v-for="(subHeader, index) in tableHeaders.subHeaders"
                :key="index"
                :header="$t(`transportation.requests.${subHeader}`)"
              >
                <template #body="requestProp">
                  <div
                    :class="
                      subHeader == 'statusEnum'
                        ? `requestStatuses ${requestProp.data[subHeader]}`
                        : ''
                    "
                  >
                    {{
                      subHeader == "type"
                        ? $t(
                            `transportation.requests.${requestProp.data[subHeader]}`
                          )
                        : subHeader == "createdAt"
                        ? moment
                            .utc(requestProp.data[subHeader])
                            .local()
                            .format("DD-MM-YYYY hh:mm:ss ")
                        : requestProp.data[subHeader]
                    }}
                  </div>
                </template>
              </Column>

              <Column :exportable="false" style="width: 10rem">
                <template #body="serviceProp">
                  <Button
                    icon="pi pi-info"
                    class="p-button-success mr-2"
                    v-tooltip.bottom="'more detail'"
                    @click="detail(serviceProp.data)"
                  />
                  <Button
                    v-if="serviceProp.data?.taskId"
                    icon="pi pi-car"
                    class="p-button-success mr-2"
                    v-tooltip.bottom="'task detail'"
                    @click="taskDetail(serviceProp.data?.taskId)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #footer>
          <div class="w-full flex justify-content-end px-8">
            {{ $t("transportation.requests.totalUsers") }}:
            {{ requests?.count }}
          </div>
          <div class="w-full flex justify-content-end px-8">
            {{ $t("transportation.requests.totalRequests") }}:
            {{ requests?.metadata?.requestCount }}
          </div>
        </template>
        <template #empty>
          <div
            class="w-full flex justify-content-center flex-column align-items-center py-6"
            v-if="
              !requestStatusStore.loading &&
              requests.count !== undefined &&
              requests.count == 0
            "
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

<script setup lang="ts">
import { endOfToday, startOfToday } from "@/composables/customRequest";
import { requestStatus } from "@/stores/common/requestStatus";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  RequestService,
  RequestStatusEnum,
  type ListAggregatedRequestResultPagination,
} from "@/backend/transport";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import moment from "moment";
import {
  createMapRequestListFilterDtoToRequestListFilter,
  type RequestListFilterDto,
} from "./mapper";

const router = useRouter();
const expandedRows = ref<any>([]);
const requestLoading = ref<boolean>(false);
const requestStatusStore = requestStatus();
const requestStatuses = Object.keys(RequestStatusEnum).map(
  (key) => RequestStatusEnum[key]
);
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const tableHeaders = {
  headers: [
    "name",
    "phoneNumber",
    "lastRequestAt",
    "allRequestsCount",
    "acceptedRequestsCount",
    "cancelledRequestsCount",
    "timedOutRequestsCount",
  ],
  subHeaders: [
    "sourceLocationName",
    "rawPrice",
    "userPrice",
    "statusEnum",
    "type",
    "createdAt",
  ],
};
const filterData = ref<RequestListFilterDto>({
  startAt: new Date(startOfToday), // Convert moment object to native Date object
  endAt: new Date(endOfToday),
  region: undefined,
  status: undefined,
  page: 0,
});

const requests = ref<ListAggregatedRequestResultPagination>({
  items: [],
});
getAllRequests();
async function getAllRequests() {
  requestLoading.value = true;
  await RequestService.listAggregatedRequests(
    createMapRequestListFilterDtoToRequestListFilter(filterData.value)
  ).then((Response) => {
    requests.value = Response;
  });
  requestLoading.value = false;
}

function detail(data) {
  router.push({
    name: "requestsDetail",
    params: { id: data.id },
  });
}
function clearData() {
  filterData.value = {
    startAt: new Date(startOfToday), // Convert moment object to native Date object
    endAt: new Date(endOfToday),
    region: undefined,
    status: undefined,
    page: 0,
  };
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllRequests();
}
function taskDetail(taskId) {
  router.push({
    name: "detailTask",
    params: {
      id: taskId,
    },
  });
}
</script>
<style lang="scss">
.requestsList {
  .expanded-table {
    .p-datatable-wrapper {
      background-color: #efefef;
    }
  }
}
</style>
