/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import type { PostRole, PutRole, RoleDto } from "@/backend/wallet";
import { UserService } from "@/backend/wallet";
import { toastStore } from "./toastStore";
import { RolesService } from "@/backend/wallet/index";

export type RootState = {
  roles: RoleDto[];
  dialogStatus: string;
  currentRoleId: number;
  policies: any;
};

export const RoleStore = defineStore("role", {
  state: () =>
    ({
      roles: [],
      dialogStatus: "",
      currentRoleId: 0,
      policies: [],
    } as RootState),

  actions: {
    async getAllRole() {
      await RolesService.getRoles().then((Response) => {
        this.roles = Response.roles as RoleDto[];
      });
      return this.roles;
    },
    async getAllPolicies() {
      const response = await UserService.getCurrentUserRoles();
    
      // Extract policies from baseRoles
      const policiesDataFromBaseRoles =
        response?.baseRoles?.flatMap((role) =>
          role?.policies?.map((policy) => ({
            id: policy.id,
            name: policy.name,
          }))
        ) || [];
      // Extract policies from roles
      const policiesDataFromRoles =
        response?.roles?.flatMap((role) =>
          role?.policies?.map((policy) => ({
            id: policy.id,
            name: policy.name,
          }))
        ) || [];
      // Create a Map to combine and deduplicate policies by their id
      const policyMap = new Map();
      // Add policies from baseRoles to the Map
      policiesDataFromBaseRoles.forEach((policy) => {
        policyMap.set(policy?.id, policy);
      });
      // Add policies from roles to the Map, automatically avoiding duplicates
      policiesDataFromRoles.forEach((policy) => {
        policyMap.set(policy?.id, policy);
      });
      // Convert the Map back into an array for this.policies
      this.policies = Array.from(policyMap.values());
    },

    changeDialogStatus(status: string) {
      this.dialogStatus = status;
    },
    addCurrentRoleId(Id: number) {
      this.currentRoleId = Id;
    },
    // async addPolicies(data) {
    //   await BaseRolesService.putBaseRole({
    //     id: this.currentRoleId,
    //     requestBody: data,
    //   });
    //   this.getAllRole();
    //   this.changeDialogStatus("close");
    // },
    async addRole(
      role: PostRole,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      await RolesService.postRole({
        requestBody: role,
      }).then(() => {
        const toast = toastStore();
        toast.changeToastState({
          severity: message?.severity || "success",
          summary: message?.summary || "Success",
          type: "success",
        });
        this.getAllRole();
      });
    },
    async editRole(
      role: PutRole,
      id: number,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      await RolesService.putRole({
        id: id,
        requestBody: role,
      }).then(() => {
        const toast = toastStore();
        toast.changeToastState({
          severity: message?.severity || "success",
          summary: message?.summary || "Success",
          type: "success",
        });
        this.getAllRole();
      });
    },
  },
});
