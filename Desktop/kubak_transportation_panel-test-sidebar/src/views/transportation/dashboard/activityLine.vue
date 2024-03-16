<template>
  <div class="cardWrapper flex justify-content-center align-items-center p-4">
    <h1></h1>
    <Chart
      type="bar"
      :data="chartData"
      class="w-full h-full xl:w-10"
      :options="basicOptions"
      :height="200"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Chart from "primevue/chart";
import { DashboardStore } from "./dashboardStore";

const dashboardStore = DashboardStore();
const chartData = ref<{ labels: string[]; datasets: object[] }>({
  labels: [],
  datasets: [],
});
const basicOptions = ref({
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
});
watch(
  () => dashboardStore.servantRankings,
  () => {
    getServantsPerformance();
  },
  { deep: true }
);
function getServantsPerformance() {
  chartData.value = {
    labels: [],
    datasets: [],
  };
  const labelColors = {
    numberOfTasks: "#ffbb0e",
    rating: "#5388d8",
  };
  const labels = {
    numberOfTasks: [],
    rating: [],
  };
  dashboardStore?.servantRankings?.items?.map((data) => {
    for (const field in labels) {
      labels[field].push(data[field]);
    }
    chartData.value.labels.push(data.servantName ?? "");
  });
  for (const index in labels) {
    chartData.value.datasets.push({
      label: index,
      data: labels[index],
      fill: true,
      borderColor: labelColors[index],
      tension: 0.4,
      backgroundColor: `${labelColors[index]}`,
      pointHoverRadius: 10,
    });
  }
}
</script>
