<template>
  <div class="p-4 flex flex-col justify-content-center align-items-center">
    <div class="w-full">
      <div class="w-full flex justify-content-center">
        <div class="w-8rem h-8rem">
          <selectImage :circle="true" @selectImageFile="onImageSelected" />
        </div>
      </div>
      <div class="grid my-2 py-4">
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
                v-model="selectedServiceTypeLanguage.title"
              />
              <label for="inputgroup">{{
                $t("transportation.serviceType.title")
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
              v-model="selectedServiceTypeLanguage.language"
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
        <div class="col-12 mb-4">
          <div class="p-inputgroup p-invalid">
            <span class="p-float-label">
              <Textarea
                id="inputgroup"
                type="text"
                v-model="selectedServiceTypeLanguage.description"
                maxlength="50"
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
            @click="addServiceTypeLanguage"
          />
        </div>
      </div>
      <div class="mt-4" v-if="serviceTypeLanguages.length > 0">
        <div>
          <DataTable :value="serviceTypeLanguages" responsiveLayout="scroll">
            <Column
              field="language.title"
              :header="$t('auth.language.languageTitle')"
            ></Column>
            <Column
              field="title"
              :header="$t('transportation.serviceType.title')"
            ></Column>
            <Column
              field="description"
              :header="$t('transportation.serviceType.description')"
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
      <Message
        severity="error"
        v-if="invalidData.language || invalidData.image"
      >
        {{
          invalidData.image
            ? $t("validationMessages.required", { field: $t("fields.image") })
            : $t("validationMessages.language")
        }}
      </Message>
      <div class="pt-4 flex justify-content-end">
        <Button
          :label="$t('buttons.submit')"
          @click="addServiceType"
          :loading="requestStatusStore.loading"
          icon="pi pi-check-circle mr-2"
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
import selectImage from "@/components/selectImage.vue";
import Textarea from "primevue/textarea";
import type { CreateServiceTypeRequest } from "@/backend/transport";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { ServiceStore } from "@/stores/common/service";
import Message from "primevue/message";

const dialogRef: any = inject("dialogRef");
const toast = toastStore();
const { t } = useI18n();
interface ServiceTypeLanguage {
  language?: {
    id?: number;
    title: Language;
    disabled: boolean;
  };
  title?: string;
  description?: string;
}
const serviceStore = ServiceStore();
const invalidData = ref({
  language: false,
  image: false,
  descriptionLength: false,
});
const languages = Object.keys(Language).map((key) => Language[key]);
const requestStatusStore = requestStatus();
const selectedServiceTypeLanguage = ref<ServiceTypeLanguage>({
  language: undefined,
  title: undefined,
  description: undefined,
});
const serviceTypeLanguages = ref<ServiceTypeLanguage[]>([]);

const newServiceType = ref<CreateServiceTypeRequest>({
  icon: {
    bytes: "",
    fileName: "",
  },
  translations: [],
});

const onImageSelected = (imageFile: File) => {
  changeFileToBase64(imageFile).then((res) => {
    newServiceType.value.icon!.bytes = res;
    newServiceType.value.icon!.fileName = imageFile.name;
  });
};
function filterLanguages() {
  return languages?.map((language) => ({
    title: language,
    disabled: checkLanguage(language),
  }));
}
function checkLanguage(language) {
  const index = serviceTypeLanguages.value.findIndex(
    (serviceLanguage) => serviceLanguage.language?.title == language
  );
  return index >= 0 ? true : undefined;
}
async function addServiceTypeLanguage() {
  invalidData.value.descriptionLength = selectedServiceTypeLanguage.value
    .description
    ? selectedServiceTypeLanguage.value.description?.length < 3
    : true;
  if (invalidData.value.descriptionLength) {
    return;
  }
  serviceTypeLanguages.value.push(selectedServiceTypeLanguage.value);
  newServiceType.value.translations!.push({
    language: selectedServiceTypeLanguage.value.language?.title,
    title: selectedServiceTypeLanguage.value.title!,
    description: selectedServiceTypeLanguage.value.description!,
  });
  selectedServiceTypeLanguage.value = {
    language: undefined,
    title: undefined,
    description: undefined,
  };
}
async function addServiceType() {
  invalidData.value.image = !newServiceType.value.icon?.bytes;
  invalidData.value.language = !newServiceType.value.translations?.find(
    (translation) => translation.language == Language.EN
  );
  if (invalidData.value.image || invalidData.value.language) {
    return;
  }
  await serviceStore.createServiceType(newServiceType.value).then(() => {
    dialogRef.value.close();
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("fields.service_type"),
      }),
      type: "success",
    });
  });
}
function deleteCountryLanguage(data) {
  serviceTypeLanguages.value!.splice(data.index, 1);
  newServiceType.value.translations!.splice(data.index, 1);
}
</script>
