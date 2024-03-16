<template>
  <div
    class="card xl:flex justify-content-between w-17rem px-2 hidden"
    :style="`border-bottom:3px solid ${props.color};background-color:var(--secondary-background-color-kubak)`"
    style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px"
  >
    <div class="flex flex-column justify-content-between w-full">
      <p class="text-lg">
        {{ $t(`transportation.dashboard.cards.title.${props.title}`) }}
      </p>

      <div
        class="flex justify-content-between w-full"
        v-if="userData.userInfo.roles.some((x) => x.name == 'SuperAdmin')"
      >
        <div class="flex align-items-center">
          <p class="mx-1 text-md">{{ $t("auth.area.topRegions.slemani") }}</p>
          <h1>{{ props.dataCount?.Slemani }}</h1>
        </div>
        <div class="flex align-items-center">
          <p class="mx-1 text-md">{{ $t("auth.area.topRegions.erbil") }}</p>
          <h1>{{ props.dataCount?.Erbil }}</h1>
        </div>
      </div>
      <div class="flex justify-content-between w-full" v-else>
        <div class="flex align-items-center">
          <p class="mx-1 text-md">
            {{ $t(`auth.area.topRegions.${userData.userInfo.region.name}`) }}
          </p>
          <h1>{{ props.dataCount![userData.userInfo.region.name] }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { currentUser } from "@/stores/currentUser";

const props = defineProps({
  title: String,
  dataCount: Object,
  color: String,
});
const userData = currentUser();
</script>
