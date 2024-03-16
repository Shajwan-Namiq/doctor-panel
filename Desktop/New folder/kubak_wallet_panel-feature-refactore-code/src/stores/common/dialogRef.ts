import { defineStore } from "pinia";
export type RootState = {
  isOpen: boolean;
};
export const dialogStatus = defineStore("dialogStatus", {
  state: () => ({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
    dialog: { close: function () { } },
  }),

  actions: {
    ChangeDialogStatus(status: boolean) {
      this.isOpen = status;
    },
    addDialogRef(dialog) {
      this.dialog = dialog;
    },
    closeDialog() {
      this.dialog.close();
    },
  },
});
