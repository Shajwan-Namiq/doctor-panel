<template>
  <div>
    <DefaultSidebarLayout />
  </div>
</template>
<script setup lang="ts">
import { sidebarItems } from "@/stores/sidebar/items";
import DefaultSidebarLayout from "./layout-DefaultSidebarLayout.vue";

const store = sidebarItems();
store.getTransportationSidebarItems();
</script>
