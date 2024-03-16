<template>
  <div v-if="appReadyValue">
    <Toast group="bc" />
    <AppLayout />
    <DynamicDialog />
    <ConfirmDialog></ConfirmDialog>
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { currentUser } from "./stores/currentUser";
import Loading from "@/layouts/layout-LoadingPage.vue";
import Toast from "primevue/toast";
import AppLayout from "./layouts/AppLayout.vue";
const currentUserStore = currentUser();
const appReadyValue = ref<boolean>(currentUserStore?.appReady);

watch(
  () => currentUserStore?.appReady,
  () => {
    appReadyValue.value = currentUserStore?.appReady;
  }
);

const toast = useToast();
toast.add({
  severity: "success",
  summary: "Success Message",
  detail: "Message Content",
  life: 3000,
});
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}
const currentTheme = localStorage.getItem("theme");
document.body.classList.add(currentTheme ?? "light");
</script>
