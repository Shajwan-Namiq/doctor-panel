<template>
  footer
  <!-- <div :class="[sidebarFooterClassName, 'sidebarFooter p-component']"> -->
  <!-- <div class="sidebarFooterContainer">
      <div class="userContainer" @click="toggleFooter">
        <div class="userInfo">
          <Avatar
            :image="getImage(userInfo.photoUrl)"
            v-if="userInfo.photoUrl"
            shape="circle"
            class="mx-2"
            style="height: 60px; width: 60px"
          />
          <Avatar
            class="mx-2"
            v-else-if="userInfo.displayName"
            :label="userInfo.displayName.charAt(0).toUpperCase()"
            shape="circle"
            style="height: 60px; width: 60px"
          />
          <Avatar
            v-else
            icon="pi pi-user"
            shape="circle"
            class="mx-2"
            style="height: 60px; width: 60px"
          />

          <div class="userDetail flex align-items-center">
            <p class="userName">
              {{ userInfo.displayName ?? $t("sidebarFooter.emptyName") }}
            </p>
            <i class="pi pi-angle-right rotateIcon"></i>
          </div>
        </div>
      </div>
      <div class="userActions" v-if="isExpandFooter">
        <div
          class="userActionItem"
          v-for="action in userActions"
          :key="action.label"
          @click="userActionSelected(action.action)"
        >
          <i :class="[action.icon, 'itemIcon']"></i>
          <p class="mx-2">{{ action.label }}</p>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
</template>
<!-- <script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import { getImage } from "@/composables/getImage";
////types
import { dialogStatus } from "@/stores/common/dialogRef";
import { useI18n } from "vue-i18n";
import ChangePassword from "./changePassword.vue";
import { useDialog } from "primevue/usedialog";

const { t } = useI18n();
const router = useRouter();
const props = defineProps(["userInfo"]);
const userInfo = props.userInfo;
const isExpandFooter = ref<boolean>(false);
const sidebarFooterClassName = ref("sidebarFooterCollapse");
const dialog = useDialog();
const userActions = ref([
  {
    label: t("sidebarFooter.actions.profile"),
    icon: "pi pi-fw pi-user",
    action: "Profile",
  },
  {
    label: t("sidebarFooter.actions.resetPassword"),
    icon: "pi pi-lock",
    action: "ChangePassword",
  },
  {
    label: t("sidebarFooter.actions.logout"),
    icon: "pi pi-fw pi-power-off",
    action: "Logout",
  },
]);
const toggleFooter = () => {
  sidebarFooterClassName.value =
    sidebarFooterClassName.value == "sidebarFooterExpand"
      ? "sidebarFooterCollapse"
      : "sidebarFooterExpand";
  isExpandFooter.value = !isExpandFooter.value;
};

const userActionSelected = (action) => {
  switch (action) {
    case "Profile":
      router.push({
        name: "userProfile",
      });
      break;
    case "ChangePassword":
      changePassword();
      break;
    case "Logout":
      logout();
      break;
  }
};
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.reload();
  // router.push({
  //   name: "login",
  // });
}
const dialogStatusStore = dialogStatus();
function changePassword() {
  dialog.open(ChangePassword, {
    props: {
      header: t("sidebarFooter.changePassword.title"),
      breakpoints: {
        "2000px": "30vw",
        "1500px": "50vw",
        "960px": "90vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
watch(
  () => dialogStatusStore.isOpen,
  () => {
    if (!dialogStatusStore.isOpen) {
      dialogStatusStore.closeDialog();
    }
  }
);
</script>
<style lang="scss">
@import "@/styles/theme/transportation-layout/sidebarFooter.scss";
</style> -->
