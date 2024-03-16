import {
  ServantService,
  type RankedServantByTaskReport,
  ChartService,
  StaticTypeEnum,
  MemberService,
  TaskService,
  RequestService,
  PassengersService,
} from "@/backend/transport";
import { lastMonth, today } from "@/composables/customRequest";
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createMapForDashboardFilterToCardCountsFilter,
  createMapForDashboardFilterToChartDataFilter,
  createMapForDashboardFilterToPassengersTasksFilter,
  createMapForDashboardFilterToRankedServantsFilter,
} from "./mapper";

export const DashboardStore = defineStore("dashboardStore", () => {
  const servantRankings = ref<any>([]);
  const filterData = ref({
    startDate: new Date(lastMonth),
    endDate: new Date(today),
    serviceId: undefined,
    type: StaticTypeEnum.DAILY,
  });
  const chartData = ref();
  const cardCounts = ref({
    totalServants: 0,
    totalMembers: 0,
    totalSuccessTasks: 0,
    totalRequests: 0,
  });
  const passengersTasks = ref();

  async function getServantRankings() {
    await ServantService.getRankedServantByTaskReport(
      createMapForDashboardFilterToRankedServantsFilter(filterData.value)
    ).then((Response) => {
      servantRankings.value = Response;
    });
  }
  async function changeFilterData(filterDataParam: any) {
    Object.assign(filterData.value, filterDataParam);
    await getServantRankings();
    await getChart();
    await getCardCounts();
    await getPassengersTasks();
  }
  async function getChart() {
    await ChartService.getTaskStatus(
      createMapForDashboardFilterToChartDataFilter(filterData.value)
    ).then((Response) => {
      chartData.value = Response;
    });
  }
  async function getCardCounts() {
    await ServantService.getServantCount({}).then((Response) => {
      cardCounts.value.totalServants = Response?.servantCount ?? 0;
    });
    await MemberService.getMemberCount({}).then((Response) => {
      cardCounts.value.totalMembers = Response?.count ?? 0;
    });
    await TaskService.getTaskCount(
      createMapForDashboardFilterToCardCountsFilter(filterData.value)
    ).then((Response) => {
      cardCounts.value.totalSuccessTasks = Response?.count ?? 0;
    });
    await RequestService.getRequestCount(
      createMapForDashboardFilterToCardCountsFilter(filterData.value)
    ).then((Response) => {
      cardCounts.value.totalRequests = Response?.count ?? 0;
    });
  }
  async function getPassengersTasks() {
    await PassengersService.getPassengersReport(
      createMapForDashboardFilterToPassengersTasksFilter(filterData.value)
    ).then((res: any) => {
      passengersTasks.value = res;
    });
  }
  return {
    servantRankings,
    filterData,
    getServantRankings,
    changeFilterData,
    getChart,
    chartData,
    getCardCounts,
    cardCounts,
    getPassengersTasks,
    passengersTasks,
  };
});
