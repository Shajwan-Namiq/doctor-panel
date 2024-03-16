<template>
  <div class="flex justify-content-center align-items-center mt-4">
    <div class="col-11 md:col-8">
      <DataTable :value="servantDevices">
        <Column
          field="deviceName"
          :header="$t('transportation.servant.devices.deviceName')"
        ></Column>
        <Column
          field="type"
          :header="$t('transportation.servant.devices.type')"
        >
          <template #body="slotProp">
            <div
              class="h-2rem w-6rem border-round-lg flex justify-content-center align-items-center"
              style="background-color: var(--success-button)"
              v-if="slotProp.data.type === ServantDeviceType.PRIMARY"
            >
              {{ $t("transportation.servant.devices.primary") }}
            </div>
            <div v-else>
              <div
                class="h-2rem min-w-6rem max-w-10rem border-round-lg flex justify-content-center align-items-center cursor-pointer"
                style="background-color: var(--primary-color-kubak)"
                @click="makePrimary(slotProp.data)"
              >
                {{ $t("transportation.servant.devices.makePrimary") }}
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ServantDeviceService,
  type ServantDeviceDto,
  ServantDeviceType,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const servantDevices = ref<ServantDeviceDto[]>();
onMounted(() => {
  getServantDevices();
});
async function getServantDevices() {
  await ServantDeviceService.getServantDevices({
    servantId: +route.params.id,
  }).then((res) => {
    servantDevices.value = res;
  });
}
async function makePrimary(data) {
  await ServantDeviceService.makeServantDevicePrimaryClient({
    deviceId: data.deviceId,
    servantId: +route.params.id,
  }).then(() => {
    getServantDevices();
  });
}
</script>
