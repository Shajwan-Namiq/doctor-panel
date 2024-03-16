<template>
  <div class="page-style">
    <div class="page-container">
      <Transition name="slide-down">
        <div>
          <div class="grid">
            <div class="col-12 lg:col-6 xl:col-3">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  display="chip"
                  :placeholder="$t('dropdowns.searchField.placeholder')"
                  :options="searchField"
                  v-model="filterData.searchField"
                >
                  <template #value="valueProp">
                    {{
                      valueProp.value
                        ? $t(`dropdowns.searchField.${valueProp.value}`)
                        : valueProp.placeholder
                    }}
                  </template>
                  <template #option="slotProps">
                    <p>
                      {{ $t(`dropdowns.searchField.${slotProps.option}`) }}
                    </p>
                  </template>
                </Dropdown>
              </div>
            </div>
            <div class="col-12 lg:col-6 xl:col-3">
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
          </div>
          <div class="mt-3 mb-3 flex justify-content-end">
            <Button
              :label="$t('buttons.export')"
              icon="pi pi-upload"
              severity="help"
              @click="exportAsXlsx(vehicles.items, 'vehicle.xlsx', 'vehicle')"
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
              @click="getAllVehicle"
            />
          </div>
        </div>
      </Transition>

      <TableComponent
        :tableInformation="tableInformation"
        :response="vehicles"
        @clickedFirstCell="detail"
        @sort="sort"
        @page="paginate"
      >
        <template #customColumn="slotProp">
          <div class="flex">
            <Button icon="pi pi-car" @click="detail(slotProp.data)" />
            <Button
              icon="pi pi-user"
              class="p-button-success"
              @click="servantDetail(slotProp.data)"
            />
          </div>
        </template>
      </TableComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import { requestStatus } from "@/stores/common/requestStatus";
import Button from "primevue/button";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ListVehicleRequestFilterField,
  VehicleService,
} from "@/backend/transport";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { exportAsXlsx } from "@/composables/exportAdXlsx";

const searchField = Object.keys(ListVehicleRequestFilterField).map(
  (key) => ListVehicleRequestFilterField[key]
);

const requestStatusStore = requestStatus();

const vehicles = ref();
const tableInformation = {
  hideAddDialog: true,
  clickFirstCell: true,
  headers: [
    {
      field: "title",
      header: "transportation.vehicle.title",
      clickable: true,
      sortable: true,
    },
    {
      field: "vehicleDetail.color",
      header: "transportation.vehicle.color",
      sortable: true,
    },
    {
      field: "plaqueDetail.code",
      header: "transportation.vehicle.code",
      sortable: true,
      class: "plaque",
    },
    {
      field: "servant.firstName",
      header: "transportation.servant.firstName",
      sortable: true,
    },
    {
      field: "servant.lastName",
      header: "transportation.servant.lastName",
      sortable: true,
    },
  ],
};
const filterData = ref({
  searchField: undefined,
  searchValue: "",
  page: 0,
  sortField: "",
  sortDescending: false,
});

getAllVehicle();
function getAllVehicle() {
  if (!filterData.value.searchValue) {
    delete filterData.value.searchField;
  }
  VehicleService.listVehicles(filterData.value).then((Response) => {
    vehicles.value = Response;
  });
}
const router = useRouter();
function detail(data) {
  router.push({
    name: "vehicleDetail",
    params: { id: data.id },
  });
}
function servantDetail(data) {
  router.push({
    name: "detailServant",
    params: { id: data.servant.id },
  });
}
function clearData() {
  filterData.value = {
    searchField: undefined,
    searchValue: "",
    page: 0,
    sortField: "",
    sortDescending: false,
  };
}
function sort(event) {
  filterData.value.sortField = event.sortField;
  filterData.value.sortDescending = event.sortOrder == 1 ? true : false;
  getAllVehicle();
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllVehicle();
}
</script>
<style lang="scss">
.plaque {
  background-color: rgb(10, 10, 10);
  text-align: center;
  padding: 6px;
  width: 100px;
  color: white;
  border-radius: 5px;
}
</style>
