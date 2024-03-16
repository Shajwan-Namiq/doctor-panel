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
            v-model="addBaseRole.name"
            :class="{
              'p-invalid': v$.name.$invalid && submittedForm,
            }"
            :disabled="true"
          />

          <label for="inputgroup">{{
            v$.name.$invalid && submittedForm
              ? $t("validationMessages.required", {
                  field: $t("baseRoles.name"),
                })
              : $t("baseRoles.name")
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
          :disabled="!ifUserHasPolicy(PolicyType.WRITE_BASE_ROLE)"
        >
          <template #value> {{ $t("baseRoles.policyName") }} </template>
          <template #option="slotProps">
            <p>{{ slotProps.option.name }}</p>
          </template>
        </MultiSelect>
      </div>
    </div>
  </div>
  <div class="policies">
    <div v-for="policy in selectedPolices" :key="policy.id">
      <Chip
        :label="policy.name!"
        removable
        @remove="removePolicy(policy)"
        :disabled="!ifUserHasPolicy(PolicyType.WRITE_BASE_ROLE)"
      />
    </div>
  </div>
  <div v-if="submittedForm">
    <div
      class="w-full flex justify-content-center"
      v-if="!addBaseRole.policyIds || addBaseRole.policyIds.length < 1"
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
      @click="submitBaseRole"
      :disabled="!ifUserHasPolicy(PolicyType.WRITE_BASE_ROLE)"
    ></Button>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Chip from "primevue/chip";
import Message from "primevue/message";
import { inject, onMounted, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { requestStatus } from "@/stores/common/requestStatus";
import { BaseRoleStore } from "@/stores/common/baseRole";
import { RoleStore } from "@/stores/common/role";
import { useI18n } from "vue-i18n";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";
import type { PostRole } from "@/backend/transport";
import { PolicyType } from "@/backend/transport";

const dialogRef: any = inject("dialogRef");
const { t } = useI18n();
const requeststatus = requestStatus();
const baseRoleStore = BaseRoleStore();
const roleStore = RoleStore();

const addBaseRole = ref<any>({
  name: "",
  policyIds: [],
});
const submittedForm = ref(false);
const policies = ref<PostRole[]>([]);

const selectedPolices = ref<any[]>([]);
const rules: any = {
  name: { required },
};

const v$ = useVuelidate(rules, addBaseRole);

policies.value = roleStore.policies.map((policyName) => ({
  id: policyName.id,
  name: policyName.name,
}));

onMounted(() => {
  addBaseRole.value = {
    name: dialogRef.value.data.name,
    policyIds: dialogRef.value.data.policies,
  };
  selectedPolices.value = dialogRef.value.data.policies;
});

function change(event) {
  submittedForm.value = false;
  selectedPolices.value = event.value;
}

function removePolicy(policy) {
  const index = selectedPolices.value.findIndex((x) => x.id == policy.id);
  selectedPolices.value.splice(index, 1);
}

async function submitBaseRole() {
  submittedForm.value = true;

  const policyIds = selectedPolices.value.map((policy) => policy.id);

  if (policyIds.length < 1 || v$.value.$invalid) {
    submittedForm.value = false;
    return;
  }

  dialogRef.value.close();
  try {
    await baseRoleStore.editBaseRole(policyIds, dialogRef.value.data.id, {
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", { field: t("roles.role") }),
    });

    submittedForm.value = false;
  } catch (error) {
    console.error("Failed to update base role:", error);
    submittedForm.value = false;
  }
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
