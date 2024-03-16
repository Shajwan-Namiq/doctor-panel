<template>
  <Button @click="deletePenalize">Delete</Button>
</template>
<script setup lang="ts">
import { TaskCancellationPenalizeService } from "@/backend/transport";
import { toastStore } from "@/stores/common/toastStore";
import { inject, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();
onMounted(() => {
  TaskCancellationPenalizeService.isPenalizeInUse({
    id: dialogRef.value.data.penalizeId,
  }).then(() => {
    ///
  });
});
function deletePenalize() {
  TaskCancellationPenalizeService.deletePenalize({
    id: dialogRef.value.data.penalizeId,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.deleted_success_header"),
      summary: t("toasts.deleted_success_desc", {
        field: t("transportation.reports.reportProblemsTitle"),
      }),
      type: "success",
    });
    dialogRef.value.options.emits.onAddDeletePenalize();
    dialogRef.value.close();
  });
}
</script>
