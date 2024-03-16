<!-- <template>
  <toastComponent />
  <div id="sign-in-button"></div>
  <div class="loginPageContainer">
    <div class="loginCard">
      <div @keyup.enter="loginByEmail" v-if="loginBy == 'email'">
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
                  ? $t("validationMessages.required", {
                      field: $t("fields.email"),
                    })
                  : $t("authPage.login.emailInputPlaceholder")
              }}</label>
            </span>
          </div>
        </div>
        <div class="field col-12 md:col-4 formControl">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-eye"></i>
            </span>
            <span class="p-float-label">
              <Password
                v-model="loginInfo.password"
                :feedback="false"
                :toggleMask="true"
                :class="{
                  'p-invalid': v$.password.$invalid && loginInfo.submittedValue,
                }"
              />
              <label for="inputgroup" class="p-invalid">{{
                v$.password.$invalid && loginInfo.submittedValue
                  ? $t("validationMessages.required", {
                      field: $t("fields.password"),
                    })
                  : $t("authPage.login.passwordInputPlaceholder")
              }}</label>
            </span>
          </div>
        </div>
        <div class="formControl submitButton">
          <Button
            :label="$t('authPage.login.submitButton')"
            @click="loginByEmail"
            :loading="loginInfo.Loading"
          />
        </div>
      </div>
      <Toast />

      <div class="loginBy flex justify-content-end">
        <p @click="openDialog()">
          {{ $t("authPage.login.forgotPassword") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import resetPassword from "./resetPassword.vue";
//primevue components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Toast from "primevue/toast";
import { useDialog } from "primevue/usedialog";
//primevue functions
// validation
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
//models
import { requestStatus } from "@/stores/common/requestStatus";
import { AuthenticationService } from "@/backend/auth";
import toastComponent from "@/common/interfaces/toastComponent.vue";

const requeststatus = requestStatus();

const loginInfo = reactive({
  email: "",
  password: "",
  submittedValue: false,
  Loading: false,
  phoneNumber: "",
});
const emailRules = {
  email: { required, email },
  password: { required },
};
const loginBy = ref("email");
const v$ = useVuelidate(emailRules, loginInfo);

async function loginByEmail() {
  loginInfo.Loading = true;
  requeststatus.ChangeLoadingStatus(true);
  AuthenticationService.postLogin({
    requestBody: {
      email: loginInfo.email,
      password: loginInfo.password,
    },
  })
    .then((res) => {
      localStorage.setItem("accessToken", res?.accessToken ?? "");
      localStorage.setItem("refreshToken", res?.refreshToken ?? "");
      window.location.reload();
      requeststatus.ChangeLoadingStatus(false);
    })
    .catch(() => {
      requeststatus.ChangeLoadingStatus(false);
      loginInfo.Loading = false;
    });
}
const dialog = useDialog();
function openDialog() {
  dialog.open(resetPassword);
}
</script>

<style lang="scss">
@import "@/styles/theme/login.scss";
</style> -->

<!-- <script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setTokens } from "@/middlewares/authService";
import {
  ServicePanelTransitionConsumerService,
  ServicePanelType,
} from "@/backend/auth";

const router = useRouter();

// Move the declaration of handleLogin before its call
const handleLogin = async () => {
  const currentUrl = new URL(window.location.href);
  const pathSegments = currentUrl.pathname.split("/");
  const tokenSegmentIndex = pathSegments.findIndex((segment) =>
    segment.startsWith("key=")
  );
  // Ensure that you found the segment before trying to access it
  if (tokenSegmentIndex === -1) {
    console.error("Key not found in URL");
    return; // Exit the function if key segment isn't found
  }
  const keyValue = pathSegments[tokenSegmentIndex].split("key=")[1];

  try {
    const decryptedKey = decryptKeyValue(keyValue); // Make sure decryptKeyValue is defined somewhere
    const response =
      await ServicePanelTransitionConsumerService.postConsumeServicePanelTransition(
        {
          requestBody: {
            servicePanelType: ServicePanelType.TAXI,
            key: decryptedKey,
          },
        }
      );

    if (response.accessToken && response.refreshToken) {
      setTokens(response.accessToken, response.refreshToken);
      router.push({ name: "home" });
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

handleLogin();
</script> -->
