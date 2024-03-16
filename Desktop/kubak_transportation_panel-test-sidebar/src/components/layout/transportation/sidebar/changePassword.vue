<template>
  <div class="p-4">
    <div class="grid">
      <div class="col-12 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="lock-closed-outline" class="text-xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <Password
              :toggleMask="true"
              :feedback="false"
              autofocus
              id="inputgroup"
              type="text"
              v-model="passwordData.oldPassword"
              :class="{
                'p-invalid': v$.oldPassword.$invalid && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              v$.oldPassword.$invalid && submittedForm
                ? $t("validationMessages.required", {
                    field: $t("sidebarFooter.changePassword.oldPassword"),
                  })
                : $t("sidebarFooter.changePassword.oldPassword")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="lock-closed-outline" class="text-xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <Password
              :toggleMask="true"
              autofocus
              :feedback="false"
              id="inputgroup"
              type="text"
              v-model="passwordData.newPassword"
              :class="{
                'p-invalid': v$.newPassword.$invalid && submittedForm,
              }"
            />
            <label for="inputgroup">{{
              v$.newPassword.$invalid && submittedForm
                ? $t("validationMessages.required", {
                    field: $t("sidebarFooter.changePassword.newPassword"),
                  })
                : $t("sidebarFooter.changePassword.newPassword")
            }}</label>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-content-center" v-if="errorMessage">
      <Message severity="error" class="w-full" :closable="false">
        {{ errorMessage }}
      </Message>
    </div>
    <div class="pt-4 flex justify-content-end">
      <Button
        :label="$t('buttons.submit')"
        @click="changePassword"
        :loading="requestStatusStore.loading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import {
  UserPasswordsService,
  type PutUserPasswordRequest,
} from "@/backend/auth";
import { requestStatus } from "@/stores/common/requestStatus";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import Message from "primevue/message";
import { toastStore } from "@/stores/common/toastStore";
import Password from "primevue/password";
const { t } = useI18n();
const dialogRef: any = inject("dialogRef");

const requestStatusStore = requestStatus();
const errorMessage = ref<string | undefined>(undefined);
const passwordData = ref<PutUserPasswordRequest>({
  newPassword: "",
  oldPassword: "",
});

const rule = {
  newPassword: { required },
  oldPassword: { required },
};
const submittedForm = ref(false);
const v$ = useVuelidate(rule, passwordData.value);

function changePassword() {
  submittedForm.value = true;
  if (v$.value.$invalid) return;
  errorMessage.value = undefined;
  UserPasswordsService.putUserPassword({
    requestBody: passwordData.value,
  })
    .then(() => {
      const toast = toastStore();
      toast.changeToastState({
        severity: t("sidebarFooter.changePassword.successMessage"),
        summary: "",
        type: "success",
      });
      dialogRef.value.close();
    })
    .catch((error) => {
      errorMessage.value = error.body.message;
    });
}
</script>
