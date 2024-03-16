<template>
  <div class="page-min-style" @keyup.enter="filterUser">
    <div class="page-min-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div v-if="true">
            <div class="grid">
              <!-- Filter by start Date  -->
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
                      v-model="filterData.createdFrom"
                      showSeconds
                      showTime
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <!-- Filter by end Date  -->
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
                      v-model="filterData.createdTo"
                      showSeconds
                      showTime
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    v-model="filterData.searchField"
                    :options="userSearchFields"
                    display="chip"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(`fields.searchFields.${valueProp.value}`)
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ $t(`fields.searchFields.${slotProps.option}`) }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.searchValue"
                    />
                    <label for="inputgroup">{{ $t("fields.search") }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    v-model="filterData.region"
                    :options="regions"
                    display="chip"
                    :placeholder="$t('auth.area.region')"
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
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="document-lock-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    v-model="filterData.role"
                    :options="roles"
                    display="chip"
                    :placeholder="$t('roles.role')"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? valueProp.value.name
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option.name }}</p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="flex justify-content-end py-2 mb-3 mt-4">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="exportAsXlsx(response.items, 'user.xlsx', 'users')"
              />
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                @click="clearData"
                class="mx-1 p-button-secondary"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="filterUser"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </Transition>
      </div>

      <TableComponentVue
        :tableInformation="tableInformation"
        :response="response"
        @clickedFirstCell="detail"
        @page="paginate"
        @sort="sortData"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TableComponentVue from "@/common/interfaces/tableComponent.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { UserService } from "@/backend/wallet/services/UserService";
import { RoleStore } from "@/stores/common/role";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/wallet/models/RegionDto";
import { UserSearchFieldEnum } from "@/backend/wallet";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import Calendar from "primevue/calendar";
import {
  createMapForUserListFilterDto,
  type FilterFromUserListDto,
} from "./mapperToFilter/mapper";

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
const userSearchFields = Object.keys(UserSearchFieldEnum).map(
  (key) => UserSearchFieldEnum[key]
);

regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const roleStore = RoleStore();
const roles = ref();
roleStore.getAllRole().then((res) => {
  roles.value = res;
});

const response = ref();
const filterData = ref<FilterFromUserListDto>({
  region: undefined,
  role: undefined,
  page: 0,
  searchField: UserSearchFieldEnum.PHONE_NUMBER,
  searchValue: "",
  createdFrom: undefined,
  createdTo: undefined,
  sortField: undefined,
  sortDescending: true,
});

onMounted(async () => {
  await getUsersData();
});

async function getUsersData() {
  await UserService.getUsers(
    createMapForUserListFilterDto(filterData.value)
  ).then((res) => {
    response.value = res;
  });
}

const requestStatusStore = requestStatus();

const router = useRouter();
const tableInformation = {
  hideAddDialog: true,
  headers: [
    {
      field: "displayName",
      header: "transportation.users.name",
      sortable: true,
      clickable: true,
    },
    {
      field: "phoneNumber",
      header: "transportation.users.mobile",
      sortable: true,
    },
    { field: "email", header: "transportation.users.email", sortable: true },
  ],
  policies: { editPolicy: "ReadRole" },
  actions: { delete: false, info: true },
};
function detail(data) {
  router.push({
    name: "userDetail",
    params: { id: data.uid },
  });
}
function filterUser() {
  getUsersData();
}
async function clearData() {
  filterData.value = {
    region: undefined,
    role: undefined,
    page: 0,
    searchField: UserSearchFieldEnum.PHONE_NUMBER,
    searchValue: "",
    createdFrom: undefined,
    createdTo: undefined,
    sortField: undefined,
    sortDescending: true,
  };

  await getUsersData();
}
function paginate(event) {
  filterData.value.page = event.page;
  getUsersData();
}
// Sort data by specific column
function sortData(event) {
  // Split  the sortField to get the nested property if it exists
  const field = event.sortField.includes(".")
    ? event.sortField.split(".")
    : [event.sortField];

  filterData.value.sortField =
    field.length > 1 ? `${field[0]}.${field[1]}` : field[0];

  filterData.value.sortDescending = event.sortOrder === 1;
  getUsersData();
}
</script>
