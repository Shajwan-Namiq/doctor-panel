<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layout-DefaultLayout.vue";
import LoadingPage from "./layout-LoadingPage.vue";

const layout = ref();
const route = useRoute();

watch(
  () => route?.meta?.layout,
  async (metaLayout) => {
    try {
      if (route.meta.layout) {
        const component =
          metaLayout && (await import(`./layout-${metaLayout}.vue`));
        layout.value = markRaw(component?.default || DefaultLayout);
      } else {
        layout.value = markRaw(LoadingPage);
      }
    } catch (e) {
      layout.value = markRaw(DefaultLayout);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template>
