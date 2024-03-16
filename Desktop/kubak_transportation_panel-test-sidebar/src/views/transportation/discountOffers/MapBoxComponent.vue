<template>
  <div class="map-controls"></div>
  <div
    ref="mapContainer"
    class="map-container"
    :class="{ 'cursor-pointer': addPointEnabled }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css"; // Include Leaflet Draw CSS
import "leaflet-draw"; // Include Leaflet Draw
import mapboxgl from "mapbox-gl";

const markerAdded = ref(false);

export default defineComponent({
  name: "MapBoxComponent",
  emits: ["updateLocation"],
  setup(_, { emit }) {
    const mapContainer = ref(null);
    let mapboxMap;
    let leafletMap;
    const state = reactive({
      addPointEnabled: false,
    });

    onMounted(async () => {
      await nextTick(); // Ensures the DOM is updated

      // Initialize Mapbox GL JS Map
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A";

      mapboxMap = new mapboxgl.Map({
        container: mapContainer.value,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [45.4351, 35.5558],
        zoom: 12,
      });

      // Initialize Leaflet Map
      leafletMap = L.map(mapContainer.value, {
        center: [45.4351, 35.5558],
        zoom: 12,
        zoomControl: false, // Disable zoom control buttons
      });

      // Initialize the FeatureGroup to store editable layers
      const drawnItems = new L.FeatureGroup();
      leafletMap.addLayer(drawnItems);

      // Initialize the draw control with only the marker option
      const drawControl = new L.Control.Draw({
        draw: {
          marker: true,
          polygon: false,
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
        },
      });
      leafletMap.addControl(drawControl);

      leafletMap.on(L.Draw.Event.CREATED, function (e) {
        // if (markerAdded.value) {
        //   return; // Prevent adding more than one marker
        // }

        console.clear();
        const type = e.layerType;
        const layer = e.layer;

        drawnItems.addLayer(layer);

        if (type === "marker") {
          const lat = layer.getLatLng().lat;
          const lng = layer.getLatLng().lng;
          emit("updateLocation", lat, lng);

          markerAdded.value = true;

          emit("closeModal");
          //
        }
      });
    });

    return {
      mapContainer,
      addPointEnabled: state.addPointEnabled,
    };
  },
});
</script>

<style>
.map-container {
  height: 400px;
}
/* Leaflet CSS */
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
