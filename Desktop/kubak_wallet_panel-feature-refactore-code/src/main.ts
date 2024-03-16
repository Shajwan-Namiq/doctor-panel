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
import { ref } from "vue";
import { validateAndLoadUserState } from "./middlewares/auth";
import { RoleStore } from "./stores/common/role";
import { UserService } from "./backend/wallet";

//
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

/////////////////////////////////////////////////

////////////////////////////////////////////////
async function initializeApp() {
  const isValid = await validateAndLoadUserState();
  if (isValid) {
    loadPolicies(app); // Pass the app variable to the loadPolicies function
    app.mount("#app");
  } else {
    console.error("User validation failed.");
  }
}
initializeApp();

export async function loadPolicies(app) {
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
    app.directive("default-image", async (el, binding) => {
      el.addEventListener("error", () => {
        el.style.filter = "grayscale(100%)";
        el.src = defaultImage;
      });
    });
  });
  app.use(router);
  store.changeAppReady(true);
}

export { app };
