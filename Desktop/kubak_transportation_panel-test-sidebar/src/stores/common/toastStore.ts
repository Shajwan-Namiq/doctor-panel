/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
export type RootState = {
  severity: string;
  summary: string;
  type: "error" | "success";
};
export const toastStore = defineStore("toastStore", {
  state: () =>
  ({
    severity: "",
    summary: "",
    type: "success",
  } as RootState),

  actions: {
    changeToastState({ severity, summary, type }) {
      this.severity = severity;
      (this.summary = summary), (this.type = type);
    },
  },
});
