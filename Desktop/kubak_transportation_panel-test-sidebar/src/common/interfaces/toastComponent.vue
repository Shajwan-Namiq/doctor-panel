<template>
  <Toast />
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { toastStore } from "@/stores/common/toastStore";
import Toast from "primevue/toast";
import { useI18n } from "vue-i18n";
import { watch } from "vue";

const toaststore = toastStore();
const toast = useToast();
const toastData = (
  summary: string,
  detail: string,
  severity: "success" | "error" | "info" | "warn" | undefined
) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 2000,
  });
  toaststore.severity = "";
};
const { t } = useI18n();
watch(
  () => toaststore.severity,
  () => {
    if (toaststore.severity == "") return;
    switch (toaststore.type) {
      case "error":
        toastData(
          toaststore.severity ?? t("error.title"),
          toaststore.summary ?? t("error.unKnown_error"),
          "error"
        );
        break;
      case "success":
        toastData(toaststore.severity, toaststore.summary, "success");
        break;
    }
  }
);
</script>
