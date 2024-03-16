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
                      v-model="filterData.startAt"
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
                      v-model="filterData.endAt"
                      :class="{
                        'p-invalid': filterData.startAt > filterData.endAt,
                      }"
                      hourFormat="24"
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
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      filterData.user = selectedUser;
                    }
                  "
                  :singleUser="true"
                />
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchServantsComponent
                  @selectedServant="
                    (selectedServant) => {
                      filterData.servant = selectedServant;
                    }
                  "
                  :singleUser="true"
                />
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="document-lock-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="roles"
                    display="chip"
                    :placeholder="$t('roles.role')"
                    v-model="filterData.cancellerRole"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option }}</p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                class="mr-2 p-button-secondary"
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="
                  exportAsXlsx(
                    tasks.items,
                    'canceledTasks.xlsx',
                    'canceled tasks'
                  )
                "
              />
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mr-2 p-button-secondary"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="search"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startAt > filterData.endAt"
              />
            </div>
          </div>
        </Transition>
      </div>

      <TableComponent
        :tableInformation="tableInformation"
        :response="tasks"
        @clickedFirstCell="detail"
        @page="paginate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import { RegionStore } from "@/stores/common/region";
import { TaskService } from "@/backend/transport/services/TaskService";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import {
  createMapTaskFilterDtoToTaskFilter,
  type TaskFilterDataDto,
} from "./mapper";
import SearchServantsComponent from "@/components/searchServantDropdown.vue";
import moment from "moment";
import { RoleType } from "@/backend/transport";

const roles = ref(Object.keys(RoleType).map((key) => RoleType[key]));

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();

const tableInformation = {
  clickFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "id",
      header: "transportation.tasks.fields.id",
      clickable: true,
    },
    {
      field: "servant.id",
      header: "transportation.servant.id",
      clickable: true,
    },
    {
      field: "servant.firstName",
      header: "transportation.servant.firstName",
    },
    {
      field: "servant.lastName",
      header: "transportation.servant.lastName",
    },
    {
      field: "servant.mobile",
      header: "transportation.servant.mobile",
    },
    {
      field: "member.name",
      header: "transportation.passenger.passengerName",
    },
    {
      field: "member.mobile",
      header: "transportation.passenger.passengerMobile",
    },
    {
      field: "canceledBy",
      header: "transportation.tasks.fields.canceledBy",
    },
    {
      field: "price",
      header: "transportation.tasks.fields.price",
    },
    {
      field: "cancelReason",
      header: "transportation.tasks.fields.cancelReason",
    },
  ],
  actions: { info: true },
};

const tasks = ref();
const filterData = ref<TaskFilterDataDto>({
  startAt: new Date(startOfToday),
  endAt: new Date(endOfToday),
  region: undefined,
  user: undefined,
  servant: undefined,
  cancellerRole: undefined,
});

const route = useRoute();
onMounted(() => {
  filterData.value = Object.assign(filterData.value, route.query);
  filterData.value.startAt = moment(filterData.value.startAt).toDate();
  filterData.value.endAt = moment(filterData.value.endAt).toDate();
  getAllTasks();
});

const router = useRouter();
function detail(data) {
  router.push({
    name: "detailTask",
    params: {
      id: data.id,
    },
  });
}
function getAllTasks() {
  TaskService.getCanceledTasks(
    createMapTaskFilterDtoToTaskFilter(filterData.value)
  )
    .then((Response) => {
      tasks.value = Response;
    })
    .catch(() => {
      tasks.value = [];
    });
}

function clearData() {
  filterData.value = {
    startAt: new Date(startOfToday),
    endAt: new Date(endOfToday),
    region: undefined,
    user: undefined,
    page: 0,
    servant: undefined,
    cancellerRole: undefined,
  };
}
function search() {
  filterData.value.startAt = new Date(filterData.value.startAt);
  filterData.value.endAt = new Date(filterData.value.endAt);

  const queryData: any = {
    ...filterData.value,
    cancellerrole: filterData.value.cancellerRole
      ? filterData?.value?.cancellerRole
      : undefined,
  };

  router.push({
    query: queryData,
  });
  getAllTasks();
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllTasks();
}
</script>
<style lang="scss"></style>
