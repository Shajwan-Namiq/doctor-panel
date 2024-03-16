<template>
  <div class="test">
    <SpeedDial :model="items" direction="right" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SpeedDial from "primevue/speeddial";
const items = ref([
  {
    label: "Add",
    icon: "image1",
  },
  {
    label: "Update",
    icon: "image2",
  },
  {
    label: "Delete",
    icon: "image3",
  },
  {
    label: "Upload",
    icon: "image4",
  },
  {
    label: "Vue Website",
    icon: "image5",
  },
]);
</script>
<style lang="scss">
.test {
  top: 0;
  margin: 10px;
  .p-button.p-button-icon-only.p-button-rounded {
    border-radius: 10px !important;
  }
  .p-speeddial-action {
    box-shadow: 1px 1px 3px grey;
    border-radius: 10px;
  }
  /* background-color: antiquewhite; */
}
.p-speeddial-button {
  background-image: url("https://miro.medium.com/max/1400/0*rG5zP-u3tvMcvhsS.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
}
.p-button {
  background-image: url("https://miro.medium.com/max/1400/0*rG5zP-u3tvMcvhsS.jpg") !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border: 1px solid #ed7f22 !important;
}
.p-button:hover {
  filter: grayscale(40%);
}
.p-speeddial-item .image1 {
  height: 100%;
  width: 100%;
  background-image: url("https://miro.medium.com/max/1400/0*F4QsnZTYhz_xEO2P.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.p-speeddial-item .image2 {
  height: 100%;
  width: 100%;
  background-image: url("https://miro.medium.com/max/900/0*si0GnRAqoAwGL5GD.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.p-speeddial-item .image3 {
  height: 100%;
  width: 100%;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsdkJG5gNsbsFOW0Kf8KC72F6BrOmq7pd7nTAsBkvBDRNXLtg9gZYT3Z8eUAZHjUCLlAI&usqp=CAU");
  background-size: cover;
  background-repeat: no-repeat;
}
.p-speeddial-item .image4 {
  height: 100%;
  width: 100%;
  background-image: url("https://miro.medium.com/max/1200/0*yPSQlTHRvLaIVBcG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.p-speeddial-item .image5 {
  height: 100%;
  width: 100%;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/3/33/Riga_Old_Town_OSM_street_map.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
