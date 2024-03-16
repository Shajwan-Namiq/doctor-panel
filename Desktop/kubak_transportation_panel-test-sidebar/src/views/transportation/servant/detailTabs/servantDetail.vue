<template>
  <div v-if="servantDetail" class="servantDetail">
    <div class="flex justify-content-between">
      <div class="flex">
        <div>
          <avatar
            style="height: 150px; width: 150px"
            class="mt-3 mx-4"
            shape="circle"
            :image="
              servantDetail.avatarUrl
                ? getImage(servantDetail.avatarUrl)
                : 'https://willowbank.ca/wp/wp-content/uploads/bb-plugin/cache/Missing-profile-image-square.jpg'
            "
            v-if="!editMode"
          />
          <div
            style="height: 150px; width: 150px"
            class="mx-4 mt-3"
            v-if="editMode"
          >
            <SelectImage :circle="true" @selectImageFile="onAvatarUpdated" />
          </div>
        </div>
        <div
          class="mt-6 flex flex-column justify-content-center align-items-center"
        >
          <div class="mt-2">
            <Rating
              v-if="servantDetail.servantScore"
              v-model="servantDetail.servantScore.score"
              :disabled="true"
              :cancel="false"
            />
            <Rating
              v-else
              v-model="emptyScore"
              :disabled="true"
              :cancel="false"
            />
          </div>
          <div class="mt-2">
            <p>{{ servantDetail.id }}</p>
          </div>
        </div>
      </div>

      <div class="flex m-4" v-if="!editMode">
        <div>
          <Button
            icon="pi pi-pencil"
            class="p-button-success mr-2"
            v-tooltip.bottom="
              $t('tooltips.edit', { field: $t('fields.servant') })
            "
            @click="toggleEditMode(true)"
            v-can="[PolicyType.WRITE_SERVANT]"
          />
        </div>
        <div>
          <Button
            icon="pi pi-ban"
            class="p-button-danger mr-2"
            v-tooltip.bottom="
              $t('tooltips.block', { field: $t('fields.servant') })
            "
            @click="openBlockUserModal"
            :label="
              servantDetail.hasActiveServantBlock
                ? $t('transportation.users.blockList')
                : ''
            "
            v-can="[PolicyType.WRITE_SERVANT]"
          />
        </div>
      </div>
      <div v-if="editMode" class="m-4">
        <Button
          icon="pi pi-check"
          class="p-button-success mx-2"
          v-tooltip.bottom="
            $t('tooltips.edit', { field: $t('fields.servant') })
          "
          @click="updateServant"
        />
        <Button
          icon="pi pi-times"
          class="p-button-warn"
          @click="toggleEditMode(false)"
          v-tooltip.bottom="$t('tooltips.cancel')"
        />
      </div>
    </div>
    <Splitter layout="vertical" style="height: 100%" class="p-4">
      <ProgressSpinner />
      <div class="addDataComponentWrapper p-4">
        <SplitterPanel class="my-6">
          <div class="grid" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="text-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.firstName"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.firstName")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="text-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.lastName"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.lastName")
                  }}</label>
                </span>
              </div>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel class="my-6">
          <div class="grid" style="width: 100% !important">
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="card-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.nationalId"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.detail.nationalId")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.certificateId"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.detail.certificateId")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="locate-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.address"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.detail.address")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="card-outline" class="text-2xl"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputText
                    :disabled="!editMode"
                    autofocus
                    id="inputgroup"
                    type="text"
                    v-model="servantDetail.bankId"
                  />
                  <label for="inputgroup">{{
                    $t("transportation.servant.detail.bankId")
                  }}</label>
                </span>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  :options="services"
                  optionLabel="Typ"
                  :placeholder="$t('transportation.services.title')"
                  class="w-full"
                  v-model="servantDetail.service"
                  :disabled="!editMode"
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
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="business-outline" class="text-2xl"></ion-icon>
                </span>
                <Dropdown
                  v-model="servantDetail.region"
                  display="chip"
                  :placeholder="$t('auth.area.regions')"
                  :options="regions"
                  :disabled="!editMode"
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
          </div>
        </SplitterPanel>

        <SplitterPanel>
          <div class="mb-3 -mt-3">
            <span class="mx-2 splitterContainersHeader">{{
              $t("transportation.servant.detail.servantCardDetail.title")
            }}</span>
          </div>
          <div class="grid mt-4" style="width: 100% !important">
            <div class="col-12 md:col-6 xl:col-6 mb-6">
              <div
                class="w-full flex flex-column align-items-center justify-content-center"
              >
                <span class="m-2">
                  {{
                    $t(
                      "transportation.servant.detail.servantCardDetail.certificate"
                    )
                  }}
                </span>
                <div
                  class="p-inputgroup h-12rem flex justify-content-center mt-4"
                  style="max-width: 500px"
                >
                  <Image
                    :src="servantDetail.certificateUrl"
                    class="max-w-full h-full"
                    :preview="true"
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="onCertificateSelected"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-6 mb-6">
              <div
                class="w-full flex flex-column align-items-center justify-content-center"
              >
                <span class="m-2">
                  {{
                    $t(
                      "transportation.servant.detail.servantCardDetail.certificateBack"
                    )
                  }}
                </span>
                <div
                  class="p-inputgroup h-12rem flex justify-content-center mt-4"
                  style="max-width: 500px"
                >
                  <Image
                    :src="servantDetail.certificateBackUrl"
                    class="max-w-full h-full"
                    :preview="true"
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="onCertificateBackSelected"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-6 mb-6">
              <div
                class="w-full flex flex-column align-items-center justify-content-center"
              >
                <span class="m-2">
                  {{
                    $t(
                      "transportation.servant.detail.servantCardDetail.nationalCard"
                    )
                  }}
                </span>
                <div
                  class="p-inputgroup h-12rem flex justify-content-center mt-4"
                  style="max-width: 500px"
                >
                  <Image
                    :src="servantDetail.nationalCardUrl"
                    class="max-w-full h-full"
                    :preview="true"
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="onNationalCardSelected"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-6 mb-6">
              <div
                class="w-full flex flex-column align-items-center justify-content-center"
              >
                <span class="m-2">
                  {{
                    $t(
                      "transportation.servant.detail.servantCardDetail.nationalCardBack"
                    )
                  }}
                </span>
                <div
                  class="p-inputgroup h-12rem flex justify-content-center mt-4"
                  style="max-width: 500px"
                >
                  <Image
                    :src="servantDetail.nationalCardBackUrl"
                    class="max-w-full h-full"
                    :preview="true"
                    v-if="!editMode"
                  />
                  <SelectImage
                    v-if="editMode"
                    @selectImageFile="onNationalCardBackSelected"
                  />
                </div>
              </div>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel v-if="servantDetail.vehicle">
          <div class="mb-3 -mt-3">
            <span class="mx-2 splitterContainersHeader">{{
              $t("transportation.vehicle.vehicle")
            }}</span>
          </div>
          <DataTable :value="vehicleDetail" responsiveLayout="scroll">
            <Column
              :header="$t('transportation.vehicle.title')"
              style="cursor: pointer"
            >
              <template #body="PolicyProps">
                <p>
                  {{ PolicyProps.data.title }}
                </p>
              </template>
            </Column>
            <Column :header="$t('transportation.vehicle.color')">
              <template #body="PolicyProps">
                <p>
                  {{ PolicyProps.data?.vehicleDetail?.color }}
                </p>
              </template>
            </Column>
            <Column :header="$t('transportation.vehicle.code')">
              <template #body="PolicyProps">
                <p>
                  {{ PolicyProps.data?.plaqueDetail?.code }}
                </p>
              </template>
            </Column>
            <Column>
              <template #body>
                <Button
                  icon="pi pi-car"
                  class="p-button-success mr-2"
                  v-tooltip.bottom="$t('transportation.vehicle.vehicleDetail')"
                  @click="vehicleDetailPage"
                />
              </template>
            </Column>
          </DataTable>
        </SplitterPanel>
      </div>
    </Splitter>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import avatar from "primevue/avatar";
