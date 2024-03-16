/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable prettier/prettier */
import { createPinia } from "pinia";
import { createApp } from "vue";
import { AES, enc } from "crypto-js";
import PrimeVue from "primevue/config";
/// dependencies
import App from "./App.vue";
import i18n from "./locales/i18n";
import router from "./router";
///styles
// import './tailwind.css';

import "@/assets/main.scss";
// import 'primevue/resources/themes/vela-blue/theme.css'
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
//// import primevue components
import Dropdown from "@/common/interfaces/dropdownPrimeVue.vue";
import FileUpload from "@/common/interfaces/fileUpload/FileUpload.vue";
import { currentUser } from "@/stores/currentUser";
// import { initializeApp } from "firebase/app";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Row from "primevue/row";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import Divider from "primevue/divider";
import { addPolicies } from "@/services/addPolicies";
import defaultImage from "./static/images/image-not-found.png";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import errorHandler from "@/global/errorHandler";
import ProgressSpinner from "primevue/progressspinner";
import { Field, Form, ErrorMessage, configure } from "vee-validate";
import { authentication } from "./stores/authentication";
import { getTokens, setTokens } from "./middlewares/authService";
import {
  ServicePanelTransitionConsumerService,
  ServicePanelType,
} from "./backend/auth";

configure({
  generateMessage: ({ field }) => `The ${field} field is required.`,
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(PrimeVue, { ripple: true });
app.use(i18n);

app.component("Field", Field);
app.component("Form", Form);
app.component("ErrorMessage", ErrorMessage);

app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Dropdown", Dropdown);
app.component("FileUpload", FileUpload);
app.component("InputText", InputText);
app.component("MultiSelect", MultiSelect);
app.component("InputNumber", InputNumber);
app.component("Divider", Divider);
///use primevue components
app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.component("ConfirmDialog", ConfirmDialog);
app.component("DynamicDialog", DynamicDialog);
app.component("ProgressSpinner", ProgressSpinner);

app.config.globalProperties.$appErrorHandler = errorHandler;
app.config.errorHandler = errorHandler;
app.mount("#app");

/////////////////////////////////////////////////

// Decryption function for the URL that comes from the main panel
const decryptKeyValue = (encryptedKey: string) => {
  const passphrase = "hs%jd#@sf$h#h@(jsd8*awp892348*wrercxnv";
  const bytes = AES.decrypt(decodeURIComponent(encryptedKey), passphrase);
  const originalKey = bytes.toString(enc.Utf8);
  return originalKey;
};

// Function adjusted to extract the key from the pathname
const extractKeyFromPath = (path: string) => {
  const keyPattern = /key=([^\/]+)/; // Regex to find 'key=<value>'
  const match = path.match(keyPattern);
  return match ? match[1] : null;
};

// Async function to handle token setting
const handleTokenSetting = async () => {
  const currentUrl = new URL(window.location.href);
  const keyValue = extractKeyFromPath(currentUrl.pathname);

  if (!keyValue) {
    console.error("Key not found in URL");
    return;
  }

  try {
    const decryptedKey = decryptKeyValue(keyValue);
    const response =
      await ServicePanelTransitionConsumerService.postConsumeServicePanelTransition(
        {
          requestBody: {
            servicePanelType: ServicePanelType.TAXI,
            key: decryptedKey,
          },
        }
      );

    // Assuming you have a correct implementation for setTokens
    if (response.accessToken && response.refreshToken) {
      setTokens(response.accessToken, response.refreshToken);
    }

    const tokens = getTokens();
    if (tokens.accessToken && tokens.refreshToken) {
      router.replace({ name: "baseRoles" });
    } else {
      handleTokenSetting();
    }
  } catch (e) {
    console.error("Error setting tokens:", e);
  }
};

handleTokenSetting();

////////////////////////////////////////////////

const authenticationStore = authentication();
authenticationStore.addTokens();
const store = currentUser();


addPolicies(store).then(() => {
  app.directive("can", async (el, binding) => {
    if (el && binding.value) {
      const contains = (authorizeMeta: string[], userRole: object) =>
        authorizeMeta.some((el) => el in userRole);
      const authorizes = Object.fromEntries(
        binding.value.map((key: string) => [key, true])
      );
      if (contains(store.policies!, authorizes)) {
        return (el.style.display = "");
      } else {
        return (el.style.display = "none");
      }
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.directive("default-image", async (el, binding) => {
    el.addEventListener("error", () => {
      el.style.filter = "grayscale(100%)";
      el.src = defaultImage;
    });
  });
  app.use(router);

  store.changeAppReady(true);
});
