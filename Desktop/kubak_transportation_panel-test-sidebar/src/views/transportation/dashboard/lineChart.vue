<template>
  <div class="lineChart p-4">
    <div class="w-full flex justify-content-end mb-4">
      <SelectButton
        v-model="chartType"
        :options="options"
        aria-labelledby="single"
        @change="changeChartType"
        :unselectable="false"
      >
        <template #option="slotProps">
          {{ $t(`transportation.dashboard.chart.${slotProps.option}`) }}
        </template>
      </SelectButton>
    </div>
    <div class="h-full flex justify-content-center align-items-center">
      <ProgressSpinner v-if="requestStatusStore.loading" />
    </div>
    <div v-if="!requestStatusStore.loading && dashboardStore.chartData">
      <Chart
        type="line"
        :data="chartData"
        :options="basicOptions"
        :height="300"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Chart from "primevue/chart";
import SelectButton from "primevue/selectbutton";
import { ref, watch } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import { requestStatus } from "@/stores/common/requestStatus";
import { DashboardStore } from "./dashboardStore";
import { useI18n } from "vue-i18n";

const options = ref(["Daily", "Monthly"]);
const dashboardStore = DashboardStore();
const chartType = ref(dashboardStore.filterData?.type ?? "Daily");
const requestStatusStore = requestStatus();
const chartData = ref<{ labels: string[]; datasets: object[] }>({
  labels: [],
  datasets: [],
});
const { t } = useI18n();

const basicOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
});

watch(
  () => dashboardStore.chartData,
  () => {
    getChartData();
  },
  { deep: true }
);

function changeChartType() {
  dashboardStore.changeFilterData({ type: chartType.value });
}
const labelColors = {
  onlineServants: "#0b84a5",
  successTasks: "#9dd866",
  canceledTasks: "#ca472f",
  requests: "#8dddd0",
  noAcceptRequests: "#6f4e7c",
  noServantRequests: "#f6c85f",
  totalRequesters: "#1c2433",
  canceledRequests: "#941b5f",
};

function getChartData() {
  const labels = {
    onlineServants: [],
    successTasks: [],
    canceledTasks: [],
    requests: [],
    noAcceptRequests: [],
    noServantRequests: [],
    totalRequesters: [],
    canceledRequests: [],
  };
  chartData.value = {
    labels: [],
    datasets: [],
  };
  dashboardStore.chartData?.map((data) => {
    for (const index in labels) {
      labels[index].push(data[index]);
    }
    chartData.value.labels.push(data.date!);
  });
  for (const index in labels) {
    chartData.value.datasets.push({
      label: t(`transportation.hourlyReport.fields.${index}`),
      data: labels[index],
      fill: true,
      borderColor: labelColors[index],
      tension: 0.4,
      backgroundColor: `${labelColors[index]}10`,
      pointHoverRadius: 10,
    });
  }
}
</script>
