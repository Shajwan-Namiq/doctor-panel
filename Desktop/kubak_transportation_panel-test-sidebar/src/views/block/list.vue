<template>
  <div class="page-style">
    <div class="page-container">
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

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 mt-2">
                <SearchUserComponent
                  @selectedUsers="
                    (selectedUsers) => {
                      filterData.users = selectedUsers;
                    }
                  "
                  :placeholder="$t('transportation.common.listOfBlockUsers')"
                />
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 mt-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="layers-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="includeInactiveBlocksOptions"
                    display="chip"
                    :placeholder="$t('transportation.common.activeBlocks')"
                    v-model="filterData.type"
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
                severity="danger"
                :label="$t('buttons.block')"
                @click="openModalToBlockedUser"
                :loading="requestStatusStore.loading"
                icon="pi pi-times"
                class="mx-2"
                v-can="[PolicyType.WRITE_USER]"
              />
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

        <Column
          filterField="representative"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '20rem' }"
        >
          <template #body="{ data }">
            <div class="flex align-items-center gap-2">
              <Button
                icon="pi pi-info"
                class="p-button-success"
                @click="detailPage(data.user.uid)"
              />
            </div>
          </template>
        </Column>

        <Column
          filterField="representative"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '30rem' }"
        >
          <template #body="slotProps">
            <Button
              @click="unblock(slotProps.data)"
              style="width: auto !important"
              severity="success"
              v-can="[PolicyType.WRITE_USER]"
            >
              {{ $t("buttons.unblock") }}
            </Button>
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
import { useRouter } from "vue-router";
import {
  CreateMapToUsersBlockListDto,
  FilterToBlockUsersListDto,
} from "./mapper";
import {
  GetAllUserBlockHistoryType,
  UserBlockService,
  type ServiceDto,
  type UserBlockDtoPagination,
} from "@/backend/transport";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import Calendar from "primevue/calendar";
import { getAllServices } from "../transportation/services/getAllService";
import { getAllRegions } from "../auth/regions/regions";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { useDialog } from "primevue/usedialog";
import blockUserModal from "./blockUserModal.vue";
import { useI18n } from "vue-i18n";
import { toastStore } from "@/stores/common/toastStore";
import { createMapBlockServantListResponseToBlockServantRequest } from "./mapperToBlockedUser/mapper";
import { PolicyType } from "@/backend/transport";

const router = useRouter();

const regions = ref<RegionDto[]>();
const services = ref<ServiceDto[] | undefined>();

// return inActive block list

const includeInactiveBlocksOptions = Object.keys(
  GetAllUserBlockHistoryType
).map((key) => GetAllUserBlockHistoryType[key]);

onMounted(async () => {
  services.value = await getAllServices();
  regions.value = await getAllRegions();

  getBlockList();
});

const filterData = ref<FilterToBlockUsersListDto>({
  users: undefined,
  blockedFromDate: undefined,
  blockedToDate: undefined,
  unblockedAtFromDate: undefined,
  unblockedAtToDate: undefined,
  type: GetAllUserBlockHistoryType.ALL,
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

function detailPage(uid: string) {
  router.push({
    name: "userDetail",
    params: { id: uid },
  });
}

function search() {
  getBlockList();
}

// clear filter data
function clearData() {
  filterData.value = {
    users: undefined,
    blockedFromDate: undefined,
    blockedToDate: undefined,
    unblockedAtFromDate: undefined,
    unblockedAtToDate: undefined,
    type: undefined,
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

const { t } = useI18n();
const dialog = useDialog();
// show modal  to block user
function openModalToBlockedUser() {
  dialog.open(blockUserModal, {
    emits: {
      updated: () => {
        getBlockList();
      },
    },
    data: blockedUsers.value,
    onClose: () => {
      getBlockList();
    },
    props: {
      header: t("auth.user.blockUser"),
      breakpoints: {
        "2000px": "50vw",
        "1500px": "65vw",
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

// unblock user
const toast = toastStore();
async function unblock(block) {
  block.unblockedAt = moment().subtract(1, "minutes");
  UserBlockService.updateUserBlockFromService({
    requestBody: createMapBlockServantListResponseToBlockServantRequest(block),
  }).then(async () => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.block"),
      }),
      type: "success",
    });
    getBlockList();
  });
}
</script>
