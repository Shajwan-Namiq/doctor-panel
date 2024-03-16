<template>
  <div class="page-style">
    <Splitter layout="vertical" style="height: 100%" class="page-container">
      <ProgressSpinner />
      <div class="addDataComponentWrapper p-4">
        <SplitterPanel>
          <div class="mb-6">
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 my-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-car"></i>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.servantId"
                    :class="{
                      'p-invalid': v$.servantId.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.servantId.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.servant.id"),
                        })
                      : $t("transportation.servant.id")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
          <div class="grid" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="text-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.title"
                    :class="{
                      'p-invalid': v$.title.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.title.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.title"),
                        })
                      : $t("transportation.vehicle.title")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon
                    name="color-filter-outline"
                    class="text-xl"
                  ></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.color"
                    :class="{
                      'p-invalid': v$.color.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.color.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.color"),
                        })
                      : $t("transportation.vehicle.color")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="calendar-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.model"
                    :class="{
                      'p-invalid': v$.model.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.model.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.model"),
                        })
                      : $t("transportation.vehicle.model")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
        </SplitterPanel>

        <SplitterPanel>
          <div class="m-4">
            <span class="splitterContainersHeader">{{
              $t("transportation.vehicle.plaqueDetail.title")
            }}</span>
          </div>
          <div class="grid mt-4" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="home-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.plaque!.city"
                    :class="{
                      'p-invalid': v$.plaque.city.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.plaque.city.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.plaqueDetail.city"),
                        })
                      : $t("transportation.vehicle.plaqueDetail.city")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="text-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.plaque!.code"
                    :class="{
                      'p-invalid': v$.plaque.code.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.plaque.code.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.plaqueDetail.code"),
                        })
                      : $t("transportation.vehicle.plaqueDetail.code")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon
                    name="color-filter-outline"
                    class="text-xl"
                  ></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.plaque!.color"
                    :class="{
                      'p-invalid': v$.plaque.color.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.plaque.color.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t(
                            "transportation.vehicle.plaqueDetail.color"
                          ),
                        })
                      : $t("transportation.vehicle.plaqueDetail.color")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="business-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="vehicleData.plaque!.country"
                    :class="{
                      'p-invalid':
                        v$.plaque.country.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.plaque.country.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t(
                            "transportation.vehicle.plaqueDetail.country"
                          ),
                        })
                      : $t("transportation.vehicle.plaqueDetail.country")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel>
          <div class="m-4">
            <span class="splitterContainersHeader">{{
              $t("transportation.vehicle.cardDetail")
            }}</span>
          </div>
          <div class="flex flex-wrap justify-content-center">
            <div class="mb-4 mx-2" style="width: 400px">
              <div class="my-3">
                <span
                  class="mx-2"
                  :style="{
                    color:
                      v$.carCardImage.$invalid && submittedServant
                        ? 'var(--danger-color-kubak)'
                        : '',
                  }"
                  >{{
                    v$.carCardImage.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.carCard"),
                        })
                      : $t("transportation.vehicle.carCard")
                  }}</span
                >
              </div>
              <div class="w-full" style="height: 200px">
                <SelectImage
                  @selectImageFile="
                    (file) => {
                      selectImage(file, 'carCardImage');
                    }
                  "
                />
              </div>
            </div>
            <div class="mb-4 mx-2" style="width: 400px">
              <div class="my-3">
                <span
                  class="mx-2"
                  :style="{
                    color:
                      v$.carCardBackImage.$invalid && submittedServant
                        ? 'var(--danger-color-kubak)'
                        : '',
                  }"
                  >{{
                    v$.carCardBackImage.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.vehicle.carCardBack"),
                        })
                      : $t("transportation.vehicle.carCardBack")
                  }}</span
                >
              </div>
              <div class="w-full" style="height: 200px">
                <SelectImage
                  @selectImageFile="
                    (file) => {
                      selectImage(file, 'carCardBackImage');
                    }
                  "
                />
              </div>
            </div>
          </div>
          <div class="w-full flex justify-content-end mt-8">
            <Button
              icon="pi pi-check-circle"
              :label="$t('buttons.submit')"
              @click="submitNewVehicle"
              :loading="requestStatusStore.loading"
            />
          </div>
        </SplitterPanel>
      </div>
    </Splitter>
  </div>
</template>
<script lang="ts" setup>
import ProgressSpinner from "primevue/progressspinner";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import InputText from "primevue/inputtext";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InputNumber from "primevue/inputnumber";
import { VehicleService } from "@/backend/transport/services/VehicleService";
import SelectImage from "@/components/selectImage.vue";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import { toastStore } from "@/stores/common/toastStore";

const requestStatusStore = requestStatus();

const vehicleData = ref({
  title: "",
  color: "",
  model: 0,
  carCardImage: {
    bytes: "",
    fileName: "",
  },
  carCardBackImage: {
    bytes: "",
    fileName: "",
  },
  servantId: localStorage.getItem("newServantId")
    ? +localStorage.getItem("newServantId")!
    : 0,
  plaque: {
    city: "",
    code: "",
    color: "",
    country: "",
  },
});
const submittedServant = ref(false);
const router = useRouter();
const rule = {
  title: { required },
  color: { required },
  model: { required },
  carCardImage: {
    bytes: { required },
    fileName: { required },
  },
  carCardBackImage: { bytes: { required }, fileName: { required } },
  servantId: { required },
  plaque: {
    city: { required },
    code: { required },
    color: { required },
    country: { required },
  },
};
const v$ = useVuelidate(rule, vehicleData.value);

function submitNewVehicle() {
  submittedServant.value = true;
  if (!v$.value.$invalid) {
    VehicleService.createVehicle({ requestBody: vehicleData.value }).then(
      () => {
        const toast = toastStore();
        toast.changeToastState({
          severity: "Success",
          summary: "vehicle added successfully",
          type: "success",
        });
        router.push({
          name: "listVehicle",
        });
      }
    );
  }
}
function selectImage(file, field) {
  changeFileToBase64(file).then((res) => {
    vehicleData.value[field].fileName = file.name;
    vehicleData.value[field].bytes = res;
  });
}
</script>
<style lang="scss">
.addDataComponentWrapper {
  background-color: var(--secondary-background-color-kubak);
  padding-bottom: 20px;
  border-radius: 5px;
}
</style>
