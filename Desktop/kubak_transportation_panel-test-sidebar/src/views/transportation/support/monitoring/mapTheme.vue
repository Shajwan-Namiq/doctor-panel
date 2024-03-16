<template>
  <div>
    <SpeedDial
      :model="items"
      :radius="120"
      class="mapOptions"
      :mapDial="true"
      :currentMap="currentMap"
      direction="down"
    />
  </div>
</template>
<script setup lang="ts">
import SpeedDial from "@/common/interfaces/speeddial/SpeedDial.vue";
import { mapType } from "@/global/map";
import { ref } from "vue";
import { MonitoringStore } from "./monitoringStore";

const monitoringStore = MonitoringStore();
const selectedMap = localStorage.getItem("mapTileURL");

const currentMap = ref<any>(
  mapType.find((item) => item.url == selectedMap) ?? mapType[0]
);
const items = ref<any>([]);

monitoringStore.changeMapTile(currentMap.value?.url);

listMaps();
function listMaps() {
  items.value = [];
  for (const index in mapType) {
    const newItems: any = {
      image: mapType[index].image,
      url: mapType[index].url,
      command: (item) => {
        changeMap(item);
      },
    };
    if (currentMap.value.url != mapType[index].url) {
      items.value.push(newItems);
    }
  }
}
function changeMap(data) {
  currentMap.value = data.item;

  listMaps();
  monitoringStore.changeMapTile(currentMap.value?.url);
}
</script>
