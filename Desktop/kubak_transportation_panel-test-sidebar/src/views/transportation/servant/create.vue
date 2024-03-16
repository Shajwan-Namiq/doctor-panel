<template>
  <div class="md:p-6 p-2">
    <Splitter layout="vertical" style="height: 100%" class="p-4">
      <ProgressSpinner />
      <div class="addDataComponentWrapper p-4">
        <SplitterPanel>
          <div class="py-5">
            <div style="height: 160px; width: 160px">
              <SelectImage
                :circle="true"
                @selectImageFile="
                  (file) => {
                    selectImage(file, 'avatar');
                  }
                "
              />
            </div>
            <div
              class="mt-2"
              style="color: var(--danger-color-kubak)"
              v-if="v$.avatar.$invalid && submittedServant"
            >
              <span class="mx-2">{{
                $t("validationMessages.required", {
                  field: $t("transportation.servant.avatar"),
                })
              }}</span>
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
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantData.firstName"
                    :class="{
                      'p-invalid': v$.firstName.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.firstName.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.servant.firstName"),
                        })
                      : $t("transportation.servant.firstName")
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
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantData.lastName"
                    :class="{
                      'p-invalid': v$.lastName.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.lastName.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.servant.lastName"),
                        })
                      : $t("transportation.servant.lastName")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="locate-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantData.address"
                    :class="{
                      'p-invalid': v$.address.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.address.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.servant.detail.address"),
                        })
                      : $t("transportation.servant.detail.address")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="business-outline" class="text-xl"></ion-icon>
                </span>
                <Dropdown
                  v-model="servantData.region"
                  display="chip"
                  :loading="requestStatusStore.loading"
                  :placeholder="$t('auth.area.regions')"
                  :class="{
                    'p-invalid': v$.region.$invalid && submittedServant,
                  }"
                  :options="regions"
                >
                  <template #value="valueProp">
                    {{ valueProp.value?.name ?? valueProp.placeholder }}
                  </template>
                  <template #option="slotProps">
                    <p>{{ slotProps.option.name }}</p>
                  </template>
                </Dropdown>
              </div>
            </div>

            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="car-outline" class="text-xl"></ion-icon>
                </span>
                <span class="w-full">
                  <Dropdown
                    :options="services"
                    optionLabel="Typ"
                    :placeholder="$t('transportation.services.title')"
                    class="w-full"
                    v-model="servantData.service"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.title ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <div class="country-item flex w-full p-2">
                        <div style="font-size: 14px">
                          {{ slotProps.option.title }}
                        </div>
                      </div>
                    </template>
                  </Dropdown>
                </span>
              </div>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel>
          <div class="my-3">
            <span class="mx-2 splitterContainersHeader">{{
              $t(
                "transportation.servant.createServant.steps.createServant.documents"
              )
            }}</span>
          </div>
          <div class="grid mt-4 mb-4" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="card-outline" class="text-xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantData.nationalId"
                    :class="{
                      'p-invalid': v$.nationalId.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.nationalId.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t("transportation.servant.detail.nationalId"),
                        })
                      : $t("transportation.servant.detail.nationalId")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-id-card"></i>
                </span>
                <span class="p-float-label">
                  <InputText
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantData.certificateId"
                    :class="{
                      'p-invalid':
                        v$.certificateId.$invalid && submittedServant,
                    }"
                  />
                  <label for="inputgroup">{{
                    v$.certificateId.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t(
                            "transportation.servant.detail.certificateId"
                          ),
                        })
                      : $t("transportation.servant.detail.certificateId")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel>
          <div class="my-3">
            <span class="mx-2 splitterContainersHeader">{{
              $t(
                "transportation.servant.createServant.steps.createServant.certificates"
              )
            }}</span>
          </div>
          <div class="grid mt-4" style="width: 100% !important; height: 200px">
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 h-full">
              <div class="my-3">
                <span
                  class="mx-2"
                  :style="{
                    color:
                      v$.certificate.$invalid && submittedServant
                        ? 'var(--danger-color-kubak)'
                        : '',
                  }"
                  >{{
                    v$.certificate.$invalid && submittedServant
                      ? $t("validationMessages.required", {
                          field: $t(
                            "transportation.servant.detail.servantCardDetail.certificate"
                          ),
                        })
                      : $t(
                          "transportation.servant.detail.servantCardDetail.certificate"
                        )
                  }}</span
                >
              </div>
              <div class="w-full h-full">
                <SelectImage
                  @selectImageFile="
                    (file) => {
                      selectImage(file, 'certificate');
                    }
                  "
                />
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 h-full">
              <div
                class="my-3"
                :style="{
                  color:
                    v$.certificateBack.$invalid && submittedServant
                      ? 'var(--danger-color-kubak)'
                      : '',
                }"
              >
                <span class="mx-2">{{
                  v$.certificateBack.$invalid && submittedServant
                    ? $t("validationMessages.required", {
                        field: $t(
                          "transportation.servant.detail.servantCardDetail.certificateBack"
                        ),
                      })
                    : $t(
                        "transportation.servant.detail.servantCardDetail.certificateBack"
                      )
                }}</span>
              </div>
              <SelectImage
                @selectImageFile="
                  (file) => {
                    selectImage(file, 'certificateBack');
                  }
                "
              />
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 h-full">
              <div
                class="my-3"
                :style="{
                  color:
                    v$.nationalCard.$invalid && submittedServant
                      ? 'var(--danger-color-kubak)'
                      : '',
                }"
              >
                <span class="mx-2">{{
                  v$.nationalCard.$invalid && submittedServant
                    ? $t("validationMessages.required", {
                        field: $t(
                          "transportation.servant.detail.servantCardDetail.nationalCard"
                        ),
                      })
                    : $t(
                        "transportation.servant.detail.servantCardDetail.nationalCard"
                      )
                }}</span>
              </div>
              <SelectImage
                @selectImageFile="
                  (file) => {
                    selectImage(file, 'nationalCard');
                  }
                "
              />
            </div>
            <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4 h-full">
              <div
                class="my-3"
                :style="{
                  color:
                    v$.nationalCardBack.$invalid && submittedServant
                      ? 'var(--danger-color-kubak)'
                      : '',
                }"
              >
                <span class="mx-2">{{
                  v$.nationalCardBack.$invalid && submittedServant
                    ? $t("validationMessages.required", {
                        field: $t(
                          "transportation.servant.detail.servantCardDetail.nationalCardBack"
                        ),
                      })
                    : $t(
                        "transportation.servant.detail.servantCardDetail.nationalCardBack"
                      )
                }}</span>
              </div>
              <SelectImage
                @selectImageFile="
                  (file) => {
                    selectImage(file, 'nationalCardBack');
                  }
                "
              />
            </div>
          </div>
          <div class="w-full flex justify-content-end mt-8">
            <Button
              :label="$t('buttons.submit')"
              @click="submitNewServant"
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { ServantService } from "@/backend/transport";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import SelectImage from "@/components/selectImage.vue";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import {
  mapCreateUpdateServantRequest,
  type CreateUpdateServantRequestDto,
} from "./createServantMapper";
import { getAllRegions } from "@/views/auth/regions/regions";
import { getAllServices } from "../services/getAllService";

