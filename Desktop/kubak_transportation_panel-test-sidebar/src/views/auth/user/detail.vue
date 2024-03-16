<template>
  <div class="page-style">
    <div class="page-container">
      <TabView lazy>
        <TabPanel :header="$t('auth.user.userDetail')">
          <UserDetail
        /></TabPanel>
        <TabPanel :header="$t('auth.user.userTask')"> <userTasks /></TabPanel>
        <TabPanel :header="$t('auth.user.requestListUser')">
          <userRequestList
        /></TabPanel>
        <TabPanel :header="$t('auth.user.userDevices')">
          <UserDevices
        /></TabPanel>
        <TabPanel :header="$t('auth.user.userBlockList')">
          <UserBlockList
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import UserDetail from "./detailTabs/userDetail.vue";
import userTasks from "./detailTabs/userTasks.vue";
import userRequestList from "./detailTabs/userRequestList.vue";
import UserDevices from "./detailTabs/userDevices.vue";
import UserBlockList from "./detailTabs/userBlockData.vue";
</script>
