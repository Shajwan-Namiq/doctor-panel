<template>
  <TabView
    class="requestListContainer overflow-x-auto fadeindown"
    @tab-click="changeRequestListTripStatus"
    :style="showRequestsList ? 'height:230px' : 'height:50px'"
  >
    <TabPanel>
      <template #header>
        <i
          :class="showRequestsList ? 'pi pi-angle-down' : 'pi pi-angle-up'"
        ></i>
        <p v-if="!showRequestsList">show requestList</p>
        <div class="mx-2" v-if="showRequestsList" @click="preventHeaderClick">
          <div class="flex">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                placeholder="Search"
                class="w-full"
                @input="search"
                v-model="searchData"
              />
            </span>

            <div class="filterDropDown">
              <MultiSelect
                optionLabel="name"
                :hideContent="true"
                :dropdownIcon="'pi pi-filter'"
                style="height: 100%"
                :options="filterTripStatus"
                @change="changeTripStatus"
                :autoHeight="true"
                :loading="monitoringStore.loadingSocket"
                :disabled="monitoringStore.loadingSocket"
                v-model="selectedTripStatus"
              >
                <template #option="slotProps">
                  <div class="flex justify-content-start align-items-center">
                    <div
                      v-html="requestMarker(slotProps.option?.name, true)"
                    ></div>
                    <div class="mx-2">{{ slotProps.option?.name }}</div>
                  </div>
                </template>
              </MultiSelect>
            </div>

            <div
              class="mx-1"
              v-if="Object.keys(monitoringStore?.requestAlertData).length > 0"
            >
              <Button
                outlined
                label="close"
                icon="pi pi-times"
                @click="() => $emit('hideAlerts')"
              />
            </div>
          </div>
        </div>
      </template>

      <div style="min-height: 100px">
        <div
          ref="container"
          class="flex align-items-center"
          style="overflow-x: auto"
        >
          <div
            class="flex flex-column align-items-center mx-3 justify-content-center"
            style="min-width: 80px; height: 130px; cursor: pointer; width: auto"
            v-for="(request, index) in search()"
            :key="index"
            @click.middle="showRequestAlerts(request)"
            @click="requestDetail(request)"
          >
            <div class="relative">
              <div
                v-if="getCurrentUserRole()"
                :class="
                  getDirection()
                    ? 'flex justify-content-center align-items-center red-circle badge-rtl'
                    : 'flex justify-content-center align-items-center red-circle badge'
                "
                :style="
                  request.regionId === 1
                    ? 'background-color: #457b9d'
                    : 'background-color: green'
                "
              >
                <span class="text-white text-xs">{{
                  getRegionNameById(request.regionId)?.charAt(0)
                }}</span>
              </div>

              <div v-if="request.clientId">
                <Avatar
                  :image="getImage(request.clientPhotoUrl)"
                  shape="circle"
                  v-if="request.clientPhotoUrl"
                  class="requestAvatar newRequest"
                  :class="request.tripStatus"
                  @error="request.clientPhotoUrl = ''"
                />
                <Avatar
                  v-else
                  :label="request.clientName?.charAt(0)"
                  shape="circle"
                  :class="request.tripStatus"
                  class="requestAvatar newRequest"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div>
                <div
                  class="mt-2 surface-overlay white-space-nowrap overflow-hidden"
                  style="width: 100px; text-align: center"
                >
                  <span
                    style="
                      display: inline-block;
                      max-width: 100%;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                    :style="
                      direction(request.clientName) == 'rtl'
                        ? ' direction: rtl;'
                        : 'direction: ltr;'
                    "
                  >
                    {{ request.clientName }}
                  </span>
                </div>

                <!-- show time  -->
                <p
                  class="flex align-items-center justify-content-center text-sm -mt-2"
                  v-if="request.createdAt"
                >
                  {{ formatTime(request.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { filterTripStatus } from "@/global/transportation/tripStatuses";
import requestMarker from "./icons/requestMarker";
import { MonitoringStore } from "./monitoringStore";
import Avatar from "primevue/avatar";
import MultiSelect from "primevue/multiselect";
import type { TripStatusDto } from "@/backend/transport";
import { getImage } from "@/composables/getImage";
import { direction } from "@/composables/textDirection";
import { checkTripStatus } from "./checkRequestStatus";
import { RegionStore } from "@/stores/common/region";
import { currentUser } from "@/stores/currentUser";

const monitoringStore = MonitoringStore();
const showRequestsList = ref(monitoringStore.showRequestsList);
const searchData = ref("");
const requests = ref<TripStatusDto[]>(monitoringStore.trips);
const selectedTripStatus = ref<{ name: string }[]>([]);

for (const filterStatus of filterTripStatus) {
  if (monitoringStore.currentTripStatuses.includes(filterStatus.name)) {
    selectedTripStatus.value.push(filterStatus);
  }
}
watch(
  () => monitoringStore.showRequestsList,
  () => {
    showRequestsList.value = monitoringStore.showRequestsList;
  }
);
watch(
  () => monitoringStore.trips,
  () => {
    requests.value = monitoringStore.trips;
  },
  { deep: true }
);
function changeRequestListTripStatus() {
  monitoringStore.changeRequestListStatus(!showRequestsList.value);
}
function preventHeaderClick(event) {
  event.stopPropagation();
}
function search() {
  const result = requests.value.filter((x) =>
    x.clientName
      ?.toLocaleLowerCase()
      .includes(searchData.value.toLocaleLowerCase())
  );
  result.sort((a, b) => {
    return b.requestId! - a.requestId!;
  });

  return result;
}
function requestDetail(request) {
  monitoringStore.showDetail(request, "request");
  if (!checkTripStatus(request.tripStatus)) showRequestAlerts(request);
}
const container = ref<HTMLElement | null>(null);
const emits = defineEmits(["scrolling", "stopScrolling"]);
onMounted(() => {
  if (container.value) {
    container.value.addEventListener("wheel", (e: WheelEvent) => {
      e.preventDefault();
      container.value!.scrollLeft += e.deltaY;
      emits("scrolling");
    });
  }
  if (container.value) {
    container.value.addEventListener("mouseleave", () => {
      emits("stopScrolling");
    });
  }
});
function changeTripStatus() {
  monitoringStore.changeTripStatusList(
    selectedTripStatus.value.map((x) => x.name)
  );
}
function showRequestAlerts(request) {
  const monitoringStore = MonitoringStore();
  monitoringStore.showRequestAlerts(request);
}

// change format date to hour
function formatTime(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

// get regions from main component
const regionStore = RegionStore();
// get all regions by ID
function getRegionNameById(regionId) {
  const region = regionStore.regions?.find((x) => x.id === regionId);
  return region ? region.name : "";
}

// return direction
onMounted(() => {
  getDirection();
});

function getDirection() {
  localStorage.getItem("direction");
  if (localStorage.getItem("direction") === "rtl") {
    return "rtl";
  }
}

//get current user role
const currentUserStore = currentUser();
getCurrentUserRole();

async function getCurrentUserRole() {
  await currentUserStore.getCurrentUserInfo();
  const baseRole = currentUserStore.baseRole;

  // Check if the baseRoles array includes an object with name 'SuperAdmin'
  const hasSuperAdminRole = baseRole.baseRoles.some(
    (role) => role.name === "SuperAdmin"
  );

  return hasSuperAdminRole;
}
</script>

<style lang="scss">
.filterDropDown {
  .p-multiselect-label-container {
    display: none !important;
  }
}
.requestListName {
  overflow: hidden;
  position: relative;
}
.ellipsis-text {
  position: relative;
  direction: rtl;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.badge {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
}
.badge-rtl {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 0;
  left: 0;
  transform: translate(2%, -30%);
}

.requestAvatar,
.newRequest {
  margin: 0;
  padding: 0;
}
</style>
