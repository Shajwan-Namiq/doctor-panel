<template>
  <Splitter
    class="p-4 flex flex-col justify-content-center align-items-center penaltyModal"
    :style="`${showHightPenalty ? 'height: 600px' : 'height: 400px'}`"
    layout="vertical"
  >
    <SplitterPanel class="w-full">
      <div class="col-12 grid">
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="lock-closed-outline" class="text-xl"></ion-icon>
            </span>
            <Dropdown
              :options="roles"
              optionDisabled="disabled"
              display="chip"
              :placeholder="$t('transportation.reports.isCloser.title')"
              v-model="cancellationPolicy.cancellerRole"
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
      </div>
    </SplitterPanel>

    <!-- low penalty  -->
    <SplitterPanel class="w-full">
      <h3>
        {{
          $t("transportation.taskCancellationPenalize.penaltyType.lowPenalty")
        }}
      </h3>
      <div class="col-12 grid">
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <Dropdown
              :options="measurementTypes"
              optionDisabled="disabled"
              display="chip"
              :placeholder="
                $t('transportation.taskCancellationPenalize.measurementType')
              "
              v-model="cancellationPolicy.measurements[0].measurementType"
            >
              <template #value="valueProp">
                {{
                  !cancellationPolicy.measurements[0].measurementType &&
                  submittedForm
                    ? "does not exist"
                    : valueProp.value ?? valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <Dropdown
              :options="penalizes"
              optionDisabled="disabled"
              display="chip"
              :placeholder="
                $t('transportation.taskCancellationPenalize.penalizeType')
              "
              v-model="selectedLowPenalize"
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
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <span class="p-float-label">
              <InputNumber
                autofocus
                id="inputgroup"
                type="number"
                v-model="cancellationPolicy.measurements[0].measurementValue"
              />
              <label for="inputgroup">{{
                !cancellationPolicy.measurements[0].measurementValue &&
                submittedForm
                  ? "niaa"
                  : $t(
                      "transportation.taskCancellationPenalize.measurementValue"
                    )
              }}</label>
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-content-end" v-if="!showHightPenalty">
        <Button
          @click="
            () => {
              showHightPenalty = true;
            }
          "
          >{{
            $t(
              "transportation.taskCancellationPenalize.measurementButtons.addNew"
            )
          }}</Button
        >
      </div>
    </SplitterPanel>
    <!-- high penalty  -->
    <SplitterPanel class="w-full" v-if="showHightPenalty">
      <h3>
        {{
          $t("transportation.taskCancellationPenalize.penaltyType.highPenalty")
        }}
      </h3>
      <div class="col-12 grid">
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <Dropdown
              :options="measurementTypes"
              optionDisabled="disabled"
              display="chip"
              :placeholder="
                $t('transportation.taskCancellationPenalize.measurementType')
              "
              v-model="cancellationPolicy.measurements[1].measurementType"
            >
              <template #value="valueProp">
                {{
                  !cancellationPolicy.measurements[1].measurementType &&
                  submittedForm
                    ? "niaa"
                    : valueProp.value ?? valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <Dropdown
              :options="penalizes"
              optionDisabled="disabled"
              display="chip"
              :placeholder="
                $t('transportation.taskCancellationPenalize.penalizeType')
              "
              v-model="selectedHighPenalize"
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
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"> </span>
            <span class="p-float-label">
              <InputNumber
                autofocus
                id="inputgroup"
                type="number"
                v-model="cancellationPolicy.measurements[1].measurementValue"
              />
              <label for="inputgroup">{{
                !cancellationPolicy.measurements[1].measurementValue &&
                submittedForm
                  ? "niaa"
                  : $t(
                      "transportation.taskCancellationPenalize.measurementValue"
                    )
              }}</label>
            </span>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-content-end">
        <div class="mx-2" v-if="showHightPenalty">
          <Button
            @click="
              () => {
                showHightPenalty = false;
              }
            "
            class="p-button-secondary"
            >{{
              $t(
                "transportation.taskCancellationPenalize.measurementButtons.addOne"
              )
            }}</Button
          >
        </div>
      </div>
    </SplitterPanel>
  </Splitter>
  <div class="flex justify-content-end mt-3 px-5">
    <Button
      v-can="[PolicyType.WRITE_TASK_CANCELLATION_POLICY]"
      @click="addCancellationPolicy"
      :loading="requestStatusStore.loading"
    >
      <i class="pi pi-check-circle mr-2" style="font-size: 1rem"></i
      >{{ $t("buttons.submit") }}</Button
    >
  </div>
</template>
<script lang="ts" setup>
import {
  TaskCancellationPolicyMeasurementType,
  TaskCancellationPenalizeService,
  TaskCancellationPenaltyType,
  TaskCancellationPolicyService,
  type CreateUpdateTaskCancellationPolicyMeasurementRequest,
  PolicyType,
  RoleType,
  TaskCancellationPenalizeType,
} from "@/backend/transport";
import { ref, onMounted, inject, onUnmounted, watch } from "vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { requestStatus } from "@/stores/common/requestStatus";

const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();

const requestStatusStore = requestStatus();

const roles = Object.keys(RoleType).map((key) => RoleType[key]);

const penalizes = Object.keys(TaskCancellationPenalizeType).map(
  (key) => TaskCancellationPenalizeType[key]
);

const cancellationPolicy = ref<any>({
  cancellerRole: RoleType.SERVANT,
  measurements: [
    {
      measurementType: undefined,
      measurementValue: undefined,
      penalizeId: undefined,
      penalize: undefined,
      penaltyType: TaskCancellationPenaltyType.LOW_PENALTY,
    },
    {
      measurementType: undefined,
      measurementValue: undefined,
      penalizeId: undefined,
      penalize: undefined,
      penaltyType: TaskCancellationPenaltyType.HIGH_PENALTY,
    },
  ],
});
const submittedForm = ref<boolean>(false);

const measurementTypes = Object.keys(TaskCancellationPolicyMeasurementType).map(
  (key) => TaskCancellationPolicyMeasurementType[key]
);
const showHightPenalty = ref<boolean>(false);
const selectedLowPenalize = ref(null);
const selectedHighPenalize = ref(null);

watch(
  selectedLowPenalize,
  async (newVal) => {
    if (newVal) {
      const response = await TaskCancellationPenalizeService.getPenalizes({
        penalizeType: newVal,
      });
      if (response && response.length > 0) {
        const updatedPenalize = response[0];
        const index = cancellationPolicy.value.measurements.findIndex(
          (m) => m.penaltyType === TaskCancellationPenaltyType.LOW_PENALTY
        );
        if (index !== -1) {
          cancellationPolicy.value.measurements[index] = {
            ...cancellationPolicy.value.measurements[index],
            penalizeId: updatedPenalize.id,
            penalize: updatedPenalize,
          };
        }
      }
    }
  },
  { immediate: true }
);

watch(
  selectedHighPenalize,
  async (newVal) => {
    if (newVal) {
      const response = await TaskCancellationPenalizeService.getPenalizes({
        penalizeType: newVal,
      });
      if (response && response.length > 0) {
        const updatedPenalize = response[0];
        const index = cancellationPolicy.value.measurements.findIndex(
          (m) => m.penaltyType === TaskCancellationPenaltyType.HIGH_PENALTY
        );
        if (index !== -1) {
          cancellationPolicy.value.measurements[index] = {
            ...cancellationPolicy.value.measurements[index],
            penalizeId: updatedPenalize.id,
            penalize: updatedPenalize,
          };
        }
      }
    }
  },
  { immediate: true }
);

onMounted(async () => {
  const policyData = dialogRef.value?.options?.data?.policyData;

  if (policyData) {
    cancellationPolicy.value = policyData;

    policyData.measurements.forEach((measurement) => {
      if (measurement.penaltyType === TaskCancellationPenaltyType.LOW_PENALTY) {
        selectedLowPenalize.value = measurement.penalize?.penalizeType;
      } else if (
        measurement.penaltyType === TaskCancellationPenaltyType.HIGH_PENALTY
      ) {
        selectedHighPenalize.value = measurement.penalize?.penalizeType;
      }
    });

    showHightPenalty.value = policyData.measurements.length > 1;
  }
});

async function addCancellationPolicy() {
  submittedForm.value = true;
  const measurements = showHightPenalty.value
    ? cancellationPolicy.value.measurements
    : [cancellationPolicy.value.measurements[0]];

  for (const data of measurements) {
    if (!data.measurementType || !data.measurementValue || !data.penalize) {
      return;
    }
  }
  await TaskCancellationPolicyService.updatePolicy({
    id: cancellationPolicy.value.id,
    requestBody: {
      cancellerRole: cancellationPolicy.value.cancellerRole,
      measurements: measurements.map((x: any) => ({
        measurementType: x.measurementType,
        measurementValue: x.measurementValue,
        penalizeId: x.penalize?.id,
        penaltyType: x.penaltyType,
      })) as CreateUpdateTaskCancellationPolicyMeasurementRequest[],
    },
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.common.name"),
      }),
      type: "success",
    });
    dialogRef.value.options.emits.onPolicyUpdated();
    dialogRef.value.close();
  });
}

onUnmounted(() => {
  cancellationPolicy.value = dialogRef.value?.options?.data?.policyData;
  if (cancellationPolicy.value.measurements[1].measurementType === undefined) {
    cancellationPolicy.value.measurements.pop();
  }
});
</script>
<style>
.p-splitter-gutter {
  width: 100% !important;
  margin: 10px 0;
}
.penaltyModal {
  transition: height 0.5s;
  overflow-y: hidden;
}
</style>
