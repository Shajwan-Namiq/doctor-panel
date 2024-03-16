<template>
  <formComponent
    @formSubmitted="editTaskRatingAspect"
    :taskRatingAspectData="dialogRef.data"
  />
</template>

<script setup lang="ts">
import { inject } from "vue";
import formComponent from "./formComponent.vue";
import { useI18n } from "vue-i18n";
import { toastStore } from "@/stores/common/toastStore";
import { TaskRatingAspectService } from "@/backend/transport";
const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();

//update row data
async function editTaskRatingAspect(cardData) {
  const taskDataResult = Object.assign({}, cardData);
  taskDataResult.translations = taskDataResult.translations.filter(
    (item) => item.title != ""
  );

  await TaskRatingAspectService.updateTaskRatingAspect({
    id: dialogRef.value.data.id,
    requestBody: taskDataResult,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.tasks.fields.taskRatingAspectTitle"),
      }),
      type: "success",
    });
    dialogRef.value.close();
    dialogRef.value.options.emits.onEdit();
  });
}
</script>
