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
                      v-model="filterData.createdFrom"
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
                      v-model="filterData.createdTo"
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
                    <ion-icon name="cog-outline" class="text-xl"></ion-icon>
                  </span>
                  <div class="p-inputgroup">
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="filterData.appVersionFrom"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.common.appVersionFrom")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="cog-outline" class="text-xl"></ion-icon>
                  </span>
                  <div class="p-inputgroup">
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="filterData.appVersionTo"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.common.appVersionTo")
                      }}</label>
                    </span>
                  </div>
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
                        v-model="filterData.deviceName"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.common.deviceName")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="layers-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="platformOptions"
                    display="chip"
                    :placeholder="$t('transportation.common.platform')"
                    v-model="filterData.platform"
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
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="exportAsXlsx(devices?.items, 'devices.xlsx', 'devices')"
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

      <!-- show data on table  -->
      <DataTable
        responsiveLayout="scroll"
        @page="onPage($event)"
        :totalRecords="devices?.count"
        lazy
        :value="devices?.items ?? []"
        paginator
        :rows="10"
        :loading="requestStatusStore.loading"
        @sort="sortData"
      >
        <Column
          sortable
          sortField="deviceName"
          field="deviceName"
          :header="$t('transportation.services.setting.deviceName')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.deviceName }} </i>
          </template>
        </Column>

        <Column
          sortable
          sortField="platform"
          field="platform"
          :header="$t('transportation.services.setting.platform')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.platform }} </i>
          </template>
        </Column>

        <Column
          sortable
          sortField="appVersion"
          field="appVersion"
          :header="$t('transportation.services.setting.appVersion')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.appVersion }} </i>
          </template>
        </Column>

        <Column
          sortable
          sortField="createdAt"
          field="createdAt"
          :header="$t('transportation.services.setting.createdAt')"
          :key="1"
        >
          <template #body="slotProps">
            <i
              >{{ moment(slotProps.data.createdAt).utc().format("YYYY-MM-DD") }}
            </i>
          </template>
        </Column>

        <template #footer>
          {{
            $t(`table.tableFooter`, {
              total: devices?.items ? devices?.items.length : 0,
              field: $t("transportation.services.setting.listOfDevices"),
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
import { requestStatus } from "@/stores/common/requestStatus";
import Calendar from "primevue/calendar";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  CreateMapToListOfDevicesDto,
  FilterListOfDevicesDto,
} from "./mapperToUserDevice/mapper";
import moment from "moment";
import {
  Platform,
  UserDevicesService,
  type UserDeviceDtoPagination,
} from "@/backend/city";
import { useRoute } from "vue-router";

const requestStatusStore = requestStatus();

const devices = ref<UserDeviceDtoPagination>();

const platformOptions = ref(Object.keys(Platform).map((key) => Platform[key]));

const route = useRoute();
const id = route.params.id as string;
// filter data
const filterData = ref<FilterListOfDevicesDto>({
  appVersionFrom: undefined,
  appVersionTo: undefined,
  userIds: [id],
  deviceName: undefined,
  platform: undefined,
  createdFrom: undefined,
  createdTo: undefined,
  page: undefined,
  limit: undefined,
  sortField: undefined,
  sortDescending: true,
});

onMounted(async () => {
  getAllDevices();
});

// return all data based on filtering if exist
async function getAllDevices() {
  await UserDevicesService.getUserDevices(
    CreateMapToListOfDevicesDto(filterData.value)
  )
    .then((Response) => {
      devices.value = Response;
    })
    .catch(() => {
      clearData();
    });
}

function search() {
  getAllDevices();
}

// clear filter data
function clearData() {
  filterData.value = {
    appVersionFrom: undefined,
    appVersionTo: undefined,
    userIds: [id],
    deviceName: undefined,
    platform: undefined,
    createdFrom: undefined,
    createdTo: undefined,
    page: undefined,
    limit: undefined,
    sortField: undefined,
    sortDescending: true,
  };
  getAllDevices();
}

const onPage = (event) => {
  filterData.value = {
    page: event.page,
  };
  getAllDevices();
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
  getAllDevices();
}
</script>
