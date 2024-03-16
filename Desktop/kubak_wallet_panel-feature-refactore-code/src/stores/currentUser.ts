/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { UserService } from "@/backend/auth/services/UserService";
import { UserService as UserServiceWallet } from "@/backend/wallet/services/UserService";

export type RootState = {
  userInfo: any;
  policies: string[];
  appReady: boolean;
  baseRole: any;
};
export const currentUser = defineStore("currentUser", {
  state: () =>
    ({
      userInfo: undefined,
      policies: [""],
      appReady: false,
      baseRole: undefined,
    } as RootState),

  actions: {
    async getCurrentUserInfo() {
      if (this.userInfo) return;
      try {
        const response = await UserService.getCurrentAdminUser();
        this.userInfo = response;
        // await this.getBaseRoleForCurrentUser();
      } catch (error) {
        console.log(error);
      }
    },
    async addPolicies(policies: string[]) {
      this.policies = policies;
    },
    async updateProfile(userData) {
      // await UserService.updateAdminUserProfile({ formData: userData }).then(
      //   () => {
      //     this.getCurrentUserInfo();
      //   }
      // );
    },
    async updateLanguage(language) {
      // await UserService.updateAdminUserProfile({
      //   formData: {
      //     displayName: this.userInfo.displayName,
      //     gender: this.userInfo.gender,
      //     language: language,
      //     regionId: this.userInfo.region.id,
      //   },
      // }).then(async () => {
      //   await this.getCurrentUserInfo();
      // });
    },
    async changeAppReady(cond) {
      this.appReady = cond;
    },
    async getBaseRoleForCurrentUser() {
      // const response = await UserServiceWallet.getCurrentUserRoles();
      // this.baseRole = response;
    },

    isAuthenticated(state): boolean {
      return !!state.userInfo && state.policies.length > 0;
    },
  },
});