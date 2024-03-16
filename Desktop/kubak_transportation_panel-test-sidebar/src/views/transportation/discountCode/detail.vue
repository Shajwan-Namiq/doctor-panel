<template>
  <div class="md:p-4 p-2 w-full flex justify-content-center">
    <div class="xl:w-9 w-full">
      <TabView lazy>
        <TabPanel
          :header="$t('transportation.discountCode.detail.tabHeader.detail')"
        >
          <discountCodeDetail
        /></TabPanel>
        <TabPanel
          :header="$t('transportation.discountCode.detail.tabHeader.users')"
        >
          <users
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import discountCodeDetail from "./tabs/discountCodeDetail.vue";
import users from "./tabs/users.vue";
</script>
