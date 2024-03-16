<template>
  <CreateCancelReasonComponent
    @formSubmitted="createCancelReason"
    :selectedCancelReason="selectedCancelReason"
  />
</template>
<script setup lang="ts">
import { CancelReasonService } from "@/backend/transport";
import CreateCancelReasonComponent from "./formComponent.vue";
import type { CreateUpdateCancelReasonRequest } from "./mapper";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { inject, ref } from "vue";
import { CancelReasonStore } from "./cancelReasonStore";

const toast = toastStore();
const { t } = useI18n();
const dialogRef: any = inject("dialogRef");
const reasonStore = CancelReasonStore();
const selectedCancelReason = ref(dialogRef.value.data);

async function createCancelReason(data: CreateUpdateCancelReasonRequest) {
  await CancelReasonService.updateCancelReason({
    id: selectedCancelReason.value.id,
    requestBody: data,
  }).then(async () => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("transportation.cancelReason.title"),
      }),
      type: "success",
    });
    await reasonStore.getAllCancelReason();
    dialogRef.value.close();
  });
}
</script>
