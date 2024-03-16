import { defineStore } from "pinia";
import SidebarItems from "@/services/sidebarItemsService";
import { ref } from "vue";

export const sidebarItems = defineStore("items", {
  state: () => ({
    items: [],
  }),
  actions: {
    getTransportationSidebarItems() {
      const sidebarItems = ref(new SidebarItems());
      sidebarItems.value.getSidebarItems().then((data) => {
        this.items = data;
      });
    },
  },
});
