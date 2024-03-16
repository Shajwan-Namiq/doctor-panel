<template>
  <div class="grid w-full pt-4">
    <div class="col-6">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="text-outline"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputText
            autofocus
            id="inputgroup"
            type="text"
            v-model="addRole.name"
            :class="{
              'p-invalid': v$.name.$invalid && submittedForm,
            }"
          />

          <label for="inputgroup">{{
            v$.name.$invalid && submittedForm
              ? $t("validationMessages.required", {
                  field: $t("roles.name"),
                })
              : $t("roles.name")
          }}</label>
        </span>
      </div>
    </div>
    <div class="col-6">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="document-lock-outline"></ion-icon>
        </span>
        <MultiSelect
          v-model="selectedPolices"
          :options="policies"
          optionLabel="name"
          placeholder="Select Cities"
          display="chip"
          @change="change"
          style="height: 35px"
        >
          <template #value> {{ $t("roles.policyName") }} </template>
          <template #option="slotProps">
            <p>{{ slotProps.option.name }}</p>
          </template>
        </MultiSelect>
      </div>
    </div>
  </div>
  <div class="policies">
    <div v-for="policy in selectedPolices" :key="policy.id">
      <Chip :label="policy.name" removable @remove="removePolicy(policy)" />
    </div>
  </div>
  <div v-if="submittedForm">
    <div
      class="w-full flex justify-content-center"
      v-if="!addRole.policyIds || addRole.policyIds.length < 1"
    >
      <Message severity="error" class="w-full xl:w-8" :closable="false">
        {{ $t("validationMessages.empty_policy") }}
      </Message>
    </div>
  </div>
  <div class="flex justify-content-end p-4">
    <Button
      icon="pi pi-check-circle"
      :label="$t('buttons.submit')"
      :loading="requeststatus.loading"
      @click="submitRole"
    ></Button>
  </div>
</template>
<script setup lang="ts">
//primevue components
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Chip from "primevue/chip";
import Message from "primevue/message";
///vue
import { inject, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
///store
import { requestStatus } from "@/stores/common/requestStatus";
import { RoleStore } from "@/stores/common/role";

import { useI18n } from "vue-i18n";
import type { PostRole } from "@/backend/wallet";

const dialogRef: any = inject("dialogRef");
const { t } = useI18n();
const requeststatus = requestStatus();
const roleStore = RoleStore();
const addRole = ref<PostRole>({
  name: "",
  policyIds: [],
});
const submittedForm = ref(false);
const policies = ref<PostRole[]>([]);

const selectedPolices = ref<any[]>([]);
const rules: any = {
  name: { required },
};
const v$ = useVuelidate(rules, addRole);

policies.value = roleStore.policies.map((policyName) => ({
  id: policyName.id,
  name: policyName.name,
}));

function change(event) {
  submittedForm.value = false;
  selectedPolices.value = event.value;
}

function removePolicy(policy) {
  let index;
  if (typeof policy === "string") {
    index = selectedPolices.value.indexOf(policy);
  } else {
    index = selectedPolices.value.findIndex((x) => x.id === policy.id);
  }
  if (index !== -1) {
    selectedPolices.value.splice(index, 1);
  }
}

async function submitRole() {
  submittedForm.value = true;

  addRole.value.policyIds = selectedPolices.value.map(
    (policy) => policy.id
  ) as number[];

  if (!addRole.value.policyIds) {
    return;
  }
  if (
    v$.value.$invalid ||
    !addRole.value.policyIds ||
    addRole.value.policyIds.length < 1
  )
    return;

  dialogRef.value.close();
  roleStore.addRole(addRole.value, {
    severity: t("toasts.added_success_header"),
    summary: t("toasts.added_success_desc", { field: t("roles.role") }),
  });
  submittedForm.value = false;
}
</script>

<style lang="scss">
.addRolesDialogContainer {
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