const services = ref();
const regions = ref<RegionDto[]>();
const requestStatusStore = requestStatus();
const servantData = ref<CreateUpdateServantRequestDto>({
  userId: localStorage.getItem("createServantId")!,
  firstName: "",
  lastName: "",
  nationalId: "",
  certificateId: "",
  region: undefined,
  avatar: { fileName: "", bytes: "" },
  certificate: { fileName: "", bytes: "" },
  certificateBack: { fileName: "", bytes: "" },
  nationalCard: { fileName: "", bytes: "" },
  nationalCardBack: { fileName: "", bytes: "" },
  service: undefined,
  address: "",
});
const submittedServant = ref(false);
const router = useRouter();

onMounted(async () => {
  regions.value = await getAllRegions();
  services.value = await getAllServices();
  const servantId = localStorage.getItem("createServantId");
  if (!servantId) {
    router.push({ name: "userExist" });
  }
});
const rule: any = {
  userId: { required },
  firstName: { required },
  lastName: { required },
  nationalId: { required },
  certificateId: { required },
  avatar: { fileName: { required }, bytes: { required } },
  certificate: { fileName: { required }, bytes: { required } },
  certificateBack: { fileName: { required }, bytes: { required } },
  nationalCard: { fileName: { required }, bytes: { required } },
  nationalCardBack: { fileName: { required }, bytes: { required } },
  region: { required },
  service: { required },
  address: { required },
};
const v$ = useVuelidate(rule, servantData.value);

function submitNewServant() {
  submittedServant.value = true;
  if (!v$.value.$invalid) {
    ServantService.createServant({
      requestBody: mapCreateUpdateServantRequest(servantData.value),
    })
      .then((Response) => {
        submittedServant.value = false;
        localStorage.setItem("newServantId", Response.servantId + "");
        if (Response.servantId) {
          router.push({
            path: "/transportation/servant/create/createVehicleServant",
          });
        }
      })
      .catch(() => {
        submittedServant.value = false;
      });
  }
}
function selectImage(file, field) {
  changeFileToBase64(file).then((res) => {
    servantData.value[field].fileName = file.name;
    servantData.value[field].bytes = res;
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
