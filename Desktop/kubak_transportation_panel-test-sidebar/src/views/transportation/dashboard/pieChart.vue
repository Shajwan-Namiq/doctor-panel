<template>
  <div class="pieChart h-full">
    <h3 class="text-center pt-4">
      {{ $t(`transportation.dashboard.chart.topPassengersTasks`) }}
    </h3>
    <div
      class="flex align-items-center justify-content-center px-4 lg:p-0 h-full"
    >
      <Chart type="pie" :data="chartData" class="w-8" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Chart from "primevue/chart";
import { ref, watch } from "vue";
import { DashboardStore } from "./dashboardStore";

const dashboardStore = DashboardStore();
const chartData = ref<any>({
  datasets: [],
  labels: [],
});
getPassengerTasks();
watch(
  () => dashboardStore.passengersTasks,
  () => {
    getPassengerTasks();
  }
);
function getPassengerTasks() {
  if (!dashboardStore.passengersTasks) return;
  chartData.value = {
    datasets: [
      {
        data: dashboardStore.passengersTasks.items.map(
          (item) => item.numberOfTask
        ),
        backgroundColor: [
          "#5388d8",
          "#0d2535",
          "#f4be37",
          "#00bf2d",
          "#ca472f",
        ],
        hoverBorderColor: [
          "#5388d8",
          "#0d2535",
          "#f4be37",
          "#00bf2d",
          "#ca472f",
        ],
        hoverBackgroundColor: [
          "#5388d850",
          "#0d253550",
          "#f4be3799",
          "#00bf2d50",
          "#ca472f50",
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverOffset: 10,
      },
    ],
    labels: dashboardStore.passengersTasks.items.map(
      (item) => item.userDisplayName
    ),
  };
}
</script>
