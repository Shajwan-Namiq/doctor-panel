<template>
  <div class="page-style">
    <div class="page-container">
      <DataTable
        class="cardTable"
        :value="policies"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
      >
        <template #header>
          <div
            class="table-header flex justify-content-between align-items-center"
          >
            {{ $t("transportation.taskCancellationPenalize.policy") }}

            <Button
              v-can="[PolicyType.WRITE_TASK_CANCELLATION_POLICY]"
              @click="openDialog"
            >
              <i class="pi pi-plus mr-2" style="font-size: 1rem"></i
              >{{
                $t("buttons.add_field", {
                  field: $t("transportation.taskCancellationPenalize.policy"),
                })
              }}</Button
            >
          </div>
        </template>

        <Column
          :header="$t('transportation.taskCancellationPenalize.cancellerRole')"
        >
          <template #body="slotProps">
            {{ slotProps.data.cancellerRole }}
          </template>
        </Column>
        <Column
          :header="$t('transportation.taskCancellationPenalize.penalizeType')"
        >
          <template #body="slotProps">
            <div class="my-2">
              <div
                :class="`penaltyType ${slotProps.data.measurements[0]?.penaltyType}`"
              >
                {{ slotProps.data.measurements[0]?.penaltyType }}
              </div>
              <div
                :class="`penaltyType ${slotProps.data.measurements[1]?.penaltyType} mt-5`"
                v-if="slotProps.data.measurements[1]"
              >
                {{ slotProps.data.measurements[1]?.penaltyType }}
              </div>
            </div>
          </template>
        </Column>
        <Column
          :header="
            $t('transportation.taskCancellationPenalize.measurementType')
          "
        >
          <template #body="slotProps">
            <div class="my-2">
              {{ slotProps.data.measurements[0]?.measurementType }}
              <div class="mt-5" v-if="slotProps.data.measurements[1]">
                {{ slotProps.data.measurements[1]?.measurementType }}
              </div>
            </div>
          </template>
        </Column>

        <Column
          :header="
            $t('transportation.taskCancellationPenalize.measurementValue')
          "
        >
          <template #body="slotProps">
            <div class="my-2">
              {{ slotProps?.data?.measurements[0]?.measurementValue }}
              <div class="mt-5" v-if="slotProps?.data?.measurements[1]">
                {{ slotProps?.data?.measurements[1]?.measurementValue }}
              </div>
            </div>
          </template>
        </Column>
        <Column
          :header="$t('transportation.taskCancellationPenalize.penalizeType')"
        >
          <template #body="slotProps">
            <div class="my-2">
              {{ slotProps?.data?.measurements[0]?.penalize?.penalizeType }}
              <div class="mt-5" v-if="slotProps.data.measurements[1]">
                {{ slotProps?.data?.measurements[1]?.penalize?.penalizeType }}
              </div>
            </div>
          </template>
        </Column>
        <Column
          :header="$t('transportation.taskCancellationPenalize.penalizeName')"
        >
          <template #body="slotProps">
            <div class="my-2">
              {{
                slotProps?.data?.measurements[0]?.penalize.translations[0]?.name
              }}
              <div class="mt-5" v-if="slotProps.data.measurements[1]">
                {{
                  slotProps?.data?.measurements[1]?.penalize?.translations[0]
                    ?.name
                }}
              </div>
            </div>
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
              v-can="[PolicyType.DELETE_TASK_CANCELLATION_POLICY]"
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
  TaskCancellationPolicyService,
  type TaskCancellationPenalizeDto,
  type TaskCancellationPolicyDto,
  PolicyType,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
import addCancellationPolicy from "./addCancellationPolicy.vue";
import CancellationPolicyDetail from "./cancellationPolicyDetail.vue";
import { useConfirm } from "primevue/useconfirm";

const penalizes = ref<TaskCancellationPenalizeDto[]>();
const policies = ref<TaskCancellationPolicyDto[]>();

const confirm = useConfirm();
const requestStatusStore = requestStatus();
const dialog = useDialog();
const { t } = useI18n();

onMounted(async () => {
  await getReportProblems();
});

function openDialog() {
  dialog.open(addCancellationPolicy, {
    emits: {
      onPolicy: () => {
        getReportProblems();
      },
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t("transportation.taskCancellationPenalize.policy"),
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
function openDetailDialog(policyData) {
  dialog.open(CancellationPolicyDetail, {
    emits: {
      onPolicyUpdated: () => {
        getReportProblems();
      },
    },
    data: {
      policyData: policyData,
    },
    props: {
      header: t("reusables.dialog.edit", {
        field: t("transportation.taskCancellationPenalize.policy"),
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
  await TaskCancellationPolicyService.getPolicies({}).then((response) => {
    policies.value = response;
  });
  await TaskCancellationPenalizeService.getPenalizes({}).then((response) => {
    penalizes.value = response;
  });
}
const confirmDeleteReportProblem = (data) => {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t("transportation.taskCancellationPenalize.policy"),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deletePolicy(data.id!);
    },
  });
};
async function deletePolicy(id: number) {
  await TaskCancellationPenalizeService.deletePenalize({
    id: id,
  });
  await getReportProblems();
}
</script>
<style lang="scss">
.penaltyType {
  height: 30px;
  width: 100px;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &.LowPenalty {
    background-color: #c8e6c995;
  }
  &.HightPenalty {
    background-color: #e6c8c895;
  }
}
</style>
