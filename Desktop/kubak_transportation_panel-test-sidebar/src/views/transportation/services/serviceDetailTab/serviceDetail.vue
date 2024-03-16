<template>
  <Splitter layout="vertical" class="" style="max-width: 2000px">
    <ProgressSpinner />
    <div class="addDataComponentWrapper p-4">
      <SplitterPanel>
        <div class="grid mt-6" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.basePrice"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.basePrice")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.minPrice"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.minPrice")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="gift-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.tipPrice"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.tipPrice")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="gift-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.minTip"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.minTip")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="gift-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.maxTip"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.maxTip")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon
                  name="cloudy-night-outline"
                  class="text-2xl"
                ></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.nightPriceRiseRate"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.baseNight")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon
                  name="cloudy-night-outline"
                  class="text-2xl"
                ></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.pricePerEachStop"
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.pricePerEachStop")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon
                  name="cloudy-night-outline"
                  class="text-2xl"
                ></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="serviceData.params!.priceRateDuringStopTime"
                />
                <label for="inputgroup">{{
                  $t(
                    "transportation.services.priceParameter.priceRateDuringStopTime"
                  )
                }}</label>
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-6 font-medium">
          <p class="text-xl">
            {{ $t("transportation.services.priceParameter.withDestination") }}
          </p>
        </div>
        <div class="grid" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="locate-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="
                    serviceData.params!.priceRatePerDistanceWithDestination
                  "
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.perMeter")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="time-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="
                    serviceData.params!.priceRatePerDurationWithDestination
                  "
                />
                <label for="inputgroup">
                  {{ $t("transportation.services.priceParameter.perSecond") }}
                </label>
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4 mb-6 font-medium">
          <p class="text-xl">
            {{
              $t("transportation.services.priceParameter.withoutDestination")
            }}
          </p>
        </div>
        <div class="grid py-2" style="width: 100% !important">
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="locate-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="
                    serviceData.params!.priceRatePerDistanceWithoutDestination
                  "
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.perMeter")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="time-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputNumber
                  inputId="minmaxfraction"
                  :minFractionDigits="0"
                  :maxFractionDigits="5"
                  :disabled="!editModes.params"
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="
                    serviceData.params!.priceRatePerDurationWithoutDestination
                  "
                />
                <label for="inputgroup">{{
                  $t("transportation.services.priceParameter.perSecond")
                }}</label>
              </span>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-content-end my-3">
          <div v-if="!editModes.params">
            <Button
              @click="toggleEditMode(true, 'params')"
              v-can="[PolicyType.WRITE_SERVICE]"
            >
              <ion-icon name="create-outline"></ion-icon>
              <span class="ml-2 font-bold">{{ $t("buttons.edit") }}</span>
            </Button>
          </div>
          <div v-if="editModes.params">
            <Button
              label="Cancel"
              class="mx-2 p-button-secondary p-button-outlined"
              @click="toggleEditMode(false, 'params')"
              icon="pi pi-times"
            />
            <Button
              label="submit"
              icon="pi pi-bookmark"
              @click="editService"
              :loading="requestStatusStore.loading"
            />
          </div>
        </div>
      </SplitterPanel>
    </div>
  </Splitter>
</template>
<script lang="ts" setup>
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import { useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import {
  ServiceService,
  type ServiceDto,
  type ServiceSettingsDto,
  PolicyType,
} from "@/backend/transport";
import { RegionStore } from "@/stores/common/region";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

const regionStore = RegionStore();
const toast = toastStore();
const { t } = useI18n();

const serviceData = ref<ServiceDto>({
  params: {
    id: undefined,
    basePrice: undefined,
    priceRatePerDistanceWithDestination: undefined,
    priceRatePerDurationWithDestination: undefined,
    priceRatePerDistanceWithoutDestination: undefined,
    priceRatePerDurationWithoutDestination: undefined,
    pricePerEachStop: undefined,
    priceRateDuringStopTime: undefined,
    nightPriceRiseRate: undefined,
    minPrice: undefined,
    tipPrice: undefined,
    minTip: undefined,
    maxTip: undefined,
    nightPeriods: [
      {
        end: "",
        start: "",
      },
    ],
  },
});
const serviceSettings = ref<ServiceSettingsDto>();
const route = useRoute();
const regions = ref(regionStore.regions);
if (regions.value.length == 0) {
  regionStore.getAllRegion().then((res) => {
    regions.value = res;
  });
}
const requestStatusStore = requestStatus();

const editModes = ref({
  service: false,
  params: false,
  discount: false,
  commission: false,
});
getServiceData();
function getServiceData() {
  ServiceService.getService({ id: +route.params.id }).then((Response) => {
    serviceSettings.value = Response.serviceSettings;
    for (const field in Response) {
      if (Response[field] != null) {
        serviceData.value[field] = Response[field];
      }
    }
  });
}
function toggleEditMode(cond, field) {
  editModes.value[field] = cond;
}
async function editService() {
  const { params, notifyServantPreference, isActive, region } =
    serviceData.value;
  const updateServiceData: any = {
    ...params,
    notifyServantPreference,
    isActive,
  };
  updateServiceData.regionId = region?.id;
  updateServiceData.serviceTypeId = serviceData.value?.serviceType?.id;
  await ServiceService.updateServiceParams({
    id: +route.params.id,
    requestBody: updateServiceData,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.service"),
      }),
      type: "success",
    });
  });
  getServiceData();
  editModes.value.params = false;
}
</script>
<style lang="scss">
.addDataComponentWrapper {
  background-color: var(--secondary-background-color-kubak);
  padding-bottom: 20px;
  border-radius: 5px;
}

.serviceDetailHeader {
  font-size: 20px;
  font-weight: 500;
  color: var(--icon-color-kubak) !important;
}
.progressBar {
  height: 100vh;
  background-color: #a1a1a180;
  position: absolute;
  top: 0;
  width: 100vw;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
