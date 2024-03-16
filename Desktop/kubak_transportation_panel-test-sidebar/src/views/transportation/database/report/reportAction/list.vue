<template>
  <div class="page-style">
    <div class="page-container">
      <DataTable
        class="cardTable"
        :value="reportActions"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
      >
        <template #header>
          <div
            class="table-header flex justify-content-between align-items-center"
          >
            {{ $t("transportation.reports.reportActionTitle") }}
            <Button @click="openDialog">{{
              $t("buttons.add_field", {
                field: $t("transportation.reports.reportActionTitle"),
              })
            }}</Button>
          </div>
        </template>

        <Column :header="$t('transportation.common.description')">
          <template #body="slotProps">
            {{
              slotProps.data.translations
                ? slotProps.data.translations[0]?.name
                : ""
            }}
          </template>
        </Column>
        <Column :header="$t('transportation.reports.isCloser.title')">
          <template #body="slotProps">
            {{
              $t(`transportation.reports.isCloser.${slotProps.data.isCloser}`)
            }}
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
              @click="confirmDeleteReportProblem(slotProps.data)"
              v-can="[PolicyType.DELETE_TASK_REPORT_ACTION]"
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
  PolicyType,
  TaskReportActionService,
  type TaskReportDefinedProblemDto,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
import CreateReportAction from "./createReportAction.vue";
import ReportProblemDetail from "./reportActionDetail.vue";
import { useConfirm } from "primevue/useconfirm";

const reportActions = ref<TaskReportDefinedProblemDto[]>();
const requestStatusStore = requestStatus();
const dialog = useDialog();
const { t } = useI18n();
const confirm = useConfirm();

onMounted(async () => {
  await getReportProblems();
});

function openDialog() {
  dialog.open(CreateReportAction, {
    emits: {
      onAddReportProblem: () => {
        getReportProblems();
      },
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.reports.reportProblemsTitle`),
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
function openDetailDialog(reportProblem) {
  dialog.open(ReportProblemDetail, {
    emits: {
      onUpdateReportProblem: () => {
        getReportProblems();
      },
    },
    data: {
      reportProblemData: reportProblem,
    },
    props: {
      header: t("reusables.dialog.edit", {
        field: t(`transportation.reports.reportProblemsTitle`),
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

async function getReportProblems() {
  await TaskReportActionService.getTaskActions().then((response) => {
    reportActions.value = response;
  });
}
const confirmDeleteReportProblem = (data) => {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t(`transportation.reports.reportProblemsTitle`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deleteReportProblem(data.id!);
    },
  });
};
async function deleteReportProblem(id: number) {
  TaskReportActionService.deleteTaskAction({ id }).then(() => {
    getReportProblems();
  });
}
</script>
