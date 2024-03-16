/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import {
  SupportNumbersService,
  type SupportNumberDto,
} from "@/backend/city";
import { toastStore } from "./toastStore";

export type RootState = {
  supportNumbers: SupportNumberDto[] | undefined;
};
export const SupportNumberStore = defineStore("supportNumber", {
  state: () =>
  ({
    supportNumbers: undefined,
  } as RootState),

  actions: {
    async getAllSupportNumber() {
      await SupportNumbersService.getAllSupportNumberAdmin({
        regionId: undefined,
      }).then((Response) => {
        this.supportNumbers = Response;
      });

      return this.supportNumbers;
    },
    async addSupportNumber(group) {
      await SupportNumbersService.postSupportNumber({ requestBody: group });
      this.getAllSupportNumber();
    },
    async deleteSupportNumber(
      id: number,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      await SupportNumbersService.deleteSupportNumber({
        id: id,
      }).then(() => {
        const toast = toastStore();
        if (message) {
          toast.changeToastState({
            severity: message?.severity || "success",
            summary: message?.summary || "Success",
            type: "success",
          });
        }
        this.getAllSupportNumber();
      });
    },
    async editSupportNumber(
      id: number,
      data,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      await SupportNumbersService.updateSupportNumber({
        id: id,
        requestBody: data,
      }).then(() => {
        const toast = toastStore();
        if (message) {
          toast.changeToastState({
            severity: message?.severity || "success",
            summary: message?.summary || "Success",
            type: "success",
          });
        }
        this.getAllSupportNumber();
      });
    },
  },
});
