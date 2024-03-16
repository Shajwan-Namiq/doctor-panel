<template>
  <div class="p-4 flex flex-col justify-content-center align-items-center">
    <div class="w-full">
      <div class="grid my-2 py-4">
        <div class="col-12 md:col-6 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="language-outline" class="text-xl"></ion-icon>
            </span>
            <Dropdown
              :options="actions"
              optionDisabled="disabled"
              display="chip"
              :placeholder="$t('transportation.reports.reportAction.title')"
              v-model="selectedAction"
              :class="{
                'p-invalid': v$.actionId.$invalid && submittedForm,
              }"
            >
              <template #value="valueProp">
                {{
                  v$.actionId.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: valueProp.placeholder,
                      })
                    : valueProp.value
                    ? valueProp.value?.translations[0]?.name
                    : valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>
                  <ion-icon
                    name="lock-closed-outline"
                    v-if="slotProps.option.isCloser"
                  ></ion-icon>
                  <ion-icon name="lock-open-outline" v-else></ion-icon>
                  {{ slotProps.option?.translations[0]?.name }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="col-12 mb-4">
          <div class="p-inputgroup p-invalid">
            <span class="p-float-label">
              <Textarea
                id="inputgroup"
                type="text"
                v-model="addActionData.comment"
                rows="5"
              />
              <label for="inputgroup">{{
                $t("transportation.common.description")
              }}</label>
            </span>
          </div>
        </div>
        <div class="flex justify-content-end w-full">
          <Button
            :label="$t('buttons.add')"
            class="p-button-primary"
            @click="addAction"
            :loading="requestStatusStore.loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import Textarea from "primevue/textarea";
import { useI18n } from "vue-i18n";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  type TaskReportActionDto,
  TaskReportActionService,
  TaskReportService,
} from "@/backend/transport";
import { toastStore } from "@/stores/common/toastStore";
import { requestStatus } from "@/stores/common/requestStatus";

const dialogRef: any = inject("dialogRef");
const { t } = useI18n();
const toast = toastStore();
const requestStatusStore = requestStatus();

const actions = ref<TaskReportActionDto[]>([]);
const selectedAction = ref<TaskReportActionDto>();
const submittedForm = ref(false);
const addActionData = ref({
  comment: "",
  actionId: 0,
});
const rule = {
  actionId: { required },
};
const v$ = useVuelidate(rule, addActionData);
onMounted(() => {
  getActions();
});
async function getActions() {
  await TaskReportActionService.getTaskActions().then((response) => {
    actions.value = response;
  });
}
function addAction() {
  submittedForm.value = true;
  if (v$.value.$invalid) return;
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  addActionData.value.actionId = selectedAction.value?.id!;
  TaskReportService.updateTaskReport({
    id: dialogRef.value.data.id,
    requestBody: addActionData.value,
  }).then(() => {
    dialogRef.value.close();
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.common.name"),
      }),
      type: "success",
    });
    dialogRef.value.options.emits.onAddReportProblem();
  });
}
</script>
