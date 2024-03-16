<template>
  <div class="page-style">
    <div class="page-container">
      <div class="w-full flex justify-content-end mb-5">
        <Button @click="gotoTaskPage">{{
          $t("transportation.tasks.taskDetail")
        }}</Button>
      </div>
      <Message severity="warn" class="mb-8" v-if="taskReport.isClosed">{{
        $t("transportation.reports.taskReport.reportClosed")
      }}</Message>
      <div class="grid">
        <div
          class="col-12 md:col-4 mb-4"
          v-for="(taskReportField, index) in Object.keys(taskReport)"
          :key="index"
        >
          <div class="p-inputgroup" v-if="taskReportField != 'isClosed'">
            <span class="p-float-label">
              <Textarea
                autofocus
                id="inputgroup"
                type="text"
                v-model="taskReport[taskReportField]"
                :disabled="true"
                v-if="taskReportField == 'comment'"
              />
              <InputText
                v-else
                autofocus
                id="inputgroup"
                type="text"
                v-model="taskReport[taskReportField]"
                :disabled="true"
                class=""
              />
              <label for="inputgroup">{{
                $t(`transportation.reports.taskReport.${taskReportField}`)
              }}</label>
            </span>
          </div>
        </div>
      </div>
      <DataTable
        class="cardTable"
        responsiveLayout="scroll"
        :lazy="true"
        :value="actionTaken"
      >
        <template #header>
          <div
            class="table-header flex justify-content-between align-items-center"
          >
            {{ $t("transportation.reports.reportAction.list") }}

            <Button
              @click="createActionModal"
              v-if="!taskReport.isClosed"
              v-can="[PolicyType.WRITE_TASK_REPORT]"
              >{{ $t("transportation.reports.taskReport.addAction") }}</Button
            >
          </div>
        </template>

        <Column
          :header="$t('transportation.reports.reportAction.panelUserName')"
        >
          <template #body="slotProps">
            {{ slotProps.data.panelUserName }}
          </template>
        </Column>
        <Column
          :header="
            $t('transportation.reports.reportAction.panelUserPhoneNumber')
          "
        >
          <template #body="slotProps">
            {{ slotProps.data.panelUserPhoneNumber }}
          </template>
        </Column>
        <Column :header="$t('transportation.reports.taskReport.comment')">
          <template #body="slotProps">
            {{ slotProps.data.comment }}
          </template>
        </Column>
        <Column :header="$t('transportation.reports.reportAction.title')">
          <template #body="slotProps">
            {{ slotProps.data.action?.translations[0]?.name }}
          </template>
        </Column>
        <Column :header="$t('fields.createdAt')">
          <template #body="slotProps">
            {{ moment(slotProps.data?.createdAt).format("DD/MM/YYYY") }}

            <div class="mt-1 mx-1">
              {{ moment(slotProps.data?.createdAt).format("HH:mm:ss") }}
            </div>
          </template>
        </Column>
        <template #footer> </template>
      </DataTable>
      <DataTable
        class="mt-8"
        responsiveLayout="scroll"
        :lazy="true"
        :value="problems"
      >
        <template #header>
          <div
            class="table-header flex justify-content-between align-items-center"
          >
            {{ $t("transportation.reports.reportProblemsTitle") }}
          </div>
        </template>

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
            {{
              slotProps.data.translations
                ? slotProps.data.translations[0]?.description
                : ""
            }}
          </template>
        </Column>
        <Column :header="$t('fields.role')">
          <template #body="slotProps">
            {{ slotProps.data.role }}
          </template>
        </Column>
        <template #footer> </template>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  TaskReportService,
  type TaskReportDefinedProblemDto,
  type TaskReportDetailedActionsTaken,
  PolicyType,
} from "@/backend/transport";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import { useI18n } from "vue-i18n";
import { useDialog } from "primevue/usedialog";
import AddActionModal from "./addActionModal.vue";
import moment from "moment";
import Message from "primevue/message";
// comment;
const route = useRoute();
const { t } = useI18n();
const dialog = useDialog();
const router = useRouter();

const taskReport = ref({
  taskId: 0,
  taskRandomId: 0,
  clientName: "",
  clientPhoneNumber: "",
  servantId: 0,
  servantName: "",
  servantNumber: "",
  // role: BaseRoleDto.SERVANT,
  role: "",
  comment: "",
  isClosed: false,
});
const actionTaken = ref<TaskReportDetailedActionsTaken[] | null>();
const problems = ref<TaskReportDefinedProblemDto[] | null>();

onMounted(() => {
  getReportDetail();
});

function getReportDetail() {
  TaskReportService.getTaskReportDetail({ id: +route.params.id }).then(
    (response) => {
      for (const field in taskReport.value) {
        taskReport.value[field] = response[field];
      }
      actionTaken.value = response.actionsTaken;
      problems.value = response.problems;
    }
  );
}
async function createActionModal() {
  dialog.open(AddActionModal, {
    data: { id: +route.params.id },
    emits: {
      onAddReportProblem: () => {
        getReportDetail();
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
function gotoTaskPage() {
  router.push({
    name: "detailTask",
    params: { id: taskReport.value.taskId },
  });
}
</script>
<style lang="scss">
.reportDetailPage {
  .p-message-close-icon {
    display: none !important;
  }
}
</style>
