<template>
  <div class="page-style">
    <Splitter style="height: calc(100vh - 140px)" class="page-container">
      <SplitterPanel
        class="flex align-items-center justify-content-center"
        :size="25"
        :minSize="10"
        style="max-width: 30%"
      >
        <div
          class="px-2 h-full border-round-sm"
          style="
            background-color: var(--secondary-background-color-kubak);
            overflow-y: auto;
          "
        >
          <div class="flex align-items-center py-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="search-outline" class="text-2xl"></ion-icon>
              </span>
              <InputText
                placeholder="Search"
                @input="filterKeys()"
                v-model="searchValue"
              />
            </div>
          </div>

          <div
            class="keys py-4 my-2 border-round-sm flex align-items-center cursor-pointer"
            v-for="(translation, index) in filterKeys()"
            :key="index"
            @click="selectedTranslation = translation"
            :style="
              selectedTranslation == translation
                ? 'background-color: var(--default-color-hover-kubak);border: 2px solid var(--primary-color)'
                : ''
            "
          >
            <div class="">
              <ion-icon
                name="information-circle-outline"
                class="text-2xl mx-2"
                style="color: var(--danger-color-kubak)"
                v-if="checkIfTranslationEmpty(translation)"
              ></ion-icon>
            </div>
            <div class="w-full flex justify-content-center">
              <p>{{ translation.key }}</p>
            </div>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel
        class="flex align-items-center justify-content-center"
        :size="75"
      >
        <div
          class="w-full mx-2 h-full border-round-sm flex justify-content-center align-items-center"
          style="background-color: var(--secondary-background-color-kubak)"
        >
          <div
            style="
              background-color: var(--background-color-kubak);
              height: 80%;
              width: 80%;
            "
            class="border-round-md"
          >
            <div
              class="pt-4 flex flex-column justify-content-center align-items-center"
              style="height: 90%"
            >
              <div
                class="mb-4 w-full"
                v-for="(language, index) in languages"
                :key="index"
                style="max-width: 500px"
              >
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon w-5rem">
                    <p class="font-medium">{{ $t(`languages.${language}`) }}</p>
                  </span>
                  <Textarea
                    v-if="selectedTranslation"
                    rows="5"
                    cols="30"
                    :placeholder="
                      $t(`languages.placeholder`, {
                        language: $t(`languages.${language}`),
                      })
                    "
                    v-model="selectedTranslation!.translationLanguages!.find(
                        (x) => x.language == language
                      )!.value
                    "
                  />
                  <Textarea
                    v-else
                    rows="5"
                    cols="30"
                    :placeholder="
                      $t(`languages.placeholder`, {
                        language: $t(`languages.${language}`),
                      })
                    "
                  />
                </div>
              </div>
            </div>
            <div class="w-full px-8">
              <div class="w-full flex justify-content-end">
                <Button
                  icon="pi pi-check-circle"
                  :label="$t('buttons.submit')"
                  :loading="requestStatusStore.loading"
                  @click="update(selectedTranslation)"
                  :disabled="!selectedTranslation"
                  v-can="[PolicyType.WRITE_TRANSLATION]"
                />
              </div>
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>
<script lang="ts" setup>
import { TranslationService, type TextTranslation } from "@/backend/wallet";
import { ref } from "vue";
import { Language } from "@/backend/auth/models/Language";
import { requestStatus } from "@/stores/common/requestStatus";
import Textarea from "primevue/textarea";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { PolicyType } from "@/backend/transport";
 

const requestStatusStore = requestStatus();
const toast = toastStore();
const { t } = useI18n();
const languages = Object.keys(Language).map((key) => Language[key]);
const translations = ref<TextTranslation[]>([]);
const selectedTranslation = ref();
const searchValue = ref("");

getTranslations();
async function getTranslations() {
  await TranslationService.getTranslations().then((Response) => {
    translations.value = Response;
    for (const translation of translations.value) {
      for (const language of languages) {
        const index = translation.translationLanguages?.findIndex(
          (x) => x.language == language
        );
        if (index == undefined || index == null || index < 0) {
          translation.translationLanguages?.push({
            language: language,
            value: "",
          });
        }
      }
    }
  });
}
function filterKeys() {
  return translations.value.filter((x) =>
    x.key?.toLowerCase().includes(searchValue.value.toLowerCase())
  );
}
function checkIfTranslationEmpty(translation: TextTranslation) {
  return translation.translationLanguages?.some((x) => x.value == "");
}
async function update(translation: TextTranslation) {
  await TranslationService.updateTranslation({
    id: translation.id!,
    requestBody: { values: translation.translationLanguages },
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.translation"),
      }),
      type: "success",
    });
    getTranslations();
  });
}
</script>
<style lang="scss">
.keys {
  background-color: var(--background-color-kubak);
  &:hover {
    background-color: var(--default-color-hover-kubak);
  }
}
</style>
