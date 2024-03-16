<template>
  <ProgressBar
    mode="indeterminate"
    style="height: 0.2em"
    v-if="requeststatus.loading"
  />
  <div :class="['authLayout', pageDirection]">
    <div class="topBackgroundImage"></div>
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
import type { pageDirectionType } from "@/common/models/common/pageLayout";
const pageDirection: pageDirectionType["ltr"] | pageDirectionType["rtl"] =
  (localStorage.getItem("direction") as
    | pageDirectionType["ltr"]
    | pageDirectionType["rtl"]) ?? "ltr";
const requeststatus = requestStatus();
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
.authLayout {
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
