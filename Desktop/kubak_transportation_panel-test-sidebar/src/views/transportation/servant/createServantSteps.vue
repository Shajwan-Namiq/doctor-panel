<template>
  <div class="page-style">
    <div class="page-container">
      <div class="py-2 -mb-6">
        <div class="stepsWrapper p-5">
          <Steps :model="items" />
        </div>
      </div>
    </div>
    <div class="page-container">
      <div class="py-2">
        <div class="stepsWrapper">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Steps from "primevue/steps";
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  router.push({
    name: "userExist",
  });
});
const items = ref([
  {
    label: "check user",
    to: "/transportation/servant/create/checkUser",
  },
  {
    label: "Create Servant",
    to: "/transportation/servant/create/createServant",
  },
  {
    label: "Create Vehicle",
    to: "/transportation/servant/create/createVehicleServant",
  },
]);
onUnmounted(() => {
  localStorage.removeItem("createServantId");
  localStorage.removeItem("newServantId");
});
</script>
<style lang="scss">
.stepsWrapper {
  padding-bottom: 20px;
  border-radius: 5px;
  background-color: var(--secondary-background-color-kubak);
}
</style>
