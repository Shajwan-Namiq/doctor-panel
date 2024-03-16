<template>
  <div class="my-3 pb-3">
    <div class="w-full flex justify-content-end my-3">
      <div v-if="ifUserHasPolicy(PolicyType.WRITE_SERVICE)">
        <Button
          :label="$t('buttons.edit')"
          icon="pi pi-bookmark"
          :loading="requestStatusStore.loading"
          @click="editNotifyServantData"
        />
      </div>
    </div>
  </div>
  <div class="grid mt-4" style="width: 100% !important">
    <div
      class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4"
      v-for="(index, field) in notifyServantData"
      :key="index"
    >
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon :name="returnIcon(field)" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputNumber
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="notifyServantData[field]"
            :disabled="!ifUserHasPolicy(PolicyType.WRITE_SERVICE)"
          />
          <label for="inputgroup">{{
            $t(`transportation.services.priceParameter.NotifyServant.${field}`)
          }}</label>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { NotifyServantPreferenceDto } from "@/backend/transport";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";
import { requestStatus } from "@/stores/common/requestStatus";
import { onMounted, ref, watch } from "vue";
import { PolicyType, ServiceService } from "@/backend/transport";
import { useRoute } from "vue-router";
import type { NotifyServantPreferenceRequest } from "@/backend/transport";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

const props = defineProps(["notifyServant"]);
const requestStatusStore = requestStatus();
const route = useRoute();
const toast = toastStore();
const { t } = useI18n();
const emits = defineEmits(["updateNotify"]);

const notifyServantData = ref<NotifyServantPreferenceDto>({
  firstDuration: undefined,
  gapDistance: undefined,
  gapDuration: undefined,
  requestTtl: undefined,
  defaultNewRequestAlertDistance: undefined,
  maxNewRequestAlertAllowedDistance: undefined,
  minNewRequestAlertAllowedDistance: undefined,
});

onMounted(() => {
  if (props.notifyServant) {
    notifyServantData.value = props.notifyServant;
    delete notifyServantData.value.id;
    delete notifyServantData.value.serviceId;
  }
});
watch(
  () => props.notifyServant,
  () => {
    if (props.notifyServant) {
      notifyServantData.value = props.notifyServant;
      delete notifyServantData.value.id;
      delete notifyServantData.value.serviceId;
    }
  }
);
function editNotifyServantData() {
  ServiceService.updateNotifyServantPreference({
    id: +route.params.id,
    requestBody: notifyServantData.value as NotifyServantPreferenceRequest,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.service"),
      }),
      type: "success",
    });
    emits("updateNotify");
  });
}
function returnIcon(field) {
  switch (field) {
    case "firstDuration":
      return "time-outline";
    case "requestTtl":
      return "time-outline";
    case "maxDistance":
      return "locate-outline";
    case "gapDuration":
      return "locate-outline";
    case "gapDistance":
      return "locate-outline";
    case "defaultNewRequestAlertDistance":
      return "map-outline";
    case "maxNewRequestAlertAllowedDistance":
      return "map-outline";
    case "minNewRequestAlertAllowedDistance":
      return "map-outline";
  }
}
</script>
