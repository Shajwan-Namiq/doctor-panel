<template>
  <div class="page-style">
    <div class="page-container">
      <Splitter layout="vertical">
        <div class="addDataComponentWrapper">
          <SplitterPanel>
            <div class="flex justify-content-end">
              <div class="flex m-4" v-if="!editMode">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-success mx-1"
                  v-tooltip.bottom="
                    t('tooltips.edit', { field: t('tooltips.fields.vehicle') })
                  "
                  @click="toggleEditMode(true)"
                  v-can="[PolicyType.WRITE_VEHICLE]"
                />
              </div>
              <div v-if="editMode" class="m-4">
                <Button
                  icon="pi pi-check"
                  class="p-button-success mx-1"
                  v-tooltip.bottom="'Edit Role'"
                  @click="updateVehicle"
                />
                <Button
                  icon="pi pi-times"
                  class="p-button-warn"
                  @click="toggleEditMode(false)"
                  v-tooltip.bottom="'Delete Role'"
                />
              </div>
            </div>
            <div class="grid" style="width: 100% !important">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="text-outline" class="text-xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.title"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.title")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="color-filter-outline"
                      class="text-xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.vehicleDetail!.color"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.color")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      view="year"
                      dateFormat="yy"
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.vehicleDetail!.model"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.model")
                    }}</label>
                  </span>
                </div>
              </div>
            </div>
          </SplitterPanel>

          <SplitterPanel>
            <div class="my-4">
              <h3>{{ $t("transportation.vehicle.plaqueDetail.title") }}</h3>
            </div>
            <div class="grid mt-4" style="width: 100% !important">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="home-outline" class="text-xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.plaqueDetail!.city"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.plaqueDetail.city")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="text-outline" class="text-xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.plaqueDetail!.code"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.plaqueDetail.code")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="color-filter-outline"
                      class="text-xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.plaqueDetail!.color"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.plaqueDetail.color")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      :disabled="!editMode"
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="vehicleData.plaqueDetail!.country"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.vehicle.plaqueDetail.country")
                    }}</label>
                  </span>
                </div>
              </div>
            </div>
          </SplitterPanel>

          <SplitterPanel>
            <div class="my-4">
              <h3>{{ $t("transportation.vehicle.cardDetail") }}</h3>
            </div>
            <div
              class="flex flex-wrap justify-content-center mt-4"
              style="width: 100% !important"
            >
              <div class="mb-4 mx-2" style="width: 400px">
                <h3>{{ $t("transportation.vehicle.carCard") }}</h3>

                <div style="height: 200px" class="mt-3">
                  <Image
                    :src="vehicleData.carCardImageUrl ?? ''"
                    class="w-full"
                    preview
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="
                      (file) => {
                        selectImage(file, 'carCardImage');
                      }
                    "
                  />
                </div>
              </div>
              <div class="mb-4 mx-2" style="width: 400px">
                <h3>
                  {{ $t("transportation.vehicle.carCardBack") }}
                </h3>
                <div style="height: 200px" class="mt-3">
                  <Image
                    :src="vehicleData.carCardBackImageUrl ?? ''"
                    class="w-full"
                    preview
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="
                      (file) => {
                        selectImage(file, 'carCardBackImage');
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </SplitterPanel>
        </div>
      </Splitter>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import { VehicleService } from "@/backend/transport";
import SelectImage from "@/components/selectImage.vue";
import Image from "primevue/image";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import { toastStore } from "@/stores/common/toastStore";
import { PolicyType } from "@/backend/transport";

const route = useRoute();
const editMode = ref(false);

const vehicleData = ref<any>({
  id: 0,
  title: "",
  carCardImageUrl: "",
  carCardBackImageUrl: "",
  vehicleDetail: {
    id: 0,
    color: "",
    tip: "",
    model: 2002,
    insuranceNo: "",
    insuranceExpire: "",
    vin: "",
  },
  plaqueDetail: {
    id: 0,
    city: "",
    code: "",
    color: "",
    country: "",
  },
});
const updateVehicleData: any = {
  carCardBackImage: { bytes: "", fileName: "" },
  carCardImage: { bytes: "", fileName: "" },
  vehicleDetail: {
    color: "",
    insuranceExpire: "",
    insuranceNo: "",
    model: 0,
    tip: "",
    vin: "",
  },
  plaqueDetail: {
    city: "",
    code: "",
    color: "",
    country: "",
  },
  title: "",
};
const toast = toastStore();
const { t } = useI18n();
getVehicleDetail();
async function getVehicleDetail() {
  await VehicleService.getVehicle({ id: +route.params.id }).then((Response) => {
    vehicleData.value = Response;
  });
}

function toggleEditMode(cond) {
  editMode.value = cond;
}
function selectImage(file, field) {
  changeFileToBase64(file).then((res) => {
    updateVehicleData[field] = {
      bytes: res,
      fileName: file.name,
    };
  });
}
async function updateVehicle() {
  for (const field of Object.keys(updateVehicleData)) {
    if (vehicleData.value.hasOwnProperty(field)) {
      updateVehicleData[field] = vehicleData.value[field];
    }
    if (field.includes("Image")) {
      if (updateVehicleData[field].bytes === "") {
        delete updateVehicleData[field];
      }
    }
  }
  await VehicleService.updateVehicle({
    id: vehicleData.value.id!,
    requestBody: updateVehicleData,
  });
  await getVehicleDetail();

  toast.changeToastState({
    severity: t("toasts.updated_success_header"),
    summary: t("toasts.updated_success_desc", { field: t("fields.vehicle") }),
    type: "success",
  });

  editMode.value = false;
}
</script>
<style lang="scss">
.vehicleDetail {
  .p-splitter {
    border: none !important;
  }
  .p-image {
    img {
      height: 14rem !important;
      width: 100% !important;
      border-radius: 0.25rem;
    }
  }
}
</style>
