<template>
  <div class="dashboard px-4">
    <div :class="showTest">
      <div>
        <div v-if="filterMode">
          <Filter @closeFilter="toggleFilterMode(false)" />
        </div>
        <div class="flex justify-content-end mt-4">
          <Button @click="toggleFilterMode(true)" v-if="!filterMode">
            <i class="pi pi-filter"></i>
            <span class="px-2">{{ $t("buttons.filter") }}</span>
            <i class="pi pi-caret-down text-sm"></i>
          </Button>
        </div>

        <div>
          <div class="grid py-4">
            <Card :cards="cards" />
          </div>
          <div class="grid">
            <div class="col-12">
              <LineChart :services="services" />
            </div>
            <div class="col-12 lg:col-4">
              <PieChart />
            </div>
            <div class="col-12 lg:col-8"><ActivityLine /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "./card.vue";
import LineChart from "./lineChart.vue";
import PieChart from "./pieChart.vue";
import ActivityLine from "./activityLine.vue";
import Filter from "./filter.vue";
import { ServiceStore } from "@/stores/common/service";
import type { ServiceDto } from "@/backend/transport";
import { DashboardStore } from "./dashboardStore";

const serviceStore = ServiceStore();
const services = ref<ServiceDto[]>();
const dashboardStore = DashboardStore();
const cards = ref([
  {
    title: "servants",
    value: "totalServants",
    icon: "car-outline",
    color: "#0b84a5",
    page: "listServant",
  },
  {
    title: "users",
    value: "totalMembers",
    icon: "people-outline",
    color: "#eb6f33",
    page: "userList",
  },
  {
    title: "successTasks",
    value: "totalSuccessTasks",
    icon: "checkmark-done-circle-outline",
    color: "#00bf2d",
    page: "listTasks",
  },
  {
    title: "requests",
    value: "totalRequests",
    icon: "bar-chart-outline",
    color: "#6f4e7c",
    page: "requestsList",
  },
]);
onMounted(async () => {
  await serviceStore.getAllServices();
  await dashboardStore.getServantRankings();
  await dashboardStore.getChart();
  await dashboardStore.getCardCounts();
  await dashboardStore.getPassengersTasks();
  services.value = serviceStore.services;
});
const filterMode = ref(false);
const showTest = ref("");
function toggleFilterMode(cond) {
  filterMode.value = cond;
  if (cond === true) {
    showTest.value = "slide-fade-down";
  } else {
    showTest.value = "slide-fade-up";
  }
}
</script>
<style lang="scss">
@import "@/styles/theme/dashboard.scss";
</style>
