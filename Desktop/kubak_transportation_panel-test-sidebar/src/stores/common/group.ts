/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import type { GroupDto } from "@/backend/transport";
import { GroupService } from "@/backend/city";

export type RootState = {
  groups: GroupDto[] | undefined;
};
export const GroupStore = defineStore("groups", {
  state: () =>
  ({
    groups: undefined,
  } as RootState),

  actions: {
    async getAllGroups() {
      await GroupService.getAllGroups().then((Response) => {
        this.groups = Response;
      });
    },
    async addGroup(group) {
      await GroupService.createGroup({ requestBody: group });
      this.getAllGroups();
    },
  },
});
// const groupStore = GroupStore();
// if (!groupStore.groups) await groupStore.getAllGroups()
