<template>
  <div class="w-full flex justify-content-center">
    <div class="md:p-6 p-4 xl:w-9 w-full">
      <TabView lazy class="mt-4">
        <TabPanel :header="$t('transportation.requests.requestsDetail')">
          <Requests />
        </TabPanel>
        <TabPanel :header="$t('transportation.requests.onlineServants')">
          <OnlineServants />
        </TabPanel>
        <TabPanel :header="$t('transportation.requests.passiveServants')">
          <PassiveServants />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import OnlineServants from "./detailTabs/onlineServants.vue";
import PassiveServants from "./detailTabs/passiveServants.vue";
import Requests from "./detailTabs/requests.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
</script>
<style lang="scss"></style>
