<template>
  <div class="px-4">
    <div class="flex align-items-center justify-content-between">
      <div class="flex">
        <Avatar
          :image="getImage(servant.servantAvatarUrl)"
          shape="circle"
          class="h-4rem w-4rem"
          style="border: 2px solid #35b368"
          v-if="servant.servantAvatarUrl"
        />
        <Avatar
          v-else
          :label="servant.servantFullName?.charAt(0) ?? ''"
          shape="circle"
          class="h-4rem w-4rem"
          style="border: 2px solid #35b368"
        />
        <div class="mx-4">
          <h3>{{ servant.servantFullName }}</h3>
          <p>{{ servant.servantId }}</p>
        </div>
      </div>
      <div class="-mt-4">
        <Button
          icon="pi pi-user"
          class="p-button-secondary"
          @click="servantDetail"
        />
      </div>
    </div>
    <div class="flex justify-content-between my-4">
      <div class="flex flex-column">
        <div class="flex align-items-center">
          <ion-icon
            name="call-outline"
            class="text-xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <h4>{{ $t("transportation.servant.detail.mobile") }}</h4>
        </div>
        <p class="mx-3">{{ servant.servantPhoneNumber }}</p>
      </div>
      <div class="flex flex-column">
        <div class="flex align-items-center">
          <ion-icon
            name="business-outline"
            class="text-xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <h4>{{ $t("auth.area.region") }}</h4>
        </div>
        <p class="mx-3">{{ servant.servantRegionName }}</p>
      </div>
      <div class="flex flex-column">
        <div class="flex align-items-center">
          <ion-icon
            name="locate-outline"
            class="text-xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <h4>{{ $t("transportation.servant.detail.address") }}</h4>
        </div>
        <p class="mx-3">{{ servant.servantAddress }}</p>
      </div>
      <div class="flex flex-column">
        <div class="flex align-items-center">
          <ion-icon
            name="color-filter-outline"
            class="text-xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <h4>{{ $t("transportation.servant.detail.status") }}</h4>
        </div>
        <p class="mx-3">{{ servant.servantStatus }}</p>
      </div>
      <div class="flex flex-column">
        <div class="flex align-items-center">
          <ion-icon
            name="car-outline"
            class="text-2xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <div class="px-2 border-round-sm" style="border: 1px solid black">
            <h4>{{ servant.vehiclePlaque }}</h4>
          </div>
        </div>
        <p class="mx-5">{{ servant.vehicleModel }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Avatar from "primevue/avatar";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ServantStatusEnum, type TripStatusDetail } from "@/backend/transport";
import { getImage } from "@/composables/getImage";

const props = defineProps(["taskDetail"]);
const servant = ref<TripStatusDetail>({
  servantFullName: "",
  servantId: 0,
  servantPhoneNumber: "",
  servantRegionName: "",
  servantAddress: "",
  servantStatus: ServantStatusEnum.ONLINE,
  servantAvatarUrl: "",
  vehicleModel: "",
  vehiclePlaque: "",
});
addServantData();
watch(
  () => props.taskDetail,
  () => {
    addServantData();
  },
  { deep: true }
);

function addServantData() {
  for (const field in props.taskDetail) {
    if (servant.value.hasOwnProperty(field)) {
      servant.value[field] = props.taskDetail[field];
    }
  }
}
const router = useRouter();
function servantDetail() {
  router.push({
    name: "detailServant",
    params: {
      id: servant.value.servantId,
    },
  });
}
</script>
