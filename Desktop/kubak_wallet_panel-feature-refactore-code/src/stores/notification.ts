import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const NotificationStore = defineStore("notificationStore", {
  state: () => ({
    test: [
      {
        title: "test",
        type: "error",
      },
      {
        title: "test",
        type: "success",
      },
    ],
    toast: useToast(),
  }),

  actions: {
    async notificationStart() {
     setTimeout(() => {
       this.notificationStart();
     }, 1000);
    },
  },
});
