<template>
  <div class="w-full">
    <div style="min-width: 400px">
      <div class="pt-2">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="document-lock-outline" class="text-xl"></ion-icon>
          </span>
          <MultiSelect
            :options="roles"
            optionLabel="name"
            display="chip"
            v-model="selectedRoles"
          >
            <template #value>
              {{ $t("transportation.users.chooseRole") }}</template
            >
            <template #option="slotProps">
              <p>{{ slotProps.option.name }}</p>
            </template>
          </MultiSelect>
        </div>
      </div>
      <div class="policies">
        <div v-for="role in selectedRoles" :key="role.id">
          <div class="bg-gray-300 p-2 border-round-3xl">
            <span class="mx-2">{{ role.name }}</span>
            <i
              class="pi pi-times text-xs"
              style="cursor: pointer"
              @click="removeRole(role)"
            ></i>
          </div>
        </div>
      </div>
      <div class="flex justify-content-end">
        <Button
          :label="$t('buttons.submit')"
          :loading="requestStatusStore.loading"
          @click="submitRoles"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MultiSelect from "primevue/multiselect";
import { ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { UserStore } from "@/stores/transportation/user";
import { useRoute } from "vue-router";
import { RoleStore } from "@/stores/common/role";
import { UserService } from "@/backend/transport";

const userStoreInfo = UserStore();
const requestStatusStore = requestStatus();

const addRoles = [];

const roleStore = RoleStore();
const roles = ref();
roleStore.getAllRole().then((res) => {
  roles.value = res.items;
});

const selectedRoles = ref();
selectedRoles.value = userStoreInfo.user?.roles;

function removeRole(role) {
  const index = selectedRoles.value.findIndex((x) => x.id == role.id);
  if (index !== -1) {
    selectedRoles.value.splice(index, 1);
  }
}

const route: any = useRoute();
async function submitRoles() {
  for (const index in selectedRoles.value) {
    addRoles[index] = selectedRoles.value[index].id;
  }
  UserService.putUserRoles({
    id: route.params.id,
    requestBody: { roleIds: addRoles },
  }).then(() => {
    userStoreInfo.changeDialogStatus("close");
  });
}
</script>
<style lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 30px;
  .p-inputgroup {
    width: 50%;
  }
  .dropdown {
    width: 50%;
  }
  .p-multiselect {
    width: 80%;
    margin: 0 20px;
  }
}
.policies {
  margin: 20px 0;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 2px 2px;
  }
}
</style>
