<template>
  <div class="p-4">
    <Splitter layout="vertical">
      <SplitterPanel class="py-2">
        <div class="grid" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="text-outline" class="text-xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputText
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceBaseType.title"
                />
                <label for="inputgroup">{{
                  vs$.title.$invalid && submittedValue
                    ? $t("validationMessages.required", {
                        fields: $t("transportation.services.serviceType"),
                      })
                    : $t("transportation.services.serviceType")
                }}</label>
              </span>
            </div>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel class="pt-4">
        <div class="grid pt-4" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="language-outline" class="text-xl"></ion-icon>
              </span>
              <Dropdown
                :options="filterLanguages()"
                optionDisabled="disabled"
                display="chip"
                :placeholder="
                  v$.language.$invalid && submittedTypeLanguage
                    ? $t('validationMessages.required', {
                        field: $t('auth.language.languageTitle'),
                      })
                    : $t('auth.language.languageTitle')
                "
                v-model="newTypeLanguage.language"
                :class="{
                  'p-invalid': v$.language.$invalid && submittedTypeLanguage,
                }"
              >
                <template #value="valueProp">
                  {{ valueProp.value?.title ?? valueProp.placeholder }}
                </template>
                <template #option="slotProps">
                  <p>
                    {{ slotProps.option?.title }}
                  </p>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="text-outline" class="text-xl"></ion-icon>
              </span>
              <InputText
                :placeholder="
                  v$.title.$invalid && submittedTypeLanguage
                    ? $t('validationMessages.required', {
                        field: $t('fields.title'),
                      })
                    : $t('fields.title')
                "
                autofocus
                id="inputgroup"
                type="text"
                v-model="newTypeLanguage.title"
                :class="{
                  'p-invalid': v$.title.$invalid && submittedTypeLanguage,
                }"
              />
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <Button
              icon="pi pi-plus"
              class="p-button-secondary"
              @click="addNewTypeLanguage"
            />
          </div>
        </div>
        <div
          class="w-8 mt-4"
          v-if="serviceBaseType?.serviceBaseTypeLanguages?.length! > 0"
        >
          <div>
            <DataTable
              :value="serviceBaseType?.serviceBaseTypeLanguages!"
              responsiveLayout="scroll"
            >
              <Column
                field="language"
                :header="$t('auth.language.languageTitle')"
              >
              </Column>
              <Column field="title" :header="$t('auth.language.title')">
              </Column>
              <Column :exportable="false" style="width: 10rem; text-align: end">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-times"
                    class="p-button-danger"
                    @click="deleteBaseTypeLanguage(slotProps)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <div class="flex justify-content-end">
          <Button
            :label="$t('buttons.submit')"
            @click="submitForm"
            :loading="requestStatusStore.loading"
          />
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>
<script lang="ts" setup>
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import useVuelidate from "@vuelidate/core";
import { Language, type CreateBaseTypeRequest } from "@/backend/transport";
import { ServiceStore } from "@/stores/common/service";
import { requestStatus } from "@/stores/common/requestStatus";

const requestStatusStore = requestStatus();
const languages = Object.keys(Language).map((key) => Language[key]);
const serviceStore = ServiceStore();

const serviceBaseType = ref<CreateBaseTypeRequest>(
  serviceStore.currentBaseTypeToEdit
);
const newTypeLanguage = ref<any>({
  title: undefined,
  language: { title: undefined },
});
const rule = {
  title: { required },
  language: { required },
};
const ruleService: any = {
  title: { required },
  serviceBaseTypeLanguages: { required },
};
const submittedValue = ref(false);
const submittedTypeLanguage = ref(false);

const v$ = useVuelidate(rule, newTypeLanguage);

const vs$ = useVuelidate(ruleService, serviceBaseType.value);

function addNewTypeLanguage() {
  submittedTypeLanguage.value = true;
  if (!v$.value.$invalid) {
    serviceBaseType.value?.serviceBaseTypeLanguages?.push({
      language: newTypeLanguage.value?.language?.title,
      title: newTypeLanguage?.value?.title,
    });
    serviceBaseType.value?.serviceBaseTypeLanguages?.push();
    submittedTypeLanguage.value = false;
    newTypeLanguage.value = { language: undefined, title: undefined };
  }
}

function deleteBaseTypeLanguage(data) {
  serviceBaseType.value?.serviceBaseTypeLanguages?.splice(data.index, 1);
}
function filterLanguages() {
  return languages?.map((language) => ({
    title: language,
    disabled: checkLanguage(language),
  }));
}
function checkLanguage(language) {
  const index = serviceBaseType?.value?.serviceBaseTypeLanguages?.findIndex(
    (countryLanguage) => countryLanguage.language == language
  );
  return index! >= 0 ? true : undefined;
}

function submitForm() {
  submittedValue.value = true;
  serviceStore.updateBaseType(serviceBaseType.value);
}
</script>
