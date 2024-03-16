<template>
  <div
    class="taskDetailContainer fadeinright animation-duration-300 w-10 xl:w-8"
  >
    <ion-icon
      name="close-circle-outline"
      class="text-4xl absolute z-5 top-0 my-1 mx-2 cursor-pointer"
      :class="closeButtonPosition()"
      @click="close"
      style="color: var(--foreground-color-kubak)"
    ></ion-icon>

    <!-- <ProgressBar
      mode="indeterminate"
      style="height: 4px"
      v-if="requestStatusStore.loading"
    ></ProgressBar> -->

    <TabView class="h-full" style="min-height: 250px">
      <div>
        <TabPanel
          :header="$t('transportation.monitoring.taskDetail.driver')"
          class="h-full"
        >
          <DriverDetail :taskDetail="taskDetail" />
        </TabPanel>
        <TabPanel :header="$t('transportation.monitoring.taskDetail.task')">
          <TaskDetail :taskDetail="taskDetail" />
        </TabPanel>
        <TabPanel
          :header="$t('transportation.monitoring.taskDetail.passenger')"
        >
          <PassengerDetail :taskDetail="taskDetail" />
        </TabPanel>
        <TabPanel
          :header="$t('transportation.monitoring.taskDetail.manageTask')"
          class="h-full"
        >
          <ManageTask :taskDetail="taskDetail" />
        </TabPanel>
      </div>
      <!-- <div v-else>
        <TabPanel header="" class="h-full">
          <ProgressSpinner />
        </TabPanel>
      </div> -->
    </TabView>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import DriverDetail from "./driverDetail.vue";
import TaskDetail from "./taskDetail.vue";
import PassengerDetail from "./passengerDetail.vue";
import ManageTask from "./manageTask.vue";
import { MonitoringStore } from "../monitoringStore";
import { watch, ref, onMounted } from "vue";
import type { TripStatusDetail } from "@/backend/transport";

const props = defineProps(["taskDetail"]);
const taskDetail = ref<TripStatusDetail>(props.taskDetail?.data);
watch(
  () => props.taskDetail,
  () => {
    taskDetail.value = props.taskDetail?.data;
  }
);

const monitoringStore = MonitoringStore();

onMounted(() => {
  monitoringStore.showRequestAlerts({}, true);
});
function close() {
  monitoringStore.changeCancelTaskDetail(true);
}
function closeButtonPosition() {
  return localStorage.getItem("direction") == "ltr" ? "right-0" : "left-0";
}
</script>
