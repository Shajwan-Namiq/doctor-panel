<template>
  <div class="cardWrapper pt-8 flex justify-content-center">
    <div id="mapContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import { TaskService } from "@/backend/transport";

let map;
const tileLayer = ref(
  "https://api.mapbox.com/styles/v1/bnar98/clbotbuhk000b15lqtoshqvi0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A"
);
const tasks = ref();

function getAllTasks() {
  TaskService.listTasks({}).then((Response) => {
    tasks.value = Response?.items;
    tasks.value?.map((task) => {
      if (task.Member) {
        const marker = new leaflet.Marker([task.Member.X, task.Member.Y]);
        marker.addTo(map);
      }
    });
  });
}
function mapRender() {
  map = leaflet
    .map("mapContainer", {
      zoomControl: false,
    })
    .setView([35.564558, 45.437937], 12);
  leaflet
    .tileLayer(tileLayer.value, {
      subdomains: ["a", "b"],
      maxZoom: 18,
      id: "cl5z8606q002o14odi8ee3hjr",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
    })
    .addTo(map);
  const marker = new leaflet.Marker([35.564558, 45.437937]);
  marker.addTo(map);
  // const marker = new leaflet.Marker([35.574555, 45.447955]);
  // marker.addTo(map);
}
onMounted(() => {
  mapRender();
  getAllTasks();
});
</script>
