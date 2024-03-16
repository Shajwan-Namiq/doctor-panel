/* eslint-disable prettier/prettier */
import { TokensService } from "@/backend/auth";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const authentication = defineStore("authentication", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    tokenRenewStart: false
  }),
  actions: {

    async addTokens() {
      this.accessToken = localStorage.getItem("accessToken") ?? "";
      this.refreshToken = localStorage.getItem("refreshToken") ?? "";
      if (!this.accessToken || !this.refreshToken) return

    },
    async checkTokenExpiration(): Promise<string | null | undefined> {
      if (!this.accessToken) return;
      const decodedAccessToken = jwtDecode(this.accessToken);
      if (!decodedAccessToken) return;
      if (new Date(decodedAccessToken.exp! * 1000) < new Date()) {
        await TokensService.postRenewAccessToken({
          requestBody: {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
          }
        }).then((response) => {
          this.accessToken = response.accessToken!;
          this.refreshToken = response.refreshToken!;
          localStorage.setItem("accessToken", response.accessToken!);
          localStorage.setItem("refreshToken", response.refreshToken!);
        }).catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.reload();

        })

      }
    },
  },
});
