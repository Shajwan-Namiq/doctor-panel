<template>
  <div>
    <div class="mainLayout" style="height: 100vh">
      <toastComponent errorMessage="error" type="success" />
      <div :class="sidebarClass">
        <div class="sidebarHeader">
          <div class="logoHeader">
            <img src="@/static/images/kubak.png" class="kubakimg" />
            <img src="@/static/images/logo.png" class="kubakLogo" />
          </div>
          <i
            class="pi pi-times closeSidebarMobile"
            @click="sidebarCollapseExpand"
          ></i>
        </div>
        <div class="sidebarBody">
          <sidebarMenu @click="expandSidebar" />
        </div>
        <sidebarFooter :userInfo="userInfo" />
      </div>

      <div ref="layout" :class="['layoutWrapper', currentTheme]">
        <ProgressBar
          mode="indeterminate"
          style="height: 0.3em"
          v-if="requeststatus.loading"
        />
        <div class="topbar">
          <div style="display: flex">
            <div class="toggleSidebar" @click="sidebarCollapseExpand()">
              <i class="pi pi-bars"></i>
            </div>
            <!-- <Button
              :label="copyButtonLabel"
              @click="copyToken"
              v-tooltip.bottom="'copy access token'"
              class="p-button-secondary"
            />
            <Button
              label="check connection"
              @click="checkConnection"
              class="p-button-secondary mx-2"
            /> -->
            <!-- <div class="braedCrumb hidden md:block">
              <Breadcrumb :model="breadcrumbs">
                <template #item="{ item }">
                  <div class="flex" v-if="item.text != 'transportation'">
                    <div class="cursor-pointer">
                      <router-link :to="item.url ?? ''" class="routerLink">
                        <p class="mx-1">
                          {{ $t(`routes.${item.text}`) }}
                        </p>
                      </router-link>
                    </div>
                    <div>
                      <ion-icon
                        :name="breadcrumbIcon()"
                        class="mt-1"
                      ></ion-icon>
                    </div>
                  </div>
                </template>
              </Breadcrumb>
            </div> -->
          </div>
          <div class="topbarActions">
            <i
              :class="['pi', toggleScreenIcon, ' toggleScreen']"
              @click="toggleScreen()"
            ></i>
            <i :class="['pi ', themeIcon]" @click="toggleTheme()"></i>
            <div class="currentLanguage">
              <Dropdown
                v-model="currentLanguage"
                :options="languages"
                optionLabel="name"
                placeholder="Select a language"
                class="languageDropdown"
                @change="changeLanguage"
              >
                <template #value="slotProps">
                  <div
                    class="country-item country-item-value"
                    v-if="slotProps.value"
                  >
                    <img :src="getImageUrl(slotProps.value)" />
                    <div>{{ slotProps.value }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="languageOptions">
                    <img :src="getImageUrl(slotProps.option)" />
                    <div>
                      {{ $t(`auth.language.${slotProps.option}`) }}
                    </div>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div :class="['pageContent', pageContentClass]">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EnImageUrl from "@/static/images/languages/en.jpg";
import CkbImageUrl from "@/static/images/languages/ku.jpg";
import ArImageUrl from "@/static/images/languages/ar.png";

import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
/// components
import sidebarMenu from "../components/layout/transportation/sidebar/sidebarMenu.vue";
import sidebarFooter from "../components/layout/transportation/sidebar/sidebarFooter.vue";
import toastComponent from "@/common/interfaces/toastComponent.vue";

//// primeVue components
import Dropdown from "primevue/dropdown";
import ProgressBar from "primevue/progressbar";
// import Menu from "primevue/menu";

import type { pageDirectionType } from "@/common/models/common/pageLayout";
import { requestStatus } from "@/stores/common/requestStatus";
import { currentUser } from "@/stores/currentUser";
// import { NotificationStore } from "@/stores/notification";
import { Language } from "@/backend/auth/models/Language";

// import connection from "@/services/signalR";
// import { HubConnectionState } from "@microsoft/signalr";

// const notificationStore = NotificationStore();
// notificationStore.notificationStart();
const currentUserStore = currentUser();

const route = useRoute();
const breadcrumbs = ref();
watch(
  () => route.fullPath,
  () => {
    breadcrumbData();
  }
);
onMounted(() => {
  if (!localStorage.getItem("direction")) {
    localStorage.setItem("direction", "ltr");
  }
});
breadcrumbData();
function breadcrumbData() {
  breadcrumbs.value = route.matched.map((route) => {
    return {
      text: route.meta.breadcrumb || route.name,
      url: route.path,
    };
  });
}
const requeststatus = requestStatus();
const sidebarClass = ref("sidebar expand");

const pageContentClass = ref(
  sidebarClass.value == "sidebar expand" ? "hideContent" : "showContent"
);

const pageDirection: pageDirectionType["ltr"] | pageDirectionType["rtl"] =
  (localStorage.getItem("direction") as
    | pageDirectionType["ltr"]
    | pageDirectionType["rtl"]) ?? "ltr";

document.body.classList.add(pageDirection);

const themeIcon = ref("pi-sun");

const currentTheme = ref(
  localStorage.getItem("theme") ?? "bootstrap4-light-blue"
);
const currentLanguage = ref(localStorage.getItem("language") ?? Language.EN);
const layout = ref();
const languages = Object.keys(Language).map((key) => Language[key]);
const toggleScreenIcon = ref("pi-window-maximize");
let userInfo = {};
getCurrentUserDetail();
async function getCurrentUserDetail() {
  userInfo = currentUserStore.userInfo;
}
// async function checkConnection() {
//   if (connection.state == HubConnectionState.Connected) {
//     await connection.invoke("PingConnection");
//   }
// }
function toggleScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    toggleScreenIcon.value = "pi-window-minimize";
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    toggleScreenIcon.value = "pi-window-maximize";
  }
}
function sidebarCollapseExpand() {
  sidebarClass.value =
    sidebarClass.value == "sidebar collapse"
      ? "sidebar expand"
      : "sidebar collapse";
  pageContentClass.value =
    sidebarClass.value == "sidebar collapse" ? "showContent" : "hideContent";
}
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme")!;
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", nextTheme);
  document.body.classList.remove(currentTheme);
  document.body.classList.add(nextTheme);
}
async function changeLanguage() {
  localStorage.setItem("language", currentLanguage.value);
  localStorage.setItem(
    "direction",
    checkDirection(currentLanguage.value as Language)
  );

  await currentUserStore.updateLanguage(currentLanguage.value);
  window.location.reload();
}
function checkDirection(language: Language) {
  switch (language) {
    case Language.EN:
      return "ltr";
    case Language.AR:
      return "rtl";
    case Language.CKB:
      return "rtl";
    default:
      return "ltr";
  }
}

