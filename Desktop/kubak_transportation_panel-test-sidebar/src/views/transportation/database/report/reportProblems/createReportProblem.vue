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
                :options="roles"
                optionDisabled="disabled"
                display="chip"
                :placeholder="$t('fields.role')"
                v-model="selectedRole"
                :class="{
                  'p-invalid': v$.language.$invalid && addedNewLanguage,
                }"
              >
                <template #value="valueProp">
                  {{
                    !selectedRole && addedNewLanguage
                      ? $t("validationMessages.required", {
                          field: valueProp.placeholder,
                        })
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
        </div>
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
                v-model="selectedReportProblemLanguage.title"
                :class="{
                  'p-invalid': v$.title.$invalid && addedNewLanguage,
                }"
              />
              <label for="inputgroup">{{
                v$.title.$invalid && addedNewLanguage
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
              v-model="selectedReportProblemLanguage.language"
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
        <div class="col-12 mb-4">
          <div class="p-inputgroup p-invalid">
            <span class="p-float-label">
              <Textarea
                id="inputgroup"
                type="text"
                v-model="selectedReportProblemLanguage.description"
                rows="5"
                :class="{ 'p-invalid': invalidData.descriptionLength }"
              />
              <label for="inputgroup">{{
                invalidData.descriptionLength
                  ? $t("validationMessages.language_description")
                  : $t("transportation.serviceType.description")
              }}</label>
            </span>
          </div>
        </div>

        <div class="flex justify-content-end align-items-center w-full">
          <Button
            label="add new language"
            icon="pi pi-plus"
            class="p-button-secondary"
            @click="addReportProblemLanguage"
          />
        </div>
      </div>
      <div class="mt-4" v-if="reportProblemLanguages.length > 0">
        <div>
          <DataTable :value="reportProblemLanguages" responsiveLayout="scroll">
            <Column
              field="language.title"
              :header="$t('auth.language.languageTitle')"
            ></Column>
            <Column
              field="title"
              :header="$t('transportation.common.name')"
            ></Column>
            <Column
              field="description"
              :header="$t('transportation.common.description')"
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
          :label="$t('buttons.submit')"
          @click="addReportProblem"
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
import Textarea from "primevue/textarea";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Message from "primevue/message";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { RoleType, TaskReportDefinedProblemService } from "@/backend/transport";
// import { BaseRole } from "@/backend/transport";

const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();

interface reportProblemLanguageType {
  language?: {
    id?: number;
    title: Language;
    disabled: boolean;
  };
  title?: string;
  description?: string;
}
const invalidData = ref({
  language: false,
  descriptionLength: false,
});
const languages = Object.keys(Language).map((key) => Language[key]);
const roles = Object.keys(RoleType).map((key) => RoleType[key]);


const requestStatusStore = requestStatus();
const selectedReportProblemLanguage = ref<reportProblemLanguageType>({
  language: undefined,
  title: undefined,
  description: undefined,
});
const addedNewLanguage = ref(false);
const reportProblemLanguages = ref<reportProblemLanguageType[]>([]);

const rule = {
  language: { required },
  title: { required },
};
const selectedRole = ref<RoleType>();
const v$ = useVuelidate(rule, selectedReportProblemLanguage as any);

function filterLanguages() {
  return languages?.map((language) => ({
    title: language,
    disabled: checkLanguage(language),
  }));
}
function checkLanguage(language) {
  const index = reportProblemLanguages.value.findIndex(
    (reportProblemLanguage) => reportProblemLanguage.language?.title == language
  );
  return index >= 0 ? true : undefined;
}
async function addReportProblemLanguage() {
  addedNewLanguage.value = true;
  if (v$.value.$invalid) return;
  invalidData.value.descriptionLength = selectedReportProblemLanguage.value
    .description
    ? selectedReportProblemLanguage.value.description?.length < 3
    : true;
  if (invalidData.value.descriptionLength) {
    return;
  }
  reportProblemLanguages.value.push(selectedReportProblemLanguage.value);

  selectedReportProblemLanguage.value = {
    language: undefined,
    title: undefined,
    description: undefined,
  };
  addedNewLanguage.value = false;
}
async function addReportProblem() {
  const index = reportProblemLanguages.value.findIndex(
    (problemLanguage) => problemLanguage.language?.title == Language.EN
  );
  if (index < 0) {
    invalidData.value.language = true;
    return;
  }
  invalidData.value.language = false;
  const newProblemData: any = [];
  for (const reportProblem of reportProblemLanguages.value) {
    newProblemData.push({
      language: reportProblem.language?.title ?? Language.EN,
      name: reportProblem.title!,
      description: reportProblem.description!,
    });
  }
  await TaskReportDefinedProblemService.createTaskReportDefiledProblem({
    requestBody: {
      role: selectedRole.value!,
      translations: newProblemData,
    },
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.common.name"),
      }),
      type: "success",
    });
    dialogRef.value.options.emits.onAddReportProblem();
  });

  dialogRef.value.close();
}
function deleteCountryLanguage(data) {
  reportProblemLanguages.value!.splice(data.index, 1);
}
</script>