import { onMounted, ref } from "vue";
import Rating from "primevue/rating";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import { useI18n } from "vue-i18n";
import Image from "primevue/image";
import { ServantService } from "@/backend/transport/services/ServantService";
import {
  PolicyType,
  type ServiceDto,
  type UpdateServantRequest,
} from "@/backend/transport";
import SelectImage from "@/components/selectImage.vue";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import { toastStore } from "@/stores/common/toastStore";
import { getImage } from "@/composables/getImage";
import blockServantModal from "./blockServant.vue";

import { useDialog } from "primevue/usedialog";
import { getRegionById, getAllRegions } from "@/views/auth/regions/regions";
import { getServiceById, getAllServices } from "../../services/getAllService";
import type { RegionDto } from "@/backend/city";

const dialog = useDialog();
const toast = toastStore();
const services = ref<ServiceDto[]>();
const regions = ref<RegionDto[]>();

const { t } = useI18n();
const route = useRoute();
const editMode = ref(false);

const emptyScore = ref(0);
const servantDetail = ref<any>({
  address: "",
  avatarUrl: "",
  bankId: "",
  certificateUrl: "",
  certificateBackUrl: "",
  certificateId: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  nationalCardUrl: "",
  nationalCardBackUrl: "",
  nationalId: "",
  region: {},
  servantScore: {},
  service: {},
  user: {},
  vehicle: {},
});
const updateServantData = ref<UpdateServantRequest>({
  firstName: "",
  lastName: "",
  nationalId: "",
  certificateId: "",
  regionId: 1,
  avatar: { fileName: "", bytes: "" },
  certificate: { fileName: "", bytes: "" },
  certificateBack: { fileName: "", bytes: "" },
  nationalCard: { fileName: "", bytes: "" },
  nationalCardBack: { fileName: "", bytes: "" },
  serviceId: 1,
  address: "",
});
const vehicleDetail = ref([{}]);

