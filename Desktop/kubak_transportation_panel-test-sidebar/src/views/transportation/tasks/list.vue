<template>
  <div class="page-style" @keyup.enter="search">
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
                      v-model="filterData.startAt"
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
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="taskStatuses"
                    display="chip"
                    :placeholder="$t('dropdowns.tasks.taskStatus.placeholder')"
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
                        {{
                          $t(`dropdowns.tasks.taskStatus.${slotProps.option}`)
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.randomId"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.tasks.fields.randomId")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.id"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.tasks.fields.id")
                    }}</label>
                  </span>
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
                      name="location-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="destinationtypeOptions"
                    display="chip"
                    :placeholder="
                      $t('transportation.requests.destinationTypeTitle')
                    "
                    v-model="filterData.destinationType"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(`transportation.requests.${valueProp.value}`)
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ $t(`transportation.requests.${slotProps.option}`) }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="exportAsXlsx(tasks.items, 'tasks.xlsx', 'tasks')"
                class="mr-2"
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
      <div>
        <div class="w-full flex justify-content-end"></div>

        <TableComponent
          :tableInformation="tableInformation"
          :response="tasks"
          @page="paginate"
          @clickedFirstCell="detail"
          @middleClickedFirstCell="openNewTab"
        >
          <template #customColumn="slotProp">
            <div>
              {{ moment(slotProp.data.createdAt).format("DD/MM/YYYY") }}
              <div class="mt-1 mx-2">
                {{ toLocalTimeFormat(slotProp.data.createdAt) }}
              </div>
            </div>
          </template>

          <template #customColumnHeader>
            {{ $t("transportation.tasks.fields.startDate") }}
          </template>
          <template #footer>
            <div class="w-full flex justify-content-end px-8">
              {{ $t("transportation.tasks.totalRawPrice") }}:
              {{ tasks?.metadata?.totalTasksRawPrice }}
            </div>
          </template>
        </TableComponent>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import { RegionStore } from "@/stores/common/region";
import Calendar from "primevue/calendar";
import {
  toLocalTimeFormat,
  startOfToday,
  endOfToday,
} from "@/composables/customRequest";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { TaskService } from "@/backend/transport/services/TaskService";
import { TaskStatusEnum } from "@/backend/transport/models/TaskStatusEnum";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import moment from "moment";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  TaskFilterDataDto,
  createMapTaskFilterDtoToTaskFilter,
} from "./mapper";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import SearchServantsComponent from "@/components/searchServantDropdown.vue";
import { DestinationType } from "@/backend/transport";

const taskStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);
const destinationtypeOptions = Object.keys(DestinationType).map(
  (key) => DestinationType[key]
);
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();

const tasks = ref();

const selectedRegion = ref();

const tableInformation = {
  clickFirstCell: true,
  middleClickedFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "id",
      header: "transportation.tasks.fields.id",
      clickable: true,
    },
    {
      field: "randomId",
      header: "transportation.tasks.fields.randomId",
    },
    {
      field: "servant.fullName",
      header: "transportation.servant.fullName",
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
      header: "transportation.passenger.mobile",
    },
    {
      field: "userPaidPrice",
      header: "transportation.requests.userPrice",
    },

    {
      field: "status",
      header: "transportation.tasks.fields.status",
      status: "taskStatus",
      value: "transportation.tasks.statuses",
    },
  ],
  actions: { info: true },
  policies: {
    infoPolicy: "ReadTask",
  },
};
const filterData = ref<TaskFilterDataDto>({
  startAt: new Date(startOfToday), // Convert moment object to native Date object
  endAt: new Date(endOfToday),
  region: undefined,
  status: undefined,
  randomId: undefined,
  id: undefined,
  user: undefined,
});
const router = useRouter();
const route = useRoute();

onMounted(() => {
  filterData.value = Object.assign(filterData.value, route.query);
  filterData.value.startAt = new Date(filterData.value.startAt);
  filterData.value.endAt = new Date(filterData.value.endAt);
  getAllTasks();
});

async function getAllTasks() {
  await TaskService.listTasks(
    createMapTaskFilterDtoToTaskFilter(filterData.value)
  )
    .then((Response) => {
      tasks.value = Response;
    })
    .catch(() => {
      tasks.value = [];
    });
}

// open it on the same tab
function detail(data, event) {
  if (event.button === 0) {
    router.push({
      name: "detailTask",
      params: {
        id: data.id,
      },
    });
  }
}

// open it on a new tab
function openNewTab(data, event) {
  if (event.button === 1) {
    const routeData = router.resolve({
      name: "detailTask",
      params: { id: data.id },
    });
    window.open(routeData.href, "_blank");
  }
}

function search() {
  router.push({
    query: filterData.value as unknown as Record<string, string>,
  });
  getAllTasks();
}

function clearData() {
  filterData.value = {
    startAt: new Date(startOfToday), // Convert moment object to native Date object
    endAt: new Date(endOfToday),
    region: undefined,
    status: undefined,
    randomId: undefined,
    id: undefined,
  };
  selectedRegion.value = undefined;
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllTasks();
}
</script>
<style lang="scss"></style>
