<template>
  <div class="p-4 w-full">
    <div class="grid w-full">
      <div class="col-12 md:col-6 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="document-lock-outline" class="text-xl"></ion-icon>
          </span>
          <Dropdown
            :options="roles"
            optionDisabled="disabled"
            display="chip"
            :placeholder="$t('roles.role')"
            v-model="cancelReasonData.role"
            :class="{
              'p-invalid': invalidData.role && submittedForm,
            }"
          >
            <template #value="valueProp">
              {{
                invalidData.role && submittedForm
                  ? $t("validationMessages.required", {
                      field: $t("roles.role"),
                    })
                  : valueProp.value?.name ?? valueProp.placeholder
              }}
            </template>
            <template #option="slotProps">
              <p>
                {{ slotProps.option?.name }}
              </p>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
    <TabView>
      <TabPanel
        v-for="(
          cancelReasonTranslation, index
        ) in cancelReasonData.translations"
        :header="cancelReasonTranslation.language ?? ''"
        :key="index"
      >
        <div class="grid">
          <div class="col-12 xl:col-6 mb-4 xl:mb-0">
            <div class="grid py-6 px-2">
              <div class="col-6 xl:col-9">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="text-outline"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      autofocus
                      type="text"
                      :id="`${cancelReasonTranslation.language}attribute.title`"
                      v-model="cancelReasonTranslation.text"
                    />

                    <label
                      :for="`${cancelReasonTranslation.language}attribute.title`"
                      >{{ $t("auth.area.title") }}</label
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
    <div
      class="w-full flex justify-content-center"
      v-if="invalidData.enLanguage"
    >
      <Message severity="error" class="w-full" :closable="false">
        {{ invalidData.enLanguage ? $t("validationMessages.language") : "" }}
      </Message>
    </div>
    <div class="pt-4 mx-2 flex justify-content-end">
      <Button
        icon="pi pi-check-circle"
        :label="$t('buttons.submit')"
        @click="addCancelReason"
        :loading="requestStatusStore.loading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { Language } from "@/backend/auth/models/Language";
import { RoleStore } from "@/stores/common/role";
import Message from "primevue/message";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import {
  mapCreateUpdateCancelReasonRequest,
  type CreateUpdateCancelReasonRequestDto,
} from "./mapper";
import type { RoleDto } from "@/backend/transport";

const props = defineProps(["selectedCancelReason"]);
const emits = defineEmits(["formSubmitted"]);

// get all roles
const roleStore = RoleStore();
const roles = ref<RoleDto[]>();
// Call getAllRole and update roles
roleStore.getAllRole().then((response) => {
  roles.value = response.items || [];
});

const languages = Object.keys(Language).map((key) => Language[key]);
const requestStatusStore = requestStatus();

const invalidData = ref({
  role: false,
  enLanguage: false,
});
const submittedForm = ref(false);

const cancelReasonData = ref<CreateUpdateCancelReasonRequestDto>({
  role: undefined,
  translations: [],
});
onMounted(() => {
  if (props.selectedCancelReason) {
    cancelReasonData.value = props.selectedCancelReason;
  }
  addLanguageTitleToCancelReasonData();
});
function addLanguageTitleToCancelReasonData() {
  for (const language of languages) {
    const cancelReasonTranslationData =
      cancelReasonData.value.translations!.find((x) => x.language === language);
    if (!cancelReasonTranslationData) {
      cancelReasonData.value.translations!.push({
        text: "",
        language: language,
      });
    }
  }
}
async function addCancelReason() {
  submittedForm.value = true;
  invalidData.value = {
    role: false,
    enLanguage: false,
  };
  const enLanguage = cancelReasonData.value!.translations!.find(
    (x) => x.language === Language.EN
  );
  if (!enLanguage || !enLanguage.text) {
    invalidData.value.enLanguage = true;
    return;
  }

  if (!cancelReasonData.value?.role) {
    invalidData.value.role = true;
    return;
  }
  emits(
    "formSubmitted",
    mapCreateUpdateCancelReasonRequest(cancelReasonData.value)
  );
}
</script>
