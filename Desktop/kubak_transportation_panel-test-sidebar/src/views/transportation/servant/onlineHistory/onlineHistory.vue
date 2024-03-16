<template>
  <div class="page-style">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <SearchServantsComponent
                  @selectedServants="
                    (selectedServant) => {
                      filterData.servants = selectedServant;
                    }
                  "
                  :clearSelectedUsers="clearSelectedUsersTrigger"
                />
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
                      v-model="filterData.startDate"
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
                      hourFormat="24"
                      showTime
                      showSeconds
                      v-model="filterData.endDate"
                      :class="{
                        'p-invalid': filterData.startDate > filterData.endDate,
                      }"
                    />
                    <label for="inputgroup">{{
                      filterData.startDate > filterData.endDate
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
                    <ion-icon name="time-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.includeStartHour"
                      dateFormat="HH:mm:ss"
                      timeOnly
                      showSeconds
                    />

                    <label for="inputgroup">{{
                      $t("transportation.common.includeStartHour")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="time-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.includeEndHour"
                      dateFormat="HH:mm:ss"
                      timeOnly
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.includeEndHour")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="timer-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      id="inputgroup"
                      v-model="filterData.minHours"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.minHour")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="showTaskDurationOptions"
                    display="chip"
                    :placeholder="
                      $t(
                        'transportation.onlineHistory.fields.calculateInTaskDuration.placeholder'
                      )
                    "
                    v-model="filterData.calculateInTaskDuration"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value !== undefined
                          ? $t(
                              `transportation.onlineHistory.fields.calculateInTaskDuration.${valueProp.value}`
                            )
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(
                            `transportation.onlineHistory.fields.calculateInTaskDuration.${slotProps.option}`
                          )
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
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
                @click="getOnlineHistory"
                :disabled="filterData.startDate > filterData.endDate"
              />
            </div>
          </div>
        </Transition>
      </div>

      <tableComponent
        :tableInformation="tableInformation"
        :response="onlineHistory"
        @clickedFirstCell="detail"
        @page="paginate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import tableComponent from "@/common/interfaces/tableComponent.vue";
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import InputNumber from "primevue/inputnumber";
import { requestStatus } from "@/stores/common/requestStatus";
import { RegionStore } from "@/stores/common/region";
import {
  ServantService,
  ServantSessionsService,
  type ServantOnlineHistoryResponse,
} from "@/backend/transport";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  mapOnlineFilterDataDtoToOnlineFilterData,
  type OnlineHistoryFilterDataDto,
} from "./mapper";
import SearchServantsComponent from "@/components/searchServantDropdown.vue";

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();
const showTaskDurationOptions = [true, false];
const onlineHistory = ref<ServantOnlineHistoryResponse[]>([]);

const tableInformation = ref({
  hideAddDialog: true,
  headers: [
    {
      field: "id",
      header: "transportation.onlineHistory.fields.servantId",
      clickable: true,
    },
    {
      field: "fullName",
      header: "transportation.common.name",
    },
    {
      field: "onlineDurationInHours",
      header: "transportation.onlineHistory.fields.onlineHours",
    },
    {
      field: "totalDurationInHours",
      header: "transportation.onlineHistory.fields.totalDurationInHours",
    },
  ],
  actions: { info: true },
});

const filterData = ref<OnlineHistoryFilterDataDto>({
  startDate: new Date(startOfToday),
  endDate: new Date(endOfToday),
  servants: undefined,
  includeStartHour: "",
  includeEndHour: "",
  minHours: undefined,
  region: undefined,
  page: 0,
  calculateInTaskDuration: undefined,
  paginated: true,
});

const router = useRouter();
function detail(data) {
  router.push({
    name: "detailServant",
    params: {
      id: data?.id,
    },
  });
}
getOnlineHistory();
function getOnlineHistory() {
  const index = tableInformation.value.headers.findIndex(
    (item) => item.field === "inTaskDurationInHours"
  );
  if (index >= 0) {
    tableInformation.value.headers.splice(
      tableInformation.value.headers.findIndex(
        (item) => item.field === "inTaskDurationInHours"
      ),
      1
    );
  }
  if (filterData.value.calculateInTaskDuration) {
    tableInformation.value.headers.splice(3, 0, {
      field: "inTaskDurationInHours",
      header: "transportation.onlineHistory.fields.inTaskDurationInHours",
    });
  }

  ServantSessionsService.getServantSessionSummary(
    mapOnlineFilterDataDtoToOnlineFilterData(filterData.value)
  )
    .then((Response) => {
      onlineHistory.value = Response;
    })
    .catch(() => {
      onlineHistory.value = [];
    });
}

const clearSelectedUsersTrigger = ref(false);

function clearData() {
  filterData.value = {
    startDate: new Date(startOfToday),
    endDate: new Date(endOfToday),
    servants: undefined,
    includeStartHour: undefined,
    includeEndHour: undefined,
    minHours: undefined,
    region: undefined,
    page: 0,
    calculateInTaskDuration: undefined,
  };
  clearSelectedUsersTrigger.value = !clearSelectedUsersTrigger.value;
  getOnlineHistory();
}
function paginate(event) {
  filterData.value.page = event.page;
  getOnlineHistory();
}
async function exportAsExcel() {
  const paginateFilterData = Object.assign({}, filterData.value);
  paginateFilterData.paginated = false;
  await ServantService.listServantsOnlineHistory(
    mapOnlineFilterDataDtoToOnlineFilterData(paginateFilterData)
  ).then((res) => {
    exportAsXlsx(res, "servantOnlineHistory.xlsx", "servantOnlineHistory.xlsx");
  });
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
  &.Online {
    background-color: #1cbfad;
    color: white;
  }
}
</style>
