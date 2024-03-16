<template>
  <div class="drivers">
    <div>
      <ProgressBar
        mode="indeterminate"
        style="height: 0.2em"
        v-if="monitoringStore.loadingSocket"
      />

      <div class="flex">
        <div class="lg:hidden">
          <div
            @click="$emit('closeDriverList')"
            class="h-full flex justify-content-center align-items-center mx-1 border-round-sm cursor-pointer"
            style="width: 50px; background-color: var(--primary-color-kubak)"
          >
            <ion-icon name="close-outline" style="height: 30px; width: 30px" />
          </div>
        </div>
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
      </div>

      <div
        class="flex flex-column align-items-stretch mb-3 mt-3"
        style="
          background-color: var(--background-color-kubak);
          color: var(--text-color-kubak);
          max-height: 200px;
        "
      >
        <!-- Toggle button at the top end of the container -->
        <div class="flex justify-content-end" v-if="getCurrentUserRole()">
          <div @click="toggle = !toggle" class="p-2 cursor-pointer">
            <ion-icon
              style="font-size: 1.2rem"
              name="eye-outline"
              size="2"
            ></ion-icon>
          </div>
        </div>

        <div
          class="w-full h-full border-round-sm flex align-items-center justify-content-around"
        >
          <div
            v-for="status in servantStatus"
            :key="status.id"
            @click="filterServantStatus(status)"
            style="cursor: pointer"
          >
            <div class="cursor: pointer">
              <div
                style="height: 40px; width: 100%"
                class="flex flex-column justify-content-center align-items-center border-round-sm cursor: pointer"
                v-tooltip.bottom="status.name"
              >
                <div
                  v-html="
                    selectedServantStatus.includes(status.id)
                      ? servantMarkerSvg({ status: status.id })
                      : servantMarkerSvg({
                          status: status.id,
                          disableStatus: true,
                        })
                  "
                  style="height: 20px; width: 20px"
                  class=""
                  :class="servantStatusStyle(status.id)"
                ></div>
              </div>
              <div
                class="flex flex-column justify-content-center align-items-center py-1 border-round-sm"
              >
                <p>{{ $t(`statuses.servant.${status.name}`) }}</p>
                <p v-if="selectedServantStatus.includes(status.name)">
                  {{ getServantCounts(status) ?? 0 }}
                </p>
                <p
                  v-else
                  style="text-decoration: line-through; font-size: 12px"
                >
                  disabled
                </p>
              </div>

              <div v-if="toggle">
                <div class="flex flex-row align-items-center py-3">
                  <div class="flex flex-column align-items-center">
                    <div
                      v-for="statusResult in countServantByStatus(status.name)"
                      :key="statusResult.status"
                    >
                      <div
                        v-for="region in statusResult.regions"
                        :key="region.region"
                        class="mx-2 border-round-lg"
                      >
                        {{ region.region.charAt(0) }} {{ region.count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="driver flex align-items-center px-2 justify-content-between my-2"
      v-for="(servant, index) in search()"
      :key="index"
    >
      <DriverCard :servant="servant" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import DriverCard from "./driverCard.vue";
import { MonitoringStore } from "./monitoringStore";
import servantMarkerSvg from "./icons/servantMarker";
import { servantStatus } from "@/global/transportation/servantStatus";
import ProgressBar from "primevue/progressbar";
import { RegionStore } from "@/stores/common/region";
import type { ServantStatusDto, ServantStatusEnum } from "@/backend/transport";
import { currentUser } from "@/stores/currentUser";

const servants = ref<ServantStatusDto[]>();
const monitoringStore = MonitoringStore();
const toggle = ref(false);

const selectedServantStatus = ref<string[]>(
  localStorage.getItem("servantStatuses")
    ? JSON.parse(localStorage.getItem("servantStatuses")!)
    : monitoringStore.currentServantStatus
);
watch(
  () => monitoringStore.servants,
  () => {
    servants.value = monitoringStore.servants;
  },
  { deep: true }
);

const searchData = ref("");
function search() {
  if (servants.value)
    return servants.value.filter((x) => {
      return x.fullName
        ?.toLocaleLowerCase()
        .includes(searchData.value.toLocaleLowerCase());
    });
}
function servantStatusStyle(id) {
  let className = "";
  !selectedServantStatus.value.includes(id)
    ? (className = "-mt-2")
    : (className = "");
  return className;
}
function filterServantStatus(status) {
  if (!monitoringStore.loadingSocket) {
    const index = selectedServantStatus.value.findIndex((x) => x == status.id);
    if (index != -1) selectedServantStatus.value.splice(index, 1);
    else selectedServantStatus.value.push(status.id);
    monitoringStore.changeServantStatusList(selectedServantStatus.value);
  }
}
function getServantCounts(status) {
  return servants.value?.filter((x) => x.status == status.name).length;
}

//count the number of the regions by status
const regionStore = RegionStore();

function countServantByStatus(status: ServantStatusEnum) {
  // convert region IDs to names
  const regionMap = new Map(
    regionStore.regions.map((region) => [region.id, region.name])
  );
  const countsByRegion = {}; //count the number of servants by regionName

  regionStore.regions.forEach((region) => {
    if (region.name) {
      countsByRegion[region.name] = 0;
    }
  });
  if (servants.value) {
    for (const servant of servants.value) {
      const regionName = regionMap.get(servant.regionId);
      if (servant.status === status && regionName) {
        countsByRegion[regionName]++;
      }
    }
  }
  // Convert the counts to the array structure
  const result = Object.keys(countsByRegion).map((regionName) => {
    return {
      status: status,
      regions: [
        {
          region: regionName,
          count: countsByRegion[regionName],
        },
      ],
    };
  });
  return result;
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
.text-left {
  text-align: left;
  justify-content: flex-start;
}
</style>
