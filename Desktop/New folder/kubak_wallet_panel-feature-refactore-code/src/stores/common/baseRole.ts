/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { BaseRolesService } from "@/backend/wallet/services/BaseRolesService";
import type { PutBaseRole } from "@/backend/wallet/models/PutBaseRole";
import { toastStore } from "./toastStore";
import type { BaseRoleDto } from "@/backend/wallet";

export type RootState = {
  baseRoles: BaseRoleDto[];
  dialogStatus: string;
  currentRoleId: number;
};

export const BaseRoleStore = defineStore("baseRole", {
  state: () =>
    ({
      baseRoles: [],
      dialogStatus: "",
      currentRoleId: 0,
    } as RootState),

  actions: {
    async getAllBaseRole() {
      await BaseRolesService.getBaseRoles().then((Response) => {
        this.baseRoles = Response.baseRoles as BaseRoleDto[];
      });
      return this.baseRoles;
    },
    changeDialogStatus(status: string) {
      this.dialogStatus = status;
    },
    addCurrentRoleId(Id: number) {
      this.currentRoleId = Id;
    },
    async addPolicies(data) {
      await BaseRolesService.putBaseRole({
        id: this.currentRoleId,
        requestBody: data,
      });
      this.getAllBaseRole();
      this.changeDialogStatus("close");
    },
    async editBaseRole(
      policyIds: number[],
      id: number,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      try {
        const payload: PutBaseRole = {
          policyIds: policyIds,
        };

        await BaseRolesService.putBaseRole({
          id: id,
          requestBody: payload,
        });

        // Success toast notification
        const toast = toastStore();
        toast.changeToastState({
          severity: message?.severity || "success",
          summary: message?.summary || "Role updated successfully",
          type: "success",
        });

        await this.getAllBaseRole();
      } catch (error) {
        const toast = toastStore();
        toast.changeToastState({
          severity: "error",
          summary: "Failed to update role",
          type: "error",
        });
      }
    },
  },
});
