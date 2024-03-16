<template>
  <div class="py-4 slide-fade-down w-full flex justify-content-center">
    <div class="w-full">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
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
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="belowStatuses"
                    display="chip"
                    :placeholder="$t('dropdowns.tasks.belowStatus.placeholder')"
                    v-model="filterData.belowStatus"
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
                      showTime
                      showSeconds
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
                      class="text-xl"
                      name="phone-portrait-outline"
                    ></ion-icon>
                  </span>
                  <div class="p-inputgroup">
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="filterData.randomId"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.common.randomId")
                      }}</label>
                    </span>
                  </div>
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
                    <ion-icon name="car-outline" class="text-xl"></ion-icon>
                  </span>

                  <Dropdown
                    :options="services"
                    optionLabel="Typ"
                    :placeholder="$t('transportation.serviceType.name')"
                    class="w-15rem"
                    v-model="filterData.service"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.title ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <div class="w-full flex align-items-center">
                        <img
                          :src="getImage(slotProps.option)"
                          class="h-2rem w-2rem mx-2"
                        />
                        <p>{{ slotProps.option?.title }}</p>
                      </div>
                    </template>
                  </Dropdown>
                </div>
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
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="exportAsXlsx(tasks?.items, 'tasks.xlsx', 'tasks')"
              />
              <Button
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearData"
                icon="pi pi-times"
              />
              <Button
                :label="$t('buttons.filter')"
                @click="search"
                :loading="requestStatusStore.loading"
                icon="pi pi-filter"
              />
            </div>
          </div>
        </Transition>
      </div>

      <div>
        <TableComponent
          :tableInformation="tableInformation"
          :response="tasks"
          @clickedFirstCell="detail"
          @page="paginate"
        >
          <template #customColumn="slotProp">
            {{ moment(slotProp.data.createdAt).format("DD/MM/YYYY") }}
            <div class="mt-1 mx-2">
              {{ toLocalTimeFormat(slotProp.data.createdAt) }}
            </div>
          </template>
          <template #customColumnHeader>
            {{ $t("transportation.tasks.fields.startDate") }}</template
          >
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
import Calendar from "primevue/calendar";
import { toLocalTimeFormat } from "@/composables/customRequest";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { TaskService } from "@/backend/transport/services/TaskService";
import { TaskStatusEnum } from "@/backend/transport/models/TaskStatusEnum";
import moment from "moment";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  CreateMapUserToUserListTaskListDto,
  GetUserListTaskDto,
  UserListFilterTaskDto,
} from "./mapperToTask/mapper";
import { DestinationType, type ServiceDto } from "@/backend/transport";
import SearchServantsComponent from "@/components/searchServantDropdown.vue";
import type { RegionDto } from "@/backend/auth";
import { getImage } from "@/composables/getImage";
import { getAllServices } from "@/views/transportation/services/getAllService";
import { getAllRegions } from "../../regions/regions";

const taskStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);

const belowStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);

const requestStatusStore = requestStatus();

const tasks = ref<GetUserListTaskDto>();

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
const router = useRouter();
const route = useRoute();

const regions = ref<RegionDto[]>();

const services = ref<ServiceDto[] | undefined>();

const destinationtypeOptions = Object.keys(DestinationType).map(
  (key) => DestinationType[key]
);

const id = route.params.id as string;

const filterData = ref<UserListFilterTaskDto>({
  region: undefined,
  service: undefined,
  servant: undefined,
  clientUserId: id,
  startAt: undefined,
  endAt: undefined,
  status: undefined,
  destinationType: undefined,
  page: undefined,
  limit: undefined,
  randomId: undefined,
  belowStatus: undefined,
});

onMounted(async () => {
  services.value = await getAllServices();
  regions.value = await getAllRegions();
  getAllTasks();
});

async function getAllTasks() {
  await TaskService.listTasks(
    CreateMapUserToUserListTaskListDto(filterData.value)
  )
    .then((Response) => {
      tasks.value = Response;
    })
    .catch(() => {
      clearData();
    });
}

function search() {
  getAllTasks();
}

function detail(data) {
  router.push({
    name: "detailTask",
    params: {
      id: data.id,
    },
  });
}

function clearData() {
  filterData.value = {
    region: undefined,
    service: undefined,
    servant: undefined,
    clientUserId: id,
    startAt: undefined,
    endAt: undefined,
    status: undefined,
    destinationType: undefined,
    page: undefined,
    limit: undefined,
    randomId: undefined,
    belowStatus: undefined,
  };
  getAllTasks();
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllTasks();
}
</script>