onMounted(async () => {
  regions.value = await getAllRegions();
  services.value = await getAllServices();
});

getServantDetail();
async function getServantDetail() {
  ServantService.getServantById({ id: +route.params.id }).then(
    async (Response) => {
      servantDetail.value = Response;
      servantDetail.value.region = await getRegionById(Response.regionId);
      servantDetail.value.service = await getServiceById(Response.serviceId);
      vehicleDetail.value[0] = Response.vehicle ?? [];
    }
  );
}

const router = useRouter();

function toggleEditMode(cond) {
  editMode.value = cond;
}
async function updateServant() {
  for (const field in updateServantData.value) {
    if (updateServantData.value[field]?.fileName != undefined) {
      if (!updateServantData.value[field]?.fileName) {
        delete updateServantData.value[field];
      }
    }
  }

  for (const field in servantDetail.value) {
    if (updateServantData.value.hasOwnProperty(field)) {
      updateServantData.value[field] = servantDetail.value[field];
      //remove this field from updateServantData
      if (updateServantData.value[field].fileName != undefined) {
        if (!updateServantData?.value[field]?.fileName)
          delete updateServantData.value[field];
      }
    }
  }
  updateServantData.value.regionId = servantDetail.value?.region?.id;
  updateServantData.value.serviceId = servantDetail.value?.service?.id;

  await ServantService.updateServant({
    id: +route.params.id,
    requestBody: updateServantData.value,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.servant"),
      }),
      type: "success",
    });
  });
  editMode.value = false;
  getServantDetail();
}
function vehicleDetailPage() {
  router.push({
    name: "vehicleDetail",
    params: { id: servantDetail.value?.vehicle?.id },
  });
}

const onAvatarUpdated = (imageFile) => {
  changeFileToBase64(imageFile).then((res) => {
    updateServantData.value.avatar!.bytes = res;
    updateServantData.value.avatar!.fileName = imageFile.name;
  });
};
const onCertificateSelected = async (imageFile) => {
  changeFileToBase64(imageFile).then((res) => {
    updateServantData.value.certificate!.bytes = res;
    updateServantData.value.certificate!.fileName = imageFile.name;
  });
};
const onCertificateBackSelected = (imageFile) => {
  changeFileToBase64(imageFile).then((res) => {
    updateServantData.value.certificateBack!.bytes = res;
    updateServantData.value.certificateBack!.fileName = imageFile.name;
  });
};
const onNationalCardSelected = (imageFile) => {
  changeFileToBase64(imageFile).then((res) => {
    updateServantData.value.nationalCard!.bytes = res;
    updateServantData.value.nationalCard!.fileName = imageFile.name;
  });
};
const onNationalCardBackSelected = (imageFile) => {
  changeFileToBase64(imageFile).then((res) => {
    updateServantData.value.nationalCardBack!.bytes = res;
    updateServantData.value.nationalCardBack!.fileName = imageFile.name;
  });
};

function openBlockUserModal() {
  dialog.open(blockServantModal, {
    emits: {
      updated: () => {
        getServantDetail();
      },
    },
    data: servantDetail.value,
    onClose: () => {
      getServantDetail();
    },
    props: {
      header: t("roles.addRoleHeader"),

      breakpoints: {
        "2000px": "50vw",
        "1500px": "65vw",
        "960px": "75vw",
        "640px": "90vw",
      },

      modal: true,
    },
  });
}
</script>
<style lang="scss">
.servantDetail {
  .p-splitter {
    border: none !important;
  }
  .p-image {
    img {
      width: 100%;
    }
  }
}
</style>
