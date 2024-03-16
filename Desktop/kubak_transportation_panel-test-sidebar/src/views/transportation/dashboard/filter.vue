<template>
  <div class="filter p-4" @keyup.enter="changeFilterData">
    <div
      class="grid py-4"
      style="border-bottom: 1px solid var(--border-color-kubak)"
    >
      <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="car-outline" class="text-xl"></ion-icon>
          </span>
          <span class="w-full">
            <Dropdown
              :options="services"
              optionLabel="Typ"
              :placeholder="$t('transportation.services.title')"
              class="w-full h-full"
              v-model="filterData.service"
              dateTime
              showSeconds
            >
              <template #value="valueProp">
                {{ valueProp.value?.title ?? valueProp.placeholder }}
              </template>
              <template #option="slotProps">
                <div class="country-item flex w-full p-2">
                  <div style="font-size: 14px">
                    {{ slotProps.option.title }}
                  </div>
                </div>
              </template>
            </Dropdown>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <Calendar
              v-model="filterData.startDate"
              dateFormat="dd-mm-yy"
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
            <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <Calendar
              v-model="filterData.endDate"
              dateFormat="dd-mm-yy"
              showTime
              showSeconds
            />
            <label for="inputgroup">{{
              $t("transportation.common.endDate")
            }}</label>
          </span>
        </div>
      </div>
    </div>
    <div class="mt-2 flex justify-content-end w-full">
      <Button
        :label="$t('buttons.cancel')"
        class="mx-2 p-button-secondary p-button-outlined"
        icon="pi pi-caret-up"
        @click="$emit('closeFilter')"
      />
      <Button
        icon="pi pi-filter"
        :label="$t('buttons.filter')"
        @click="changeFilterData"
        :loading="requestStatusStore.loading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Calendar from "primevue/calendar";
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { requestStatus } from "@/stores/common/requestStatus";
import { DashboardStore } from "./dashboardStore";
import type { dashboardFilterDto } from "./mapper";
import { getAllServices } from "../services/getAllService";

const services = ref();

onMounted(async () => {
  services.value = await getAllServices();
});
const dashboardStore = DashboardStore();
const requestStatusStore = requestStatus();

const filterData = ref<dashboardFilterDto>(
  dashboardStore.filterData ?? {
    startDate: null,
    endDate: null,
    service: undefined,
  }
);

function changeFilterData() {
  dashboardStore.changeFilterData(filterData.value);
}
</script>
