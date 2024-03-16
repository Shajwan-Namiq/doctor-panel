<template>
  <div class="page-style">
    <div class="page-container">
      <DataTable
        class="cardTable"
        :value="penalizes"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
      >
        <template #header>
          <div
            class="table-header flex justify-content-between align-items-center"
          >
            {{ $t("transportation.taskCancellationPenalize.penalizeType") }}

            <Button
              @click="openDialog"
              v-can="[PolicyType.WRITE_TASK_CANCELLATION_PENALIZE]"
            >
              <i class="pi pi-plus mr-2" style="font-size: 1rem"></i
              >{{
                $t("buttons.add_field", {
                  field: $t(
                    "transportation.taskCancellationPenalize.penalizeType"
                  ),
                })
              }}</Button
            >
          </div>
        </template>

        <Column
          :header="$t('transportation.taskCancellationPenalize.penalizeType')"
        >
          <template #body="slotProps">
            {{ slotProps.data.penalizeType }}
          </template>
        </Column>
        <Column :header="$t('transportation.common.name')">
          <template #body="slotProps">
            {{
              slotProps.data.translations
                ? slotProps.data.translations[0]?.name
                : ""
            }}
          </template>
        </Column>
        <Column :header="$t('transportation.common.description')">
          <template #body="slotProps">
            {{ slotProps.data.value }}
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-info"
              class="p-button-primary mb-4 addButton"
              @click="openDetailDialog(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-danger mb-4"
              @click="openDeleteDialog(slotProps.data)"
              v-can="[PolicyType.DELETE_TASK_CANCELLATION_PENALIZE]"
            />
          </template>
        </Column>
        <template #footer> </template>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  TaskCancellationPenalizeService,
  type TaskCancellationPenalizeDto,
  PolicyType,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
import AddPenalizeComponent from "./addPenalize.vue";
import PenalizeDetail from "./penalizeDetail.vue";
import { useConfirm } from "primevue/useconfirm";
import { toastStore } from "@/stores/common/toastStore";

const penalizes = ref<TaskCancellationPenalizeDto[]>();

const requestStatusStore = requestStatus();
const dialog = useDialog();
const toast = toastStore();
const { t } = useI18n();
const confirm = useConfirm();

onMounted(async () => {
  await getPenalizes();
});

function openDialog() {
  dialog.open(AddPenalizeComponent, {
    emits: {
      onAddNewPenalize: () => {
        getPenalizes();
      },
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.taskCancellationPenalize.penalizeType`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "1300px": "70vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
function openDeleteDialog(data) {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t("transportation.taskCancellationPenalize.penalizeType"),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deletePenalize(data.id!);
    },
  });
}
async function deletePenalize(penalizeId: number) {
  await TaskCancellationPenalizeService.deletePenalize({
    id: penalizeId,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.delete_success_header"),
      summary: t("toasts.delete_success_desc", {
        field: t("transportation.taskCancellationPenalize.penalizeType"),
      }),
      type: "success",
    });
    getPenalizes();
  });
}
function openDetailDialog(penalize) {
  dialog.open(PenalizeDetail, {
    emits: {
      onUpdatePenalize: () => {
        getPenalizes();
      },
    },
    data: {
      penalizeData: penalize,
    },
    props: {
      header: t("reusables.dialog.edit", {
        field: t(`transportation.taskCancellationPenalize.penalizeType`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "1300px": "70vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

async function getPenalizes() {
  await TaskCancellationPenalizeService.getPenalizes({}).then((response) => {
    penalizes.value = response;
  });
}
</script>
