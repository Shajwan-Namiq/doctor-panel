<template>
  <div class="page-style">
    <div class="page-container">
      <TabView lazy>
        <TabPanel>
          <template #header>
            {{ $t("transportation.services.detail") }}
          </template>
          <ServiceBaseDetail
        /></TabPanel>
        <TabPanel>
          <template #header>
            <div
              :style="`color: ${
                !service?.params ? 'var(--danger-color-kubak)' : ''
              }`"
            >
              {{
                (!service?.params ? "*" : "") +
                $t("transportation.services.priceParameter.title")
              }}
            </div>
          </template>
          <ServiceDetail
        /></TabPanel>
        <TabPanel>
          <template #header>
            <div
              :style="`color: ${
                !service?.commission ? 'var(--danger-color-kubak)' : ''
              }`"
            >
              {{
                (!service?.commission ? "*" : "") +
                $t("transportation.services.commission.title")
              }}
            </div>
          </template>
          <CommissionComponent
            :serviceCommission="service?.commission"
            @updateCommission="getServiceData"
        /></TabPanel>
        <TabPanel>
          <template #header>
            <div
              :style="`color: ${
                !service?.notifyServantPreference
                  ? 'var(--danger-color-kubak)'
                  : ''
              }`"
            >
              {{
                (!service?.notifyServantPreference ? "*" : "") +
                $t("transportation.services.priceParameter.NotifyServant.title")
              }}
            </div>
          </template>
          <NotifyServant
            :notifyServant="service?.notifyServantPreference"
            @updateNotify="getServiceData"
        /></TabPanel>

        <TabPanel>
          <template #header>
            <div
              :style="`color: ${
                !service?.serviceSettings ? 'var(--danger-color-kubak)' : ''
              }`"
            >
              {{
                (!service?.serviceSettings ? "*" : "") +
                $t("transportation.services.setting.title")
              }}
            </div>
          </template>
          <Setting
            :settings="service?.serviceSettings"
            @updateSettings="getServiceData"
        /></TabPanel>
        <TabPanel>
          <template #header>
            {{ $t("transportation.services.area.title") }}
          </template>
          <Area
            :settings="service?.serviceSettings"
            @updateSettings="getServiceData"
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ServiceDetail from "./serviceDetailTab/serviceDetail.vue";
import Setting from "./serviceDetailTab/setting.vue";
import { ServiceService, type ServiceDto } from "@/backend/transport";
import { useRoute } from "vue-router";
import { ref } from "vue";
import NotifyServant from "./serviceDetailTab/notifyServant.vue";
import Area from "./serviceDetailTab/area/index.vue";
import CommissionComponent from "./serviceDetailTab/commission.vue";
import ServiceBaseDetail from "./serviceDetailTab/serviceBaseDetail.vue";

const route = useRoute();
const service = ref<ServiceDto>();

getServiceData();
function getServiceData() {
  ServiceService.getService({ id: +route.params.id }).then((Response) => {
    service.value = Response;
  });
}
</script>

<style lang="scss"></style>
