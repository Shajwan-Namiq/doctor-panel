<template>
  <div class="p-4 grid">
    <div class="col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="color-filter-outline" class="text-xl"></ion-icon>
        </span>
        <Dropdown
          :options="actions"
          optionDisabled="disabled"
          display="chip"
          :placeholder="$t('transportation.tasks.manage_task')"
          v-model="selectedTaskStatus"
        >
          <template #value="valueProp">
            {{ valueProp.value ?? valueProp.placeholder }}
          </template>
          <template #option="slotProps">
            <p>
              {{ slotProps.option }}
            </p>
          </template>
        </Dropdown>
      </div>
    </div>
    <div
      class="col-4"
      v-if="selectedTaskStatus && selectedTaskStatus?.includes('Cancel')"
    >
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="language-outline" class="text-xl"></ion-icon>
        </span>
        <Dropdown
          :options="cancelReasons"
          optionDisabled="disabled"
          display="chip"
          :placeholder="$t('transportation.cancelReason.title')"
          v-model="selectedReason"
        >
          <template #value="valueProp">
            {{
              valueProp?.value?.translations[0]?.text ?? valueProp.placeholder
            }}
          </template>
          <template #option="slotProps">
            <p>
              {{ slotProps?.option?.translations[0]?.text }}
            </p>
          </template>
        </Dropdown>
      </div>
    </div>
    <div
      class="flex flex-column justify-content-center"
      v-if="
        selectedTaskStatus == 'End' &&
        props.taskDetail?.taskType == 'WithOutDestination'
      "
    >
      <Button
        :label="$t('transportation.tasks.manageTask.drawRoute')"
        class="p-button-info"
        icon="pi pi-pencil"
        @click="openDialog"
      />
    </div>
    <div class="h-full w-full flex justify-content-end align-items-end -mb-8">
      <Button label="submit" icon="pi pi-check" @click="submit" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TaskManagerService, TaskStatusEnum } from "@/backend/transport";
import { CancelReasonStore } from "@/views/transportation/cancelReason/cancelReasonStore";
import { useDialog } from "primevue/usedialog";
import DrawRoute from "./drawRoute.vue";
import { useI18n } from "vue-i18n";
import { toastStore } from "@/stores/common/toastStore";

const props = defineProps(["taskDetail"]);
const cancelReasonStore = CancelReasonStore();

const cancelReasons = ref(cancelReasonStore.cancelReason);

const taskStatuses = Object.keys(TaskStatusEnum).map(
  (key) => TaskStatusEnum[key]
);
onMounted(async () => {
  await cancelReasonStore.getAllCancelReasonIfEmpty();
  cancelReasons.value = cancelReasonStore.cancelReason;
});
const actions = ref(taskStatuses);
const selectedTaskStatus = ref(props.taskDetail?.tripStatus);
const selectedReason = ref();
const dialog = useDialog();
const { t } = useI18n();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let dialogRef;

function openDialog() {
  dialogRef = dialog.open(DrawRoute, {
    data: props.taskDetail,
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.cancelReason.title`),
      }),
      breakpoints: {
        "5000px": "65vw",
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
async function submit() {
  TaskManagerService.manageTask({
    requestId: props.taskDetail.requestId,
    requestBody: {
      status: selectedTaskStatus.value as TaskStatusEnum,
      cancelReasonId: selectedReason.value?.id,
    },
  }).then(() => {
    localStorage.setItem(
      "controlCurrentTaskDetailStatus",
      selectedTaskStatus.value
    );
    const toast = toastStore();
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("task_update_success"),
      type: "success",
    });
  });
}
</script>