// const copyButtonLabel = ref("copy");
// async function copyToken() {
// let newAccessToken = auth.currentUser!.stsTokenManager.accessToken;
// if (
//   auth.currentUser!.stsTokenManager.expirationTime -
//     Math.floor(new Date().getTime()) <
//   300000
// ) {
//   await auth.currentUser?.getIdToken(true).then((accessToken) => {
//     newAccessToken = accessToken;
//   });
// }
// await navigator.clipboard.writeText(newAccessToken);
//   copyButtonLabel.value = "copied";
//   setTimeout(() => {
//     copyButtonLabel.value = "copy";
//   }, 5000);
// }
function expandSidebar() {
  if (sidebarClass.value == "sidebar collapse") {
    sidebarClass.value = "sidebar expand";
    pageContentClass.value = "hideContent";
  }
}
function getImageUrl(image) {
  switch (image) {
    case Language.EN:
      return EnImageUrl;
    case Language.CKB:
      return CkbImageUrl;
    case Language.AR:
      return ArImageUrl;
  }
}
</script>
<style lang="scss">
@import "@/styles/theme/transportation-layout/mainLayout.scss";
@import "primeicons/primeicons.css";

.notificationMenu {
  width: 250px;

  .p-menu {
    width: 250px !important;
  }
}

.p-menu .p-menuitem-link .p-menuitem-icon {
  color: var(--danger-color-kubak) !important;
}

.noWarning {
  .p-badge {
    display: none !important;
  }
}
</style>
