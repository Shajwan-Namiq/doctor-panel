<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <div
        class="pageWrapper flex flex-column justify-content-center align-items-center"
      >
        <p class="mb-6 px-4 text-2xl font-bold">
          {{ $t("transportation.heatMap.title") }}
        </p>
        <div class="grid py-4" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-6 xl:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="sunny-outline" class="text-xl"></ion-icon>
              </span>
              <Dropdown
                :options="heatMapTypeOptions"
                optionDisabled="disabled"
                display="chip"
                :placeholder="$t('transportation.heatMap.type')"
                v-model="heatMapConfiguration.heatMapType"
                :class="{
                  'p-invalid': v$.heatMapType?.$invalid && submittedForm,
                }"
              >
                <template #value="valueProp">
                  {{
                    v$.heatMapType?.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: valueProp.placeholder,
                        })
                      : valueProp.value ?? valueProp.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <p>
                    {{ slotProps.option }}
                  </p>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-6 xl:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="time-outline" class="text-xl"></ion-icon>
              </span>
              <div class="p-inputgroup">
                <span class="p-float-label">
                  <InputNumber
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="heatMapConfiguration.fromValue"
                    :class="{
                      'p-invalid': v$.fromValue?.$invalid && submittedForm,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.fromValue?.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: $t("transportation.heatMap.fromValue"),
                        })
                      : $t("transportation.heatMap.fromValue")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-6 xl:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="time-outline" class="text-xl"></ion-icon>
              </span>
              <div class="p-inputgroup">
                <span class="p-float-label">
                  <InputNumber
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="heatMapConfiguration.lengthInHour"
                    :class="{
                      'p-invalid': v$.lengthInHour?.$invalid && submittedForm,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.lengthInHour?.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: $t("transportation.heatMap.lengthInHour"),
                        })
                      : $t("transportation.heatMap.lengthInHour")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 flex justify-content-end">
            <Button
              @click="upsetHeatMap"
              :loading="requestStatusStore.loading"
              v-can="[PolicyType.WRITE_HEAT_MAP_CONFIGURATION]"
            >
              <i class="pi pi-check-circle mr-2" style="font-size: 1rem"></i>
              {{ $t("buttons.submit") }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  HeatMapService,
  HeatMapType,
  PolicyType,
  type UpsertHeatMapConfigRequest,
} from "@/backend/transport";
import { requestStatus } from "@/stores/common/requestStatus";
import { toastStore } from "@/stores/common/toastStore";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const requestStatusStore = requestStatus();
const heatMapTypeOptions = Object.keys(HeatMapType).map(
  (key) => HeatMapType[key]
);

onMounted(() => {
  getHeatMapData();
});

const submittedForm = ref(false);
const heatMapConfiguration = ref<UpsertHeatMapConfigRequest>({
  fromValue: 0,
  heatMapType: HeatMapType.EXPECTED_FROM_LATEST_DAY,
  lengthInHour: 0,
});
const rule = {
  fromValue: { required, minValue: minValue(1) },
  heatMapType: { required },
  lengthInHour: { required, minValue: minValue(1) },
};
const v$ = useVuelidate(rule, heatMapConfiguration);

async function getHeatMapData() {
  await HeatMapService.getHeatMapConfig().then((Response) => {
    heatMapConfiguration.value = Response as UpsertHeatMapConfigRequest;
  });
}
function upsetHeatMap() {
  submittedForm.value = true;
  if (v$.value.$invalid) return;
  HeatMapService.upsertHeatMapConfig({
    requestBody: heatMapConfiguration.value,
  }).then(() => {
    getHeatMapData();
    const toast = toastStore();
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", { field: t("fields.card") }),
      type: "success",
    });
  });
}
</script>
