<template>
  <div class="relative">
    <div
      v-if="getCurrentUserRole()"
      :class="
        getDirection()
          ? 'flex justify-content-center align-items-center  badge-rtl'
          : 'flex justify-content-center align-items-center  badge'
      "
      :style="
        servant.regionId === 1
          ? 'background-color: #457b9d'
          : 'background-color: green'
      "
    >
      <span class="text-white text-xs">{{
        getRegionNameById(servant.regionId)?.charAt(0)
      }}</span>
    </div>

    <Avatar
      :image="getImage(servant.avatarUrl)"
      v-if="servant.avatarUrl"
      shape="circle"
      class="h-3rem w-3rem"
      :style="`border: 3px solid ${servantStatusColor(servant.status)}`"
    />
    <Avatar
      v-else
      :label="servant.fullName?.charAt(0)"
      shape="circle"
      class="h-3rem w-3rem"
      :style="`border: 3px solid ${servantStatusColor(servant.status)}`"
    />
  </div>
  <div class="flex flex-column align-items-center">
    <h3>{{ servant.fullName }}</h3>
    <p>{{ servant.servantId }}</p>
  </div>
  <div>
    <Button
      icon="pi pi-map-marker"
      class="h-2rem w-2rem mx-1"
      @click="detail"
    />
  </div>
</template>
<script lang="ts" setup>
import Avatar from "primevue/avatar";
import { onMounted, ref, watch, watchEffect } from "vue";
import { MonitoringStore } from "./monitoringStore";
import { getImage } from "@/composables/getImage";
import { servantStatusColor } from "@/global/transportation/servantStatus";
import type { ServantStatusDto } from "@/backend/transport";
import { RegionStore } from "@/stores/common/region";
import { currentUser } from "@/stores/currentUser";
// import useImageCompressor from "@/utils/useImageCompressor";

const props = defineProps(["servant"]);
const servant = ref<ServantStatusDto>(props.servant);

// compress image
// const { compressedImages, compressAndSetImage } = useImageCompressor();

// watchEffect(() => {
//   if (servant.value.avatarUrl) {
//     const imageUrl = getImage(servant.value.avatarUrl);
//     const requestId = servant.value.servantId;
//     compressAndSetImage(imageUrl, requestId);
//   }
// });

watch(
  () => props.servant,
  (newVal) => {
    servant.value = newVal;
  }
);
const monitoringStore = MonitoringStore();
function detail() {
  monitoringStore.showDetail(servant.value, "servant");
}

// get regions from main component
const regionStore = RegionStore();
// get all regions by ID
function getRegionNameById(regionId) {
  const region = regionStore.regions?.find((x) => x.id === regionId);
  return region ? region.name : "";
}

// return direction
onMounted(() => {
  getDirection();
});

function getDirection() {
  localStorage.getItem("direction");
  if (localStorage.getItem("direction") === "rtl") {
    return "rtl";
  }
}
//get current user role
const currentUserStore = currentUser();

onMounted(() => {
  getCurrentUserRole();
});

async function getCurrentUserRole() {
  await currentUserStore.getCurrentUserInfo();
  const baseRole = currentUserStore.baseRole;

  // Check if the baseRoles array includes an object with name 'SuperAdmin'
  const hasSuperAdminRole = baseRole.baseRoles.some(
    (role) => role.name === "SuperAdmin"
  );

  return hasSuperAdminRole;
}
</script>
