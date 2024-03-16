<template>
  <Splitter layout="vertical" class="" style="max-width: 2000px">
    <ProgressSpinner />
    <div class="addDataComponentWrapper p-4">
      <SplitterPanel>
        <div class="grid my-4" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <p for="dd-city" class="mb-2">{{ $t("fields.service_type") }}</p>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="car-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                :options="serviceTypes"
                display="chip"
                :loading="requestStatusStore.loading"
                :placeholder="$t('transportation.services.type')"
                v-model="serviceData.serviceType"
              >
                <template #value="valueProp">
                  {{
                    valueProp.value?.translations
                      ? valueProp.value?.translations[0].title ??
                        valueProp.placeholder
                      : valueProp.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <p>
                    {{
                      slotProps.option?.translations
                        ? slotProps.option?.translations[0]?.title
                        : ""
                    }}
                  </p>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <p for="dd-city" class="mb-2">{{ $t("auth.area.region") }}</p>

            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="subway-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                :options="regions"
                display="chip"
                :placeholder="$t('auth.area.region')"
                v-model="serviceData.region"
              >
                <template #value="valueProp">
                  {{ valueProp.value?.name ?? valueProp.placeholder }}
                </template>
                <template #option="slotProps">
                  <p>{{ slotProps.option.name }}</p>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <p for="dd-city" class="mb-2">
              {{ $t("fields.active.isActive") }}
            </p>

            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon
                  name="checkmark-circle-outline"
                  class="text-2xl"
                ></ion-icon>
              </span>
              <Dropdown
                :options="isActive"
                display="chip"
                :placeholder="''"
                v-model="serviceData.isActive"
              >
                <template #value="valueProp">
                  {{
                    valueProp.value != undefined
                      ? $t(`fields.active.${valueProp.value}`)
                      : valueProp.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <p>{{ $t(`fields.active.${slotProps.option}`) }}</p>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-content-end">
          <Button
            @click="updateService"
            :loading="requestStatusStore.loading"
            >{{ $t("buttons.submit") }}</Button
          >
        </div>
      </SplitterPanel>
    </div>
  </Splitter>
</template>
<script lang="ts" setup>
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import { useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import { ServiceService, type ServiceDto } from "@/backend/transport";
import { ServiceStore } from "@/stores/common/service";
import { RegionStore } from "@/stores/common/region";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

const serviceStore = ServiceStore();
const regionStore = RegionStore();
const toast = toastStore();
const { t } = useI18n();
const serviceData = ref<ServiceDto>({
  isActive: false,
  region: {
    name: "",
  },
  title: "",
  serviceType: {},
});
const isActive = ref([true, false]);
const serviceTypes = ref();
const route = useRoute();
const regions = ref(regionStore.regions);
if (regions.value.length == 0) {
  regionStore.getAllRegion().then((res) => {
    regions.value = res;
  });
}
serviceStore.getAllServiceType().then((res) => {
  serviceTypes.value = res;
  const index = serviceTypes.value.findIndex((x) => x.id == +route.params.id);
  serviceData.value.serviceType = serviceTypes.value[index];
  getServiceData();
});
const requestStatusStore = requestStatus();

function getServiceData() {
  ServiceService.getService({ id: +route.params.id }).then((Response) => {
    serviceData.value = Response;
  });
}
function updateService() {
  ServiceService.updateService({
    id: +route.params.id,
    requestBody: {
      isActive: serviceData.value.isActive ?? false,
      regionId: serviceData.value.region?.id ?? 0,
      serviceTypeId: serviceData.value.serviceType?.id ?? 0,
    },
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.service"),
      }),
      type: "success",
    });
  });
}
</script>
<style lang="scss">
.addDataComponentWrapper {
  background-color: var(--secondary-background-color-kubak);
  padding-bottom: 20px;
  border-radius: 5px;
}

.serviceDetailHeader {
  font-size: 20px;
  font-weight: 500;
  color: var(--icon-color-kubak) !important;
}
.progressBar {
  height: 100vh;
  background-color: #a1a1a180;
  position: absolute;
  top: 0;
  width: 100vw;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
