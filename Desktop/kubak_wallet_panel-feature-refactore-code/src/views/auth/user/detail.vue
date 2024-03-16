<template>
  <div class="page-style">
    <div class="page-container">
      <TabView lazy>
        <TabPanel :header="$t('auth.user.userDetail')">
          <UserDetail
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import UserDetail from "./userDetail.vue";
</script>
