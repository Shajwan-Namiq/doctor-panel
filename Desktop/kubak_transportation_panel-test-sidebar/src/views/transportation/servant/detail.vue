<template>
  <div class="page-style">
    <div class="page-container">
      <TabView lazy>
        <TabPanel :header="$t('transportation.servant.detail.servantDetail')">
          <servantDetail
        /></TabPanel>
        <TabPanel :header="$t('transportation.servant.detail.tasks')">
          <ServantTasks
        /></TabPanel>
        <TabPanel
          :header="$t('transportation.servant.detail.servantPerformance')"
        >
          <performance
        /></TabPanel>
        <TabPanel
          :header="$t('transportation.servant.detail.servantOnlinePeriod')"
        >
          <onlinePeriods
        /></TabPanel>
        <TabPanel :header="$t('transportation.servant.devices.title')">
          <ServantDevice
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import servantDetail from "./detailTabs/servantDetail.vue";
import onlinePeriods from "./detailTabs/onlinePeriods.vue";
import performance from "./detailTabs/performance.vue";
import ServantTasks from "./detailTabs/servantTasks.vue";
import ServantDevice from "./detailTabs/servantDevice.vue";
</script>
