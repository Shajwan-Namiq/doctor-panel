<template>
  <div class="my-3 pb-3">
    <div class="w-full flex justify-content-end my-3">
      <div v-if="ifUserHasPolicy(PolicyType.WRITE_SERVICE)">
        <Button
          :label="$t('buttons.edit')"
          icon="pi pi-bookmark"
          :loading="requestStatusStore.loading"
          @click="editSetting"
        />
      </div>
    </div>
  </div>
  <div class="grid mt-4" style="width: 100% !important">
    <div
      class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4"
      v-for="(index, field) in settingsData"
      :key="index"
    >
      <!-- <div class="my-10">{{ field }}</div> -->
      <br />
      <div class="p-inputgroup mb-10">
        <span class="p-inputgroup-addon">
          <ion-icon :name="returnIcon(field)" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputNumber
            :inputId="`input-${field}`"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            :id="`input-${field}`"
            type="text"
            v-model="settingsData[field]"
            :disabled="!ifUserHasPolicy(PolicyType.WRITE_SERVICE)"
            :class="{
              'p-invalid': v$[field].$invalid && submittedServiceList,
            }"
          />

          <label :for="`input-${field}`">
            {{
              v$[field].$invalid && submittedServiceList
                ? $t("validationMessages.required")
                : $t(`transportation.list.${field}`)
            }}
          </label>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  PolicyType,
  ServiceService,
  type UpdateServiceSettingsRequest,
} from "@/backend/transport";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";
import { requestStatus } from "@/stores/common/requestStatus";
import { toastStore } from "@/stores/common/toastStore";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
const route = useRoute();
const toast = toastStore();
const { t } = useI18n();
const submittedServiceList = ref(false);
const requestStatusStore = requestStatus();
const props = defineProps(["settings"]);
const emits = defineEmits(["updateSettings"]);

const settingsData = ref<UpdateServiceSettingsRequest>({
  ableToReviewTaskDurationInDays: undefined,
  dynamicInTaskServantRouteUpdateRetrievalInSecond: undefined,
  liveTaskStateUpdateRetrievalInSecond: undefined,
  servantGettingCloseToClientNotifyRangeInMeter: undefined,
  userRequestLimit: undefined,
  userRequestLimitTimeToLiveInSecond: undefined,
  maxDistanceToArrive: undefined,
  distanceToUpdateServantDynamicRouteInMeter: undefined,
  removeCanceledTaskAndRequestDelayInMinute: undefined,
  removeCompletedTaskAndRequestDelayInMinute: undefined,
});

onMounted(() => {
  if (!props.settings) return;
  addSettingData();
});
watch(props, () => {
  if (!props.settings) return;
  addSettingData();
});
function addSettingData() {
  for (const field in settingsData.value) {
    if (props.settings.hasOwnProperty(field)) {
      settingsData.value[field] = props.settings[field];
    }
  }
}
async function editSetting() {
  submittedServiceList.value = true;
  if (!v$.value.$invalid) {
    await ServiceService.updateServiceSettings({
      id: +route.params.id,
      requestBody: settingsData.value,
    }).then(() => {
      toast.changeToastState({
        severity: t("toasts.updated_success_header"),
        summary: t("toasts.updated_success_desc", {
          field: t("fields.service"),
        }),
        type: "success",
      });
      emits("updateSettings");
    });
  }
}
function returnIcon(field) {
  switch (field) {
    case "ableToReviewTaskDurationInDays":
      return "partly-sunny-outline";
    case "dynamicInTaskServantRouteUpdateRetrievalInSecond":
      return "map-outline";
    case "liveTaskStateUpdateRetrievalInSecond":
      return "time-outline";
    case "servantGettingCloseToClientNotifyRangeInMeter":
      return "home-outline";
    case "userRequestLimit":
      return "help-buoy-outline";
    case "userRequestLimitPeriodInSecond":
      return "time-outline";
    case "maxDistanceToArrive":
      return "navigate-outline";
    case "distanceToUpdateServantDynamicRouteInMeter":
      return "car-outline";
    case "removeCanceledTaskAndRequestDelayInMinute":
      return "map-outline";
    case "removeCompletedTaskAndRequestDelayInMinute":
      return "map-outline";
    case "userRequestLimitTimeToLiveInSecond":
      return "time-outline";
  }
}

// apply validation
const rule: any = {
  ableToReviewTaskDurationInDays: { required, minValue: minValue(1) },
  dynamicInTaskServantRouteUpdateRetrievalInSecond: {
    required,
    minValue: minValue(1),
  },
  liveTaskStateUpdateRetrievalInSecond: { required, minValue: minValue(1) },
  servantGettingCloseToClientNotifyRangeInMeter: {
    required,
    minValue: minValue(1),
  },
  userRequestLimit: { required, minValue: minValue(1) },
  userRequestLimitTimeToLiveInSecond: { required, minValue: minValue(1) },
  maxDistanceToArrive: { required, minValue: minValue(1) },
  distanceToUpdateServantDynamicRouteInMeter: {
    required,
    minValue: minValue(1),
  },
  removeCanceledTaskAndRequestDelayInMinute: {
    required,
    minValue: minValue(1),
  },
  removeCompletedTaskAndRequestDelayInMinute: {
    required,
    minValue: minValue(1),
  },
};
const v$ = useVuelidate(rule, settingsData.value);
</script>
