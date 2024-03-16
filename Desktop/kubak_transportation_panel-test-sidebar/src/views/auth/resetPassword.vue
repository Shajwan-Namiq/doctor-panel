<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <p class="text-lg mb-2">{{ $t("authPage.login.forgotPasswordHeader") }}</p>
    <div @keyup.enter="submitButton">
      <div class="field col-12 md:col-4 formControl">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              type="text"
              v-model="loginInfo.email"
              :class="{
                'p-invalid': v$.email.$invalid && loginInfo.submittedValue,
              }"
            />
            <label for="inputgroup">{{
              v$.email.$invalid && loginInfo.submittedValue
                ? $t("validationMesseges.required", {
                    field: $t("validationMesseges.fields.email"),
                  })
                : $t("authPage.login.emailInputPlaceholder")
            }}</label>
          </span>
        </div>
      </div>
      <div class="formControl submitButton">
        <Button
          :label="$t('authPage.login.submitButton')"
          @click="submitButton"
          :loading="loginInfo.Loading"
        />
      </div>
    </div>
    <Toast />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Toast from "primevue/toast";

const loginInfo = reactive({
  email: "",
  submittedValue: false,
  Loading: false,
});
const rules = {
  email: { required, email },
};
const v$ = useVuelidate(rules, loginInfo);

const submitButton = async () => {
  const result = await v$.value.$validate();
  loginInfo.submittedValue = true;
  if (result) {
    loginInfo.Loading = true;
  }
};
</script>
<style lang="scss">
.p-dialog-mask {
  background-color: rgba(39, 42, 56, 0.85);
}
</style>
