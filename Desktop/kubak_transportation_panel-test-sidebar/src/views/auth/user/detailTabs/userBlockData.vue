<template>
  <div class="py-4 slide-fade-down w-full flex justify-content-center">
    <div class="w-full">
      <div class="toggleFilterAnimation">
        <!-- ///////// filter data ////////// -->
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
                      v-model="filterData.blockedFromDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.blockedFromDate")
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
                      v-model="filterData.blockedToDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.blockedToDate")
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
                      v-model="filterData.unblockedAtFromDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.unblockedAtFromDate")
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
                      v-model="filterData.unblockedAtToDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.unblockedAtToDate")
                    }}</label>
                  </span>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 mt-2">
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

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 mt-2">
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
                        <p>{{ slotProps.option?.title }}</p>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 mt-2">
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      filterData.blockedByUser = selectedUser;
                    }
                  "
                  :singleUser="true"
                  :placeholder="$t('transportation.common.blockedBy')"
                />
              </div>
            </div>

            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="
                  exportAsXlsx(
                    blockedUsers?.items,
                    'blockedUsers.xlsx',
                    'blockedUsers'
                  )
                "
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
        responsiveLayout="scroll"
        @page="onPage($event)"
        :totalRecords="blockedUsers?.count"
        lazy
        :value="blockedUsers?.items ?? []"
        paginator
        :rows="10"
        :loading="requestStatusStore.loading"
        @sort="sortData"
      >
        <Column
          sortable
          sortField="user.displayName"
          field="user"
          :header="$t('transportation.common.blockedUsers')"
          :key="1"
        >
          <template #body="slotProps">
            <div>{{ slotProps.data.user.displayName }}</div>
            <i>{{ slotProps.data.user.phoneNumber }} </i>
          </template>
        </Column>
        <Column
          sortable
          sortField="blockedByUser.displayName"
          field="blockedByUser"
          :header="$t('transportation.common.blockedByUser')"
          :key="1"
        >
          <template #body="slotProps">
            <div>{{ slotProps.data.blockedByUser.displayName }}</div>
            <i>{{ slotProps.data.blockedByUser.phoneNumber }} </i>
          </template>
        </Column>
        <Column
          sortable
          sortField="blockedAt"
          field="blockedAt"
          :header="$t('transportation.common.blockedAt')"
          :key="1"
        >
          <template #body="slotProps">
            <i
              >{{ moment(slotProps.data.blockedAt).utc().format("YYYY-MM-DD") }}
            </i>
          </template>
        </Column>
        <Column
          sortable
          sortField="unblockedAt"
          field="unblockedAt"
          :header="$t('transportation.common.unblockedAt')"
          :key="1"
        >
          <template #body="slotProps">
            <i
              >{{
                moment(slotProps.data.unblockedAt).utc().format("YYYY-MM-DD")
              }}
            </i>
          </template>
        </Column>

        <template #footer>
          {{
            $t(`table.tableFooter`, {
              total: blockedUsers?.items ? blockedUsers?.items.length : 0,
              field: $t("transportation.services.setting.listOfDevices"),
            })
          }}
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { requestStatus } from "@/stores/common/requestStatus";
import moment from "moment";
import type { RegionDto } from "@/backend/city/models/RegionDto";
import { useRoute } from "vue-router";
import {
  CreateMapToUsersBlockListDto,
  FilterToBlockUsersListDto,
} from "./mapperToBlockList/mapper";
import {
  UserBlockService,
  type ServiceDto,
  type UserBlockDtoPagination,
} from "@/backend/transport";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import Calendar from "primevue/calendar";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { getAllServices } from "@/views/transportation/services/getAllService";
import { getAllRegions } from "../../regions/regions";

const regions = ref<RegionDto[]>();
const services = ref<ServiceDto[] | undefined>();

onMounted(async () => {
  services.value = await getAllServices();
  regions.value = await getAllRegions();
  getBlockList();
});

const route = useRoute();
const id = route.params.id as string;

const filterData = ref<FilterToBlockUsersListDto>({
  userIds: [id],
  blockedFromDate: undefined,
  blockedToDate: undefined,
  unblockedAtFromDate: undefined,
  unblockedAtToDate: undefined,
  includeInactiveBlocks: undefined,
  service: undefined,
  region: undefined,
  blockedByUser: undefined,
  page: 0,
  limit: undefined,
  sortField: undefined,
  sortDescending: undefined,
});

const blockedUsers = ref<UserBlockDtoPagination>();

const requestStatusStore = requestStatus();

onMounted(() => {
  getBlockList();
});

async function getBlockList() {
  UserBlockService.getAllUserBlocks(
    CreateMapToUsersBlockListDto(filterData.value)
  ).then((res: any) => {
    blockedUsers.value = res;
  });
}

function search() {
  getBlockList();
}

// clear filter data
function clearData() {
  filterData.value = {
    userIds: [id],
    blockedFromDate: undefined,
    blockedToDate: undefined,
    unblockedAtFromDate: undefined,
    unblockedAtToDate: undefined,
    includeInactiveBlocks: undefined,
    service: undefined,
    region: undefined,
    blockedByUser: undefined,
    page: 0,
    limit: undefined,
    sortField: undefined,
    sortDescending: undefined,
  };
  getBlockList();
}

const onPage = (event) => {
  filterData.value = {
    page: event.page,
  };
  getBlockList();
};

// Sort data by specific column
function sortData(event) {
  // Split  the sortField to get the nested property if it exists
  const field = event.sortField.includes(".")
    ? event.sortField.split(".")
    : [event.sortField];

  filterData.value.sortField =
    field.length > 1 ? `${field[0]}.${field[1]}` : field[0];

  filterData.value.sortDescending = event.sortOrder === 1;
  getBlockList();
}
</script>
