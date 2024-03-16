<template>
  <div class="w-full flex justify-content-center">
    <div
      class="px-3 md:px-8 py-4 w-full flex justify-content-center align-items-center"
      style="max-width: 1500px; min-height: calc(100vh - 100px)"
    >
      <div
        class="pageWrapper flex flex-column justify-content-center align-items-center"
        style="min-height: 400px"
      >
        <p class="my-6 px-4 text-2xl font-bold">
          {{ $t("transportation.serviceAppConfiguration.title") }}
        </p>
        <div class="grid p-4" style="width: 100% !important">
          <div class="col-12 lg:col-6 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="locate-outline" class="text-xl"></ion-icon>
              </span>
              <div class="p-inputgroup">
                <span class="p-float-label">
                  <InputNumber
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="
                      serviceAppConfigurationData.servantLocationUpdateInterval
                    "
                  />
                  <label for="inputgroup">{{
                    $t(
                      "transportation.serviceAppConfiguration.servantLocationUpdateInterval"
                    )
                  }}</label>
                </span>
              </div>
            </div>
          </div>
          <TabView class="w-full">
            <TabPanel
              v-for="(
                helpTranslation, index
              ) in serviceAppConfigurationData.helpTranslation"
              :header="helpTranslation.language ?? ''"
              :key="index"
            >
              <Textarea
                rows="10"
                cols="30"
                class="w-full"
                :placeholder="$t('transportation.common.title')"
                v-model="helpTranslation.text"
              >
              </Textarea>
            </TabPanel>
          </TabView>
          <div class="col-12 flex justify-content-end">
            <Button
              v-can="[PolicyType.READ_SERVICE_APP_CONFIGURATION]"
              @click="upsetAppConfiguration"
              :loading="requestStatusStore.loading"
            >
              {{ $t("buttons.edit") }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Language,
  ServiceAppConfigurationService,
  type CreateUpdateServiceAppConfigurationRequest,
  PolicyType,
} from "@/backend/transport";
import { requestStatus } from "@/stores/common/requestStatus";
import { onMounted, ref } from "vue";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Textarea from "primevue/textarea";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const requestStatusStore = requestStatus();
const languages = Object.keys(Language).map((key) => Language[key]);
const serviceAppConfigurationData =
  ref<CreateUpdateServiceAppConfigurationRequest>({
    helpTranslation: [],
    servantLocationUpdateInterval: undefined,
  });

for (const language of languages) {
  serviceAppConfigurationData.value.helpTranslation!.push({
    language: language,
    text: "",
  });
}
onMounted(() => {
  getAppConfigurationData();
});

function getAppConfigurationData() {
  ServiceAppConfigurationService.getServiceAppConfiguration().then((res) => {
    serviceAppConfigurationData.value =
      res as CreateUpdateServiceAppConfigurationRequest;
    for (const language of languages) {
      if (
        !serviceAppConfigurationData.value.helpTranslation?.find(
          (item) => item.language === language
        )
      ) {
        serviceAppConfigurationData.value.helpTranslation!.push({
          language: language,
          text: "",
        });
      }
    }
  });
}
async function upsetAppConfiguration() {
  await ServiceAppConfigurationService.updateServiceAppConfiguration({
    requestBody: serviceAppConfigurationData.value,
  }).then(() => {
    const toast = toastStore();
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", { field: t("fields.card") }),
      type: "success",
    });
    getAppConfigurationData();
  });
}
</script>
