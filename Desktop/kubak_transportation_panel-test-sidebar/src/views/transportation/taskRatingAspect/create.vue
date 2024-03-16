<template>
  <formComponent @formSubmitted="addTaskRatingAspect" />
</template>

<script setup lang="ts">
import formComponent from "./formComponent.vue";
import { useI18n } from "vue-i18n";
import { toastStore } from "@/stores/common/toastStore";
import { TaskRatingAspectService } from "@/backend/transport";
import { inject } from "vue";

const dialogRef: any = inject("dialogRef");

const toast = toastStore();
const { t } = useI18n();

//create new row data
async function addTaskRatingAspect(cardData) {
  const taskDataResult = Object.assign({}, cardData);
  taskDataResult.translations = taskDataResult.translations.filter(
    (item) => item.title != ""
  );

  await TaskRatingAspectService.createTaskRatingAspect({
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
    dialogRef.value.options.emits.onCreate();
  });
}
</script>

<style></style>
