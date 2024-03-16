<template>
  <div class="countCard flex justify-content-around">
    <div v-for="(field, index) in fields" :key="index">
      <div
        :class="
          'card xl:flex justify-content-between w-17rem px-2 hidden ' + field
        "
        :style="`background-color:var(--secondary-background-color-kubak)`"
        style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px"
      >
        <div class="flex flex-column justify-content-between w-full">
          <div class="flex align-items-center justify-content-between mt-1">
            <p class="text-lg">
              {{ $t(`transportation.dashboard.cards.title.${field}`) }}
            </p>
          </div>
          <div class="flex justify-content-between w-full mt-2">
            <div
              class="flex align-items-center"
              v-for="(region, index) in totalCounts[field]"
              :key="index"
            >
              <p class="mx-1 text-md">
                {{ region.name }}
              </p>
              <h1>{{ region.count }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps(["totalCounts"]);
const totalCounts = ref<any>(props.totalCounts ?? []);

const loading = ref(true);

watch(
  () => props.totalCounts,
  () => {
    totalCounts.value = props.totalCounts;
  }
);
setInterval(() => {
  loading.value = !loading.value;
}, 1000);

const fields = ref([
  "completedTaskStates",
  "canceledTaskStates",
  "requestStates",
]);
</script>
<style lang="scss">
.countCard {
  height: 80px;
  width: 100%;
  z-index: 900;
  top: 0;
  position: absolute;
  .completedTaskStates {
    border-bottom: 3px solid #eb6f33;
  }
  .canceledTaskStates {
    border-bottom: 3px solid #d91010;
  }
  .requestStates {
    border-bottom: 3px solid #0b84a5;
  }
}
.refreshButton {
  cursor: pointer;
  &:hover {
    background-color: var(--icon-background-color-kubak);
  }
  button {
    background-color: transparent !important;
    border: transparent !important;
  }
}
</style>
