/* eslint-disable prettier/prettier */
import { TokensService } from "@/backend/auth";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const authentication = defineStore("authentication", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    tokenRenewStart: false,
  }),
  actions: {
    async addTokens() {
      this.accessToken = localStorage.getItem("accessToken") ?? "";
      this.refreshToken = localStorage.getItem("refreshToken") ?? "";
      if (!this.accessToken || !this.refreshToken) return;
    },
    async checkTokenExpiration() {
      if (!this.accessToken) return;

      const decodedAccessToken = jwtDecode(this.accessToken);
      if (!decodedAccessToken) return;
      if (new Date(decodedAccessToken.exp! * 1000) < new Date()) {
        try {
          const response = await TokensService.postRenewAccessToken({
            requestBody: {
              accessToken: this.accessToken,
              refreshToken: this.refreshToken,
            },
          });

          this.accessToken = response.accessToken!;
          this.refreshToken = response.refreshToken!;
          localStorage.setItem("accessToken", response.accessToken!);
          localStorage.setItem("refreshToken", response.refreshToken!);
        } catch (error) {
          // Handle invalid token and refresh token
          if (error.response && error.response.status === 401) {
            // Clear tokens from local storage and redirect to login page
            this.clearTokensAndRedirect();
          } else {
            // Handle other errors
            console.error("Token renewal failed:", error);
            this.clearTokensAndRedirect();
          }
        }
      }
    },
    clearTokensAndRedirect() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("keyValue");
      window.location.href = "https://main-panel.dev.a.kubak.co/";
      window.location.reload();
    },
  },
});
