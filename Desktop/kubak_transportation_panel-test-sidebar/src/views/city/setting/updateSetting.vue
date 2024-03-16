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
                'p-invalid': !settingInfo.storeLink && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              !settingInfo.storeLink && submittedForm
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
              'p-invalid': !settingInfo.platform && submittedForm,
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
              type="text"
              v-model="settingInfo.currentAppVersion"
              :class="{
                'p-invalid': !settingInfo.currentAppVersion && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              !settingInfo.currentAppVersion && submittedForm
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
              type="text"
              v-model="settingInfo.minimumVersion"
              :class="{
                'p-invalid': !settingInfo.minimumVersion && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              !settingInfo.minimumVersion && submittedForm
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
        :label="$t('buttons.edit')"
        @click="addSettingInfo"
        :loading="requestStatusStore.loading"
        icon="pi pi-pencil"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { SettingStore } from "./settingStore";
import { requestStatus } from "@/stores/common/requestStatus";

const dialogRef: any = inject("dialogRef");
const settingInfo = ref<any>({});
onMounted(() => {
  settingInfo.value = {
    storeLink: dialogRef.value.data?.storeLink,
    currentAppVersion: dialogRef.value.data?.currentAppVersion,
    minimumVersion: dialogRef.value.data?.minimumAppVersion,
    platform: dialogRef.value.data?.platform,
    id: dialogRef.value.data?.id,
  };
});
const platform = ref(["Ios", "Android"]);
const requestStatusStore = requestStatus();

const submittedForm = ref(false);
const settingStore = SettingStore();

async function addSettingInfo() {
  submittedForm.value = true;
  if (
    !settingInfo.value.storeLink ||
    !settingInfo.value.currentAppVersion ||
    !settingInfo.value.minimumVersion ||
    !settingInfo.value.platform
  ) {
    return;
  }

  settingStore.editSetting(settingInfo.value.id ?? 0, settingInfo.value);
}
</script>
