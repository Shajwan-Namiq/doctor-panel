<template>
  <div class="px-4">
    <div class="flex align-items-center justify-content-between">
      <div class="flex">
        <Avatar
          :image="getImage(passenger.clientPhotoUrl)"
          shape="circle"
          class="h-4rem w-4rem"
          style="border: 2px solid #35b368"
          v-if="passenger.clientPhotoUrl"
        />
        <Avatar
          v-else
          label="P"
          shape="circle"
          class="h-4rem w-4rem"
          style="border: 2px solid #35b368"
        />
        <div class="mx-4">
          <h3>{{ passenger.clientName }}</h3>
        </div>
      </div>
      <div class="-mt-4">
        <Button
          icon="pi pi-user"
          class="p-button-secondary"
          @click="userDetail"
        />
        <!-- <Button icon="pi pi-ban" class="p-button-danger mx-2" /> -->
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
        <p class="mx-3">{{ passenger.clientPhoneNumber }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Avatar from "primevue/avatar";
import { ref, watch } from "vue";
import { Gender, type TripStatusDetail } from "@/backend/transport";
import { getImage } from "@/composables/getImage";
import { useRouter } from "vue-router";

const props = defineProps(["taskDetail"]);

const passenger = ref<TripStatusDetail>({
  clientGender: Gender.FEMALE,
  clientName: "",
  clientPhoneNumber: "",
  clientPhotoUrl: "",
});
const router = useRouter();
addTaskDetail();
watch(
  () => props.taskDetail,
  () => {
    addTaskDetail();
  },
  { deep: true }
);

function addTaskDetail() {
  for (const field in props.taskDetail) {
    if (passenger.value.hasOwnProperty(field)) {
      passenger.value[field] = props.taskDetail[field];
    }
  }
}
function userDetail() {
  router.push({
    name: "passengerDetail",
    query: {
      phoneNumber: passenger.value.clientPhoneNumber,
    },
  });
}
</script>
