/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { SettingsService, type SettingInfoDtoPagination } from "@/backend/city";
import type { CreateUpdateSettingRequest } from "@/backend/city/models/CreateUpdateSettingRequest";

export type RootState = {
  setting: SettingInfoDtoPagination | undefined;
};

export const SettingStore = defineStore("setting", {
  state: () =>
  ({
    setting: undefined,
  } as RootState),

  actions: {
    async getAllSetting() {
      await SettingsService.getAllSettingsAdmin({}).then((Response) => {
        this.setting = Response;
      });
    },
    addSetting(Region: CreateUpdateSettingRequest) {
      SettingsService.postSetting({ requestBody: Region }).then(() => {
        this.getAllSetting();
      });
    },
    async deleteSetting(id: number) {
      await SettingsService.deleteSetting({ id: id });
      this.getAllSetting();
    },
    async editSetting(id: number, setting: CreateUpdateSettingRequest) {
      await SettingsService.updateSetting({ id: id, requestBody: setting });
      this.getAllSetting();
    },
  },
});
