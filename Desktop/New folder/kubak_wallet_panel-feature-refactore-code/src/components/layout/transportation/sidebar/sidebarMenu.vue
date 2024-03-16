<template>
  <div class="menuContainer" v-if="store">
    <PanelMenu :model="store.items"> </PanelMenu>
  </div>
</template>
<script setup lang="ts">
import PanelMenu from "@/common/interfaces/panelmenu/PanelMenu.vue";

import { sidebarItems } from "@/stores/sidebar/items";
const store = sidebarItems();
</script>
<style lang="scss">
.menuPanel {
  height: auto;
  color: black;
}
</style>
