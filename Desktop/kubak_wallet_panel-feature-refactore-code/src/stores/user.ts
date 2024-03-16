import { defineStore } from "pinia";

export const UserStore = defineStore("user", {
  state: () => ({
    user: { roles: {}, name: "" },
    dialogStatus: "",
    currentRoleId: 0,
  }),

  actions: {
    addUserDetail(user) {
      this.user = user;
    },
    changeDialogStatus(status: string) {
      this.dialogStatus = status;
    },
  },
});
