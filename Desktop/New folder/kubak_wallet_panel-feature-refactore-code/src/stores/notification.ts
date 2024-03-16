import { defineStore } from "pinia";
// import connection from "@/services/centralHub";
// import { HubConnectionState } from "@microsoft/signalr";
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
      // if (connection.state == HubConnectionState.Connected) {
      //   connection.on("ReceiveUpdate", (data: any) => {
      //     this.toast.add({
      //       severity: "info",
      //       summary: data.title,
      //       detail: data.description,
      //       life: 3000,
      //     });
      //   });
      // } else {
      //   setTimeout(() => {
      //     this.notificationStart();
      //   }, 1000);
      // }
    },
  },
});
