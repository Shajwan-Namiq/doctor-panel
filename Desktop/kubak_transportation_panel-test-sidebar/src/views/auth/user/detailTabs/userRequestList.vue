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
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="requestsStatuses"
                    display="chip"
                    :placeholder="$t('dropdowns.tasks.taskStatus.placeholder')"
                    v-model="filterData.status"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? `${valueProp.value}`
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      {{ slotProps.option }}
                      <!-- <p>
                        {{
                          $t(`dropdowns.tasks.taskStatus.${slotProps.option}`)
                        }}
                      </p> -->
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

      <DataTable
        @page="onPage($event)"
        :totalRecords="tasks?.count"
        lazy
        :value="tasks?.items ?? []"
        paginator
        :rows="10"
        :loading="requestStatusStore.loading"
      >
        <Column
          field="sourceLocationName"
          :header="$t('auth.user.sourceLocationName')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.sourceLocationName }} </i>
          </template>
        </Column>

        <Column field="rawPrice" :header="$t('auth.user.rawPrice')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data.rawPrice }} </i>
          </template>
        </Column>

        <Column field="userPrice" :header="$t('auth.user.userPrice')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data.userPrice }} </i>
          </template>
        </Column>

        <Column
          field="statusEnum"
          :header="$t('auth.user.statusEnum')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.statusEnum }} </i>
          </template>
        </Column>

        <Column field="type" :header="$t('auth.user.type')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data.type }} </i>
          </template>
        </Column>

        <Column field="createdAt" :header="$t('auth.user.createdAt')" :key="1">
          <template #body="slotProps">
            <i
              >{{ moment(slotProps.data.createdAt).utc().format("YYYY-MM-DD") }}
            </i>
          </template>
        </Column>

        <Column :key="1">
          <template #body="tasks">
            <div
              v-if="
                ![
                  RequestStatusEnum.REQUEST_CANCELED,
                  RequestStatusEnum.TIMEOUT,
                  RequestStatusEnum.WAITING,
                ].includes(tasks.data.statusEnum)
              "
              class="px-8 flex"
            >
              <Button
                icon="pi pi-info"
                class="p-button-success"
                @click="detail(tasks.data)"
              />
            </div>
          </template>
        </Column>

        <template #footer>
          {{
            $t(`table.tableFooter`, {
              total: tasks?.items ? tasks?.items.length : 0,
              field: $t("auth.user.requestsListUser"),
            })
          }}
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  DestinationType,
  RequestService,
  RequestStatusEnum,
  TaskService,
  type ListRequestResultPagination,
  type ServiceDto,
} from "@/backend/transport";
import type { RegionDto } from "@/backend/auth";
import { getImage } from "@/composables/getImage";
import { getAllServices } from "@/views/transportation/services/getAllService";
import { getAllRegions } from "../../regions/regions";
import {
  CreateMapUserToUserRequestListTaskListDto,
  UserListFilterRequestTaskDto,
} from "./mapperToRequestList/mapper";
import moment from "moment";

const requestsStatuses = Object.keys(RequestStatusEnum).map(
  (key) => RequestStatusEnum[key]
);

const requestStatusStore = requestStatus();

const tasks = ref<ListRequestResultPagination>();
const regions = ref<RegionDto[]>();
const services = ref<ServiceDto[] | undefined>();

// return destination type
const destinationtypeOptions = Object.keys(DestinationType).map(
  (key) => DestinationType[key]
);

// get user id
const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

// filter data
const filterData = ref<UserListFilterRequestTaskDto>({
  userIds: [id],
  region: undefined,
  service: undefined,
  startAt: undefined,
  endAt: undefined,
  status: undefined,
  destinationType: undefined,
  page: undefined,
  limit: undefined,
});

onMounted(async () => {
  services.value = await getAllServices();
  regions.value = await getAllRegions();
  getAllTasks();
});

// return all data based on filtering if exist
async function getAllTasks() {
  await RequestService.getRequests(
    CreateMapUserToUserRequestListTaskListDto(filterData.value)
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

// clear filter data
function clearData() {
  filterData.value = {
    userIds: [id],
    region: undefined,
    service: undefined,
    startAt: undefined,
    endAt: undefined,
    status: undefined,
    destinationType: undefined,
    page: undefined,
    limit: undefined,
  };
  getAllTasks();
}

const onPage = (event) => {
  filterData.value = {
    page: event.page,
  };
  getAllTasks();
};

// redirect to task detail
// note , we don't have task id so should be send request to another route to get task id without this status
// RequestCanceled
// Timeout
// Waiting
async function detail(data) {
  await TaskService.getTaskDetailByRequestId({ requestId: data.id })
    .then((Response) => {
      router.push({
        name: "detailRequestTask",
        params: {
          id: Response.id,
        },
      });
    })
    .catch(() => {
      //
    });
}
</script>
