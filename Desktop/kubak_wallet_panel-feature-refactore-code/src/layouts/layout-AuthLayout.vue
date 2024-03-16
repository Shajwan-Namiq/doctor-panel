<template>
  <ProgressBar
    mode="indeterminate"
    style="height: 0.2em"
    v-if="requeststatus.loading"
  />
  <div id="layout" :class="['authLayout']">
    <div :class="[backgroundImage + '-image']"></div>
    <slot />
    <div>
      <img src="../static/images/kubak.png" />
      <img src="../static/images/logo.png" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ProgressBar from "primevue/progressbar";
import { requestStatus } from "../stores/common/requestStatus";
//// type
import type { pageDirectionType } from "../common/models/common/pageLayout";
import { ref } from "vue";
const pageDirection: pageDirectionType["ltr"] | pageDirectionType["rtl"] =
  (localStorage.getItem("direction") as
    | pageDirectionType["ltr"]
    | pageDirectionType["rtl"]) ?? "ltr";

document.body.classList.add(pageDirection);
const requeststatus = requestStatus();
const backgroundImage = ref(localStorage.getItem("theme") ?? "light-blue");
</script>

<style lang="scss">
.light-image {
  background-image: url("../static/images/authTopBackgroundImagelight.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 200px;
  width: 100%;
  position: absolute;
  top: 0;
}
.dark-image {
  background-image: url("../static/images/authTopBackgroundImage.png");
  height: 200px;
  width: 100%;
  position: absolute;
  top: 0;
}
.authLayout {
  background-color: var(--background-color-kubak);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  min-height: calc(100vh);
  img {
    height: 30px;
    margin-left: 10px;
  }
}
</style>
