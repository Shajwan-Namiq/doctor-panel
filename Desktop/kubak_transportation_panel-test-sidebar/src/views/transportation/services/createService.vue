<template>
  <div
    class="px-4 lg:px-6 py-4 slide-fade-down w-full flex justify-content-center"
  >
    <Splitter
      layout="vertical"
      class="pageWrapper w-full p-4"
      style="max-width: 2000px"
    >
      <ProgressSpinner />
      <div class="addDataComponentWrapper">
        <SplitterPanel>
          <div class="grid my-4" style="width: 100% !important">
            <div class="col-12 mb-2">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="business-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  :options="regionStore.regions"
                  display="chip"
                  :loading="requestStatusStore.loading"
                  :placeholder="$t('auth.area.regions')"
                  v-model="serviceData.regionId"
                  :class="{
                    'p-invalid': v$.regionId.$invalid && submittedButton,
                  }"
                >
                  <template #value="valueProp">
                    {{
                      v$.regionId.$invalid && submittedButton
                        ? $t("validationMessages.required", {
                            field: $t("auth.area.regions"),
                          })
                        : valueProp.value?.name ?? valueProp.placeholder
                    }}
                  </template>
                  <template #option="slotProps">
                    <p>{{ slotProps.option?.name }}</p>
                  </template>
                </Dropdown>
              </div>
            </div>
            <div class="col-12 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="subway-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  :options="serviceTypes"
                  display="chip"
                  :loading="requestStatusStore.loading"
                  :placeholder="$t('transportation.services.type')"
                  v-model="serviceData.serviceTypeId"
                  :disabled="!!serviceData.serviceTypeId"
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
                    <p>{{ slotProps.option?.translations[0]?.title }}</p>
                  </template>
                </Dropdown>
              </div>
            </div>

            <div
              class="flex justify-content-end align-items-center w-full mx-2"
            >
              <Button
                :label="$t('buttons.add')"
                icon="pi pi-plus"
                @click="submitActiveService"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </SplitterPanel>
      </div>
    </Splitter>
  </div>
</template>
<script lang="ts" setup>
import ProgressSpinner from "primevue/progressspinner";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { requestStatus } from "@/stores/common/requestStatus";
import { inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RegionStore } from "@/stores/common/region";
import { ServiceStore } from "@/stores/common/service";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { ServiceService } from "@/backend/transport";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import type { CreateServiceRequest } from "@/common/models/transportation/service";

const serviceStore = ServiceStore();
const toast = toastStore();
const { t } = useI18n();
const serviceTypes = ref();
const dialogRef: any = inject("dialogRefForCreate");

serviceStore.getAllServiceType().then((res) => {
  serviceTypes.value = res;
  const index = serviceTypes.value.findIndex((x) => x.id == +route.params.id);
  serviceData.value.serviceTypeId = serviceTypes.value[index];

  dialogRef.value.close();
  toast.changeToastState({
    severity: t("toasts.added_success_header"),
    summary: t("toasts.added_success_desc", {
      field: t("fields.service_type"),
    }),
    type: "success",
  });
});
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();
const serviceData = ref<CreateServiceRequest>({
  regionId: undefined,
  serviceTypeId: undefined,
});

const submittedButton = ref(false);

const route = useRoute();
const router = useRouter();
const rule = {
  regionId: { required },
  serviceTypeId: { required },
};

const v$ = useVuelidate(rule, serviceData as any);
// function addPeriod() {
//   baseNight.value.periodStart = moment(baseNight.value.periodStart).format(
//     HH:mm:ss"
//   );
//   baseNight.value.periodEnd = moment(baseNight.value.periodEnd).format(
//     "HH:mm:ss"
//   );

//   periods.value.push(baseNight.value);

//   baseNight.value = {
//     periodEnd: undefined,
//     periodStart: undefined,
//   };
// }

//submit form
function submitActiveService() {
  submittedButton.value = true;

  const request = {
    regionId: serviceData.value.regionId?.id,
    serviceTypeId: serviceData.value.serviceTypeId?.id,
  };

  if (!v$.value.$invalid) {
    ServiceService.createService({
      requestBody: request as any,
    })
      .then(() => {
        toast.changeToastState({
          severity: t("toasts.added_success_header"),
          summary: t("toasts.added_success_desc", {
            field: t("fields.service"),
          }),
          type: "success",
        });
        router.push({
          name: "listService",
        });
      })
      .catch(() => {
        //
      });
  }
}
</script>
<style lang="scss"></style>
