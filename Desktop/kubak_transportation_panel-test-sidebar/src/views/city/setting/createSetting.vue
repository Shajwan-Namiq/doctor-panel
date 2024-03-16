<template>
  <div class="p-4">
    <div class="grid">
      <div class="col-12 md:col-6 xl:col-6 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="share-outline" class="text-xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              type="text"
              v-model="settingInfo.storeLink"
              :class="{
                'p-invalid': v$.storeLink?.$invalid && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              v$.storeLink?.$invalid && submittedForm
                ? $t("validationMessages.required", {
                    field: $t("city.setting.storeLink"),
                  })
                : $t("city.setting.storeLink")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 xl:col-6 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="phone-portrait-outline" class="text-xl"></ion-icon>
          </span>
          <Dropdown
            :options="platform"
            optionDisabled="disabled"
            display="chip"
            :placeholder="$t('city.setting.platform')"
            v-model="settingInfo.platform"
            :class="{
              'p-invalid': v$.platform?.$invalid && submittedForm,
            }"
          >
            <template #value="valueProp">
              {{ valueProp.value ?? valueProp.placeholder }}
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <ion-icon
                  :name="`logo-${
                    slotProps.option == 'Ios' ? 'apple' : 'android'
                  }`"
                  class="text-xl mx-2"
                ></ion-icon>
                <p>
                  {{ slotProps.option }}
                </p>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-6 xl:col-6 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="documents-outline" class="text-xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              v-model="settingInfo.currentAppVersion"
              :class="{
                'p-invalid': v$.currentAppVersion?.$invalid && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              v$.currentAppVersion?.$invalid && submittedForm
                ? $t("validationMessages.required", {
                    field: $t("city.setting.currentAppVersion"),
                  })
                : $t("city.setting.currentAppVersion")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 xl:col-6 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="sync-outline" class="text-xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              v-model="settingInfo.minimumVersion"
              :class="{
                'p-invalid': v$.minimumVersion?.$invalid && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              v$.minimumVersion?.$invalid && submittedForm
                ? $t("validationMessages.required", {
                    field: $t("city.setting.minimumVersion"),
                  })
                : $t("city.setting.minimumVersion")
            }}</label>
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-content-end">
      <Button
        :label="$t('buttons.add')"
        @click="addSettingInfo"
        :loading="requestStatusStore.loading"
        icon="pi pi-plus"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Platform, CreateUpdateSettingRequest } from "@/backend/city";
import { ref } from "vue";
import { SettingStore } from "./settingStore";
import { requestStatus } from "@/stores/common/requestStatus";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

interface settingDataType {
  storeLink?: string;
  currentAppVersion?: string;
  minimumVersion?: string;
  platform?: Platform;
}
const platform = ref(["Ios", "Android"]);
const settingInfo = ref<settingDataType>({});
const requestStatusStore = requestStatus();
const rules = {
  storeLink: { required },
  currentAppVersion: { required },
  minimumVersion: { required },
  platform: { required },
};
const v$ = useVuelidate(rules, settingInfo.value as any);
const submittedForm = ref(false);
const settingStore = SettingStore();

async function addSettingInfo() {
  submittedForm.value = true;
  if (v$.value.$invalid) {
    return;
  }
  settingStore.addSetting(settingInfo.value as CreateUpdateSettingRequest);
}
</script>
