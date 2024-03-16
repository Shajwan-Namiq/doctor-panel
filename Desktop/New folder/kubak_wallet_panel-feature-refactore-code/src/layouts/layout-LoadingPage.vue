<template>
  <div
    :class="['loadingLayout']"
    class="flex justify-content-center align-items-center"
  >
    <div class="topBackgroundImage"></div>
    <loading />
  </div>
</template>
<script setup lang="ts">
import loading from "@/views/common/loading.vue";
</script>

<style lang="scss">
// @import "../assets/main.scss";

.topBackgroundImage {
  background-image: url("../static/images/authTopBackgroundImage.png");
  height: 200px;
  width: 100%;
  position: absolute;
  top: 0;
}
.loadingLayout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  min-height: calc(100vh - 16px);
  img {
    height: 30px;
    margin-left: 10px;
  }
}
</style>
