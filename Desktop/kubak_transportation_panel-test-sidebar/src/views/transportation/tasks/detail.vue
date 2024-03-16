<template>
  <div class="page-style">
    <div class="page-container">
      <TabView lazy>
        <TabPanel :header="$t('transportation.tasks.taskDetail')">
          <taskDetail :taskDetailData="taskDetailData"
        /></TabPanel>
        <TabPanel :header="$t('transportation.tasks.routeDetail.title')">
          <taskRoutes :taskDetailData="taskDetailData"
        /></TabPanel>
        <TabPanel
          :header="$t('transportation.tasks.destinationRoute.log.title')"
          v-if="taskDetailData?.destinations"
        >
          <DestinationsLog :taskDetailData="taskDetailData"
        /></TabPanel>
        <TabPanel
          :header="$t('transportation.tasks.stopLog.title')"
          v-if="
            taskDetailData?.taskStopLogDetail?.numberOfStops &&
            taskDetailData?.taskStopLogDetail?.numberOfStops > 0
          "
        >
          <StopLog :taskDetailData="taskDetailData"
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import taskDetail from "./detailTabs/taskDetail.vue";
import taskRoutes from "./detailTabs/taskRoutes.vue";
import DestinationsLog from "./detailTabs/destinationsLog.vue";
import StopLog from "./detailTabs/stopLog.vue";
import { TaskService, type TaskDetailResult } from "@/backend/transport";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const taskId = route.params.id;
const fullPath = route.fullPath;

const taskDetailData = ref<TaskDetailResult>();

getTaskDetail();

async function getTaskDetail() {
  // if the full path includes 'task/detail/request' call this function to get the task detail data
  if (fullPath.includes("detail/request")) {
    await TaskService.getTaskDetailByRequestId({ requestId: +taskId }).then(
      (response) => {
        taskDetailData.value = response;
      }
    );
  } else {
    await TaskService.getTaskDetail({ id: +taskId }).then((response) => {
      taskDetailData.value = response;
    });
  }
}
</script>

<style lang="scss">
body.dark .p-tabview .p-tabview-panels {
  background: var(--secondary-background-color-kubak);
}

body.dark .p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background: var(--secondary-background-color-kubak);
}
</style>
