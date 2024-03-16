<template>
  <div class="p-4 flex flex-col justify-content-center align-items-center">
    <div class="w-full">
      <div class="grid my-2 py-4">
        <div class="col-12 grid">
          <div class="col-12 md:col-6 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="language-outline" class="text-xl"></ion-icon>
              </span>
              <Dropdown
                :options="penalizeTypes"
                optionDisabled="disabled"
                display="chip"
                :placeholder="
                  $t('transportation.taskCancellationPenalize.penalizeType')
                "
                v-model="newPenalizeData.penalizeType"
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
              <span class="p-inputgroup-addon">
                <ion-icon name="ban-outline" class="text-xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  autofocus
                  id="inputgroup"
                  type="number"
                  v-model="newPenalizeData.value"
                  :class="{
                    'p-invalid': !newPenalizeData.value && submittedForm,
                  }"
                />
                <label for="inputgroup">{{
                  !newPenalizeData.value && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t(
                          "transportation.taskCancellationPenalize.value"
                        ),
                      })
                    : $t("transportation.taskCancellationPenalize.value")
                }}</label>
              </span>
            </div>
          </div>
        </div>
        <div class="col-12 grid">
          <div class="col-12 md:col-6 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="text-outline" class="text-xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputText
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="selectedPenalizeLanguage.text"
                  :class="{
                    'p-invalid': v$.text.$invalid && addedNewLanguage,
                  }"
                />
                <label for="inputgroup">{{
                  v$.text.$invalid && addedNewLanguage
                    ? $t("validationMessages.required", {
                        field: $t("transportation.common.name"),
                      })
                    : $t("transportation.common.name")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="language-outline" class="text-xl"></ion-icon>
              </span>
              <Dropdown
                :options="filterLanguages()"
                optionDisabled="disabled"
                display="chip"
                :placeholder="$t('auth.language.languageTitle')"
                v-model="selectedPenalizeLanguage.language"
                :class="{
                  'p-invalid': v$.language.$invalid && addedNewLanguage,
                }"
              >
                <template #value="valueProp">
                  {{
                    v$.language.$invalid && addedNewLanguage
                      ? $t("validationMessages.required", {
                          field: valueProp.placeholder,
                        })
                      : valueProp.value?.title ?? valueProp.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <p>
                    {{ slotProps.option?.title }}
                  </p>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="flex justify-content-end align-items-center w-full">
          <Button
            :label="$t('buttons.addNewLanguage')"
            icon="pi pi-plus"
            class="p-button-secondary"
            @click="addPenalizeLanguage"
          />
        </div>
      </div>
      <div class="mt-4" v-if="penalizeLanguages.length > 0">
        <div>
          <DataTable :value="penalizeLanguages" responsiveLayout="scroll">
            <Column
              field="language.title"
              :header="$t('auth.language.languageTitle')"
            ></Column>
            <Column
              field="text"
              :header="$t('transportation.common.name')"
            ></Column>

            <Column :exportable="false" style="width: 10rem; text-align: end">
              <template #body="slotProps">
                <Button
                  icon="pi pi-times"
                  class="p-button-danger"
                  @click="deleteCountryLanguage(slotProps)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <Message severity="error" v-if="invalidData.language">
        {{ $t("validationMessages.language") }}
      </Message>
      <div class="pt-4 flex justify-content-end">
        <Button
          icon="pi pi-check-circle mr-2"
          :label="$t('buttons.submit')"
          @click="addNewPenalize"
          :loading="requestStatusStore.loading"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { inject, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { Language } from "@/backend/auth/models/Language";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Message from "primevue/message";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  type CreateUpdateTaskCancellationPenalizeRequest,
  TaskCancellationPenalizeType,
  type TranslationRequest,
  TaskCancellationPenalizeService,
} from "@/backend/transport";

const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();

const penalizeTypes = Object.keys(TaskCancellationPenalizeType).map(
  (key) => TaskCancellationPenalizeType[key]
);
const newPenalizeData = ref<CreateUpdateTaskCancellationPenalizeRequest>({
  penalizeType: TaskCancellationPenalizeType.BALANCE_PENALIZE,
  value: 0,
  translations: undefined,
});
interface penalizeLanguageType {
  language?: {
    id?: number;
    title: Language;
    disabled: boolean;
  };
  text?: string;
}
const invalidData = ref({
  language: false,
});
const submittedForm = ref(false);
const languages = Object.keys(Language).map((key) => Language[key]);
const requestStatusStore = requestStatus();
const selectedPenalizeLanguage = ref<penalizeLanguageType>({
  language: undefined,
  text: undefined,
});
const addedNewLanguage = ref(false);
const penalizeLanguages = ref<penalizeLanguageType[]>([]);

const rule = {
  language: { required },
  text: { required },
};
const v$ = useVuelidate(rule, selectedPenalizeLanguage as any);

function filterLanguages() {
  return languages?.map((language) => ({
    title: language,
    disabled: checkLanguage(language),
  }));
}
function checkLanguage(language) {
  const index = penalizeLanguages.value.findIndex(
    (penalizeLanguage) => penalizeLanguage.language?.title == language
  );
  return index >= 0 ? true : undefined;
}
async function addPenalizeLanguage() {
  addedNewLanguage.value = true;
  if (v$.value.$invalid) return;

  penalizeLanguages.value.push(selectedPenalizeLanguage.value);

  selectedPenalizeLanguage.value = {
    language: undefined,
    text: undefined,
  };
  addedNewLanguage.value = false;
}
async function addNewPenalize() {
  submittedForm.value = true;
  const index = penalizeLanguages.value.findIndex(
    (problemLanguage) => problemLanguage.language?.title == Language.EN
  );
  if (index < 0) {
    invalidData.value.language = true;
    return;
  }
  invalidData.value.language = false;
  newPenalizeData.value.translations = penalizeLanguages.value.map((x) => {
    const result = {
      text: x.text,
      language: x.language?.title,
    };
    return result as TranslationRequest;
  });
  await TaskCancellationPenalizeService.createPenalize({
    requestBody: newPenalizeData.value,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.common.name"),
      }),
      type: "success",
    });
    dialogRef.value.options.emits.onAddNewPenalize();
  });

  dialogRef.value.close();
}
function deleteCountryLanguage(data) {
  penalizeLanguages.value!.splice(data.index, 1);
}
</script>
