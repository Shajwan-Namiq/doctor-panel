/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { CancelReasonService } from "@/backend/transport";
import type { CancelReasonDto } from "@/backend/transport";

export type RootState = {
  cancelReason: CancelReasonDto[] | undefined;
};

export const CancelReasonStore = defineStore("cancelReason", {
  state: () =>
  ({
    cancelReason: undefined,
  } as RootState),

  actions: {
    async getAllCancelReason() {
      await CancelReasonService.listCancelReason({}).then((Response) => {
        this.cancelReason = Response as CancelReasonDto[];
      });
    },
    async deleteCancelReason(id: number) {
      await CancelReasonService.delete({ id: id });
      this.getAllCancelReason();
    },
    async getCancelReasonsIfEmpty() {
      if (this.cancelReason === undefined) {
        await this.getAllCancelReason();
      }
    },
    async getAllCancelReasonIfEmpty() {
      if (this.cancelReason === undefined) {
        await this.getAllCancelReason();
      }
    }
  },
});
