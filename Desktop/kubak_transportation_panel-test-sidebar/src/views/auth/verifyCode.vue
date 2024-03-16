<template>
  <div id="sign-in-button"></div>
  <div class="loginPageContainer verifyCodeContainer">
    <div class="loginCard">
      <div>
        <div class="formControl">
          <ofcold-code
            v-model="code"
            auto-focus
            @update:modelValue="
              () => {
                if (code.length === 6) {
                  submitCode();
                }
              }
            "
          />
        </div>
      </div>
      <Toast />
      <div class="formControl submitButton">
        <Button
          :label="$t('authPage.login.submitButton')"
          @click="submitCode"
          :loading="requestStatusStore.loading"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { requestStatus } from "@/stores/common/requestStatus";

import OfcoldCode from "ofcold-security-code";
import Toast from "primevue/toast";
import { ref } from "vue";

const code = ref("");
const requestStatusStore = requestStatus();

function submitCode() {
  requestStatusStore.ChangeLoadingStatus(true);
}
</script>
<style lang="scss">
@import "@/styles/theme/login.scss";
.verifyCodeContainer {
  input[type="text"] {
    padding: 20px 10px;
    border-radius: 10px;
    font-family: var(--font-family);
    font-size: 1rem;
    color: var(--primary-text-color);
    background: var(--secondary-background-color-kubak);
    border: 1px solid var(--default-color-hover-kubak);
    border-radius: 4px;
  }
}
</style>
