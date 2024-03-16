<template>
  <div
    class="col-12 md:col-6 xl:col-3"
    v-for="(card, index) in cards"
    :key="index"
  >
    <div
      class="card flex justify-content-between"
      :style="`border-bottom:2px solid ${card.color};--hover-color:${card.color}20`"
      @click="navigate(card.page)"
    >
      <div class="flex flex-column justify-content-between">
        <p class="text-lg">
          {{ $t(`transportation.dashboard.cards.title.${card.title}`) }}
        </p>
        <h1 class="flex">
          {{ count[card.value] }}
        </h1>
      </div>
      <div
        class="pt-2 flex flex-column justify-content-between align-items-center h-full"
      >
        <div
          class="cardIconContainer p-2 flex justify-content-center align-items-center"
          :style="`background-color: ${card.color}20`"
        >
          <ion-icon
            :name="card.icon"
            class="text-4xl"
            :style="`color:${card.color}`"
          ></ion-icon>
        </div>
        <div class="w-4rem text-center">
          <p class="text-xs">
            {{
              moment(dashboardStore.filterData.startDate).format("DD/MM/YYYY")
            }}
          </p>
          <p class="text-xs mt-1">
            {{ moment(dashboardStore.filterData.endDate).format("DD/MM/YYYY") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { DashboardStore } from "./dashboardStore";
import moment from "moment";
const dashboardStore = DashboardStore();
const props = defineProps(["cards"]);
const router = useRouter();
const cards = props.cards;
const count = ref(
  dashboardStore.cardCounts ?? {
    totalServants: 0,
    totalMembers: 0,
    totalSuccessTasks: 0,
    totalRequests: 0,
  }
);
watch(
  () => dashboardStore.cardCounts,
  () => {
    count.value = dashboardStore.cardCounts;
  },
  { deep: true }
);

function navigate(page) {
  router.push({
    name: page,
  });
}
</script>

<style lang="scss">
.cardIconContainer {
  border-radius: 5px;
}
</style>
