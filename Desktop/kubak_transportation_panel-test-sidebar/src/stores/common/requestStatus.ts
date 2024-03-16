import { defineStore } from "pinia";
export type RootState = {
  loading: boolean;
};
export const requestStatus = defineStore("requestStatus", {
  state: () =>
    ({
      loading: false,
    } as RootState),

  actions: {
    ChangeLoadingStatus(status: boolean) {
      this.loading = status;
    },
  },
});

export const walletRequestStatus = defineStore("walletRequestStatus", {
  state: () =>
    ({
      loading: false,
    } as RootState),

  actions: {
    ChangeLoadingStatus(status: boolean) {
      this.loading = status;
    },
  },
});
