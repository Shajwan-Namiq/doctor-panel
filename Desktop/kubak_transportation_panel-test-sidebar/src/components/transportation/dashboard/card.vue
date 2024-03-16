<template>
  <div
    class="dashboardCard flex align-items-center px-2 justify-content-between px-3"
  >
    <div class="icon flex justify-content-center align-items-center">
      <i class="pi pi-user"></i>
    </div>
    <div class="text-center">
      <h2><count-up :end-val="1000" :duration="2"> </count-up></h2>
      <p>{{ props.info }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CountUp from "vue-countup-v3";
const props = defineProps(["info"]);
</script>
<style lang="scss">
.dashboardCard {
  height: 70px;
  width: 230px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #888888;
  background-color: white;
  .icon {
    background-color: #ed7f2270;
    height: 45px;
    width: 45px;
    border-radius: 10px;
    i {
      font-size: 18px;
      color: #ed7f22 !important;
    }
  }
  p {
    color: gray !important;
  }
}
.countup-wrap {
  color: black;
}
</style>
