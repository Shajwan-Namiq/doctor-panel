<template>
  <div class="page-style">
    <div class="page-container">
      <div class="w-full">
        <div class="grid pt-4 pb-2">
          <div class="col-12 md:col-6 xl:col-3 mb-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="person-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <dropdown
                  optionLabel="name"
                  placeholder="Select Cities"
                  :maxSelectedLabels="3"
                  closeIcon=""
                  class="w-full"
                  :selectAll="false"
                  panelClass="customFilterMultiSelect"
                  :loading="requestStatusStore.loading"
                  :options="users"
                  v-model="newRequest.user"
                  :class="{
                    'p-invalid': v$.user.$invalid && submittedForm,
                  }"
                >
                  <template #header>
                    <div class="p-2 w-full">
                      <div class="w-full flex justify-content-around">
                        <div class="w-full">
                          <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText
                              style="width: 98%"
                              :placeholder="`Search By ${$t(
                                `fields.searchFields.${usersFilterData.searchField}`
                              )}`"
                              v-model="usersFilterData.searchValue"
                              @input="debouncedOnInputChange"
                            />
                          </span>
                        </div>
                        <div>
                          <Button
                            icon="pi pi-filter"
                            severity="secondary"
                            class="mb-1"
                            @click="
                              () => {
                                showUserFilterFieldOptions =
                                  !showUserFilterFieldOptions;
                              }
                            "
                          />

                          <div
                            class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                            v-if="showUserFilterFieldOptions"
                          >
                            <div
                              v-for="(field, index) in userSearchFields"
                              :key="index"
                              class="listbox-item my-1"
                              @click="changeFilterField(field)"
                              :class="
                                field == usersFilterData.searchField
                                  ? 'active'
                                  : ''
                              "
                            >
                              {{ $t(`fields.searchFields.${field}`) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #option="data">
                    <img
                      :src="getImage(data.option.photoUrl)"
                      class="h-2rem w-2rem border-circle mx-2"
                    />
                    {{ data.option?.displayName }}
                  </template>
                  <template #value>
                    {{ newRequest.user ? newRequest.user["displayName"] : "" }}
                  </template>
                </dropdown>
                <label for="inputgroup">{{
                  v$.user.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t("fields.user"),
                      })
                    : $t("fields.user")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 xl:col-3 mb-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="gift-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <dropdown
                  optionLabel="name"
                  :maxSelectedLabels="3"
                  closeIcon=""
                  class="w-full"
                  panelClass="customFilterMultiSelect"
                  :loading="requestStatusStore.loading"
                  :options="discountCodes"
                  v-model="newRequest.discountCode"
                  @change="getEstimatedRequest"
                >
                  <template #header>
                    <div class="p-2 w-full">
                      <div class="w-full flex justify-content-around">
                        <div class="w-full">
                          <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText
                              style="width: 98%"
                              :placeholder="`Search By ${$t(
                                `fields.searchFields.${usersFilterData.searchField}`
                              )}`"
                              v-model="discountCodeSearchValue"
                              @input="debouncedOnDiscountInputChange"
                            />
                          </span>
                        </div>
                        <div>
                          <div
                            class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                            v-if="showUserFilterFieldOptions"
                          >
                            <div
                              v-for="(field, index) in userSearchFields"
                              :key="index"
                              class="listbox-item my-1"
                              @click="changeFilterField(field)"
                              :class="
                                field == usersFilterData.searchField
                                  ? 'active'
                                  : ''
                              "
                            >
                              {{ $t(`fields.searchFields.${field}`) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #option="data">
                    {{
                      data.option.code +
                      "   " +
                      getRegionsName(data.option?.regionIds)
                    }}
                  </template>
                  <template #value>
                    {{
                      newRequest.discountCode
                        ? newRequest.discountCode!["code"] +
                          "   " +
                          getRegionsName(newRequest.discountCode?.regionIds)
                        : ""
                    }}
                  </template>
                </dropdown>
                <label for="inputgroup">{{ $t("fields.discountCode") }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 xl:col-3 mb-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="car-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="w-full">
                <Dropdown
                  :options="services"
                  optionLabel="Typ"
                  :placeholder="$t('transportation.services.title')"
                  class="w-full h-full"
                  v-model="newRequest.service"
                  :class="{
                    'p-invalid': v$.service.$invalid && submittedForm,
                  }"
                  @change="getEstimatedRequest"
                >
                  <template #value="valueProp">
                    {{
                      v$.service.$invalid && submittedForm
                        ? $t("validationMessages.required", {
                            field: $t("transportation.services.title"),
                          })
                        : valueProp.value?.title ?? valueProp.placeholder
                    }}
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
          <div class="col-12 md:col-6 xl:col-3 mb-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="card-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="w-full">
                <Dropdown
                  :options="paymentTypes"
                  optionLabel="Typ"
                  :placeholder="$t('transportation.services.title')"
                  class="w-full h-full"
                  v-model="newRequest.paymentType"
                >
                  <template #value="valueProp">
                    {{ valueProp.value ?? valueProp.placeholder }}
                  </template>
                  <template #option="slotProps">
                    <div class="country-item flex w-full p-2">
                      <div style="font-size: 14px">
                        {{ slotProps.option }}
                      </div>
                    </div>
                  </template>
                </Dropdown>
              </span>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-content-center">
          <Message
            severity="error"
            class="w-full xl:w-8"
            :closable="false"
            v-if="v$.origin.$invalid && submittedForm"
          >
            {{
              $t("validationMessages.required", {
                field: $t("fields.origin"),
              })
            }}
          </Message>
          <Message
            severity="error"
            class="w-full xl:w-8"
            :closable="false"
            v-if="createEstimateRequestError"
          >
            {{
              $t("transportation.requests.createRequest.errorEstimateCreation")
            }}
          </Message>
        </div>
        <div class="">
          <div class="w-full flex justify-content-center align-items-center">
            <div id="createRequestMapContainer" class="w-full">
              <div
                @click="deletePoint"
                class="deleteContainer flex justify-content-center align-items-center cursor-pointer"
                v-if="newRequest.origin"
              >
                <ion-icon
                  name="trash-outline"
                  class="text-lg"
                  style="color: black"
                ></ion-icon>
              </div>
              <div
                style="
                  z-index: 1000;
                  left: 50%;
                  bottom: 10px;
                  position: absolute;
                  transform: translate(-50%, 0);
                "
                v-if="estimatedRequestData"
              >
                <div
                  style="
                    height: auto;
                    width: 400px;
                    background-color: var(--background-color-kubak);
                    border-radius: 10px;
                  "
                >
                  <div
                    class="w-full h-full flex flex-wrap justify-content-between align-items-between px-2"
                    style="color: black"
                  >
                    <div
                      class="p-2 border-round-md flex align-items-center"
                      style="min-width: 170px"
                    >
                      <ion-icon
                        name="cash-outline"
                        class="text-2xl m-2"
                      ></ion-icon>
                      <div
                        class="flex flex-column justify-content-center align-items-center"
                      >
                        <p style="font-size: 14px">
                          {{
                            $t(
                              "transportation.requests.createRequest.estimatedPrice"
                            )
                          }}
                        </p>
                        <p class="text-xl font-bold">
                          {{ estimatedRequestData.estimatedPrice }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-2 border-round-md flex align-items-center m-2"
                      style="min-width: 170px"
                      v-if="estimatedRequestData.discountedPrice"
                    >
                      <ion-icon
                        name="gift-outline"
                        class="text-2xl m-2"
                      ></ion-icon>
                      <div
                        class="flex flex-column justify-content-center align-items-center"
                      >
                        <p style="font-size: 14px">
                          {{
                            $t(
                              "transportation.requests.createRequest.discountedPrice"
                            )
                          }}
                        </p>
                        <p class="text-xl font-bold">
                          {{ estimatedRequestData.discountedPrice }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-2 border-round-md flex align-items-center"
                      style="min-width: 170px"
                      v-if="estimatedRequestData.discountValue"
                    >
                      <ion-icon
                        name="gift-outline"
                        class="text-2xl m-2"
                      ></ion-icon>
                      <div
                        class="flex flex-column justify-content-center align-items-center"
                      >
                        <p style="font-size: 14px">
                          {{
                            $t(
                              "transportation.requests.createRequest.discountedValue"
                            )
                          }}
                        </p>
                        <p class="text-xl font-bold">
                          {{ estimatedRequestData.discountValue }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-2 border-round-md flex align-items-center m-2"
                      style="min-width: 170px"
                    >
                      <ion-icon
                        name="wallet-outline"
                        class="text-2xl m-2"
                      ></ion-icon>
                      <div
                        class="flex flex-column justify-content-center align-items-center"
                      >
                        <p style="font-size: 14px">
                          {{ $t("transportation.requests.createRequest.loan") }}
                        </p>
                        <p class="text-xl font-bold">
                          {{ estimatedRequestData.loan ?? 0 }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-2 mt-4 flex justify-content-end mb-2">
          <Button @click="clearData()" severity="secondary" outlined>
            <i class="pi pi-times mr-2" style="font-size: 1rem"></i>
            {{ $t("buttons.clear") }}</Button
          >
          <Button
            @click="createNewRequest"
            class="mx-2"
            :loading="requestStatusStore.loading"
            ><i class="pi pi-check-circle mr-2" style="font-size: 1rem"></i
            >{{ $t("buttons.send_request") }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet-draw";
import decodeCoordinates from "@/composables/decodeCoordinates";
import {
  DiscountCodeService,
  MapService,
  type DiscountCodeDto,
  DiscountCodeSearchFieldEnum,
} from "@/backend/transport";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";
import { currentUser } from "@/stores/currentUser";
import { RequestService } from "@/backend/transport/services/RequestService";
import { PaymentType } from "@/backend/transport";
import { ServiceStore } from "@/stores/common/service";
import { requestStatus } from "@/stores/common/requestStatus";
import { UserSearchFieldEnum, UserService, type UserDto } from "@/backend/auth";
import { getImage } from "@/composables/getImage";
import { debounce } from "@/utils/debounce";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Message from "primevue/message";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { getMultiDestinationRouteColor } from "../monitoring/composables/multiDestinationRouteColos";
import { mapCreateRequestToDto, type CreateRequestDto } from "./mapper";
import MarkerIcon from "./markerIcon.svg";
import {
  getAllRegions,
  getExistingRegionsByIds,
} from "@/views/auth/regions/regions";

const toast = toastStore();
const { t } = useI18n();
const serviceStore = ServiceStore();
const requestStatusStore = requestStatus();
const usersFilterData = ref({
  searchField: UserSearchFieldEnum.NAME_FIELD,
  searchValue: "",
});
const users = ref<UserDto[]>([]);
const userSearchFields = Object.keys(UserSearchFieldEnum).map(
  (key) => UserSearchFieldEnum[key]
);
const paymentTypes = Object.keys(PaymentType).map((key) => PaymentType[key]);
const services = ref();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});
const newRequest = ref<CreateRequestDto>({
  user: undefined,
  origin: undefined,
  currentLocation: {
    lat: 0,
    lng: 0,
  },
  service: undefined,
  paymentType: PaymentType.BALANCE,
  destinations: [],
  discountCode: undefined,
});
const estimatedRequestData = ref();
const currentUserStore = currentUser();
const monitoringStore = MonitoringStore();

const startedDrawing = ref(false);
const showUserFilterFieldOptions = ref(false);
const discountCodes = ref<DiscountCodeDto[]>([]);
const discountCodeSearchValue = ref();
const createEstimateRequestError = ref(false);
const rule = {
  user: { required },
  origin: { required },
  paymentType: { required },
  service: { required },
};
const v$ = useVuelidate(rule, newRequest as any);
const submittedForm = ref(false);
onMounted(async () => {
  mapRender();
  await getAllUsers();
  getDiscountCodes();
  await getAllRegions();
});
let map;
const tileLayer = ref(
  monitoringStore.mapTileURL ??
    "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A"
);
let drawnItems = new L.FeatureGroup();

function customMarkerIcon() {
  return new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}
const drawOptions = {
  draw: {
    circle: false,
    polyline: false,
    polygon: false,
    rectangle: false,
    marker: {
      icon: customMarkerIcon(),
    },
    circlemarker: false,
  },
  edit: {
    edit: false,
    remove: false,
    featureGroup: drawnItems,
  },
};
const drawControl = new (L.Control as any).Draw(drawOptions);
function mapRender() {
  map = L.map("createRequestMapContainer").setView(
    [
      currentUserStore?.userInfo?.region?.location?.lat ?? 35.564558,
      currentUserStore?.userInfo?.region?.location?.lng ?? 45.437937,
    ],
    13
  );
  drawnItems = L.featureGroup().addTo(map);

  L.tileLayer(tileLayer.value, {
    subdomains: ["a", "b"],
    maxZoom: 18,
    id: "cl5z8606q002o14odi8ee3hjr",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
  }).addTo(map);
  map.addControl(drawControl);
  map.on("draw:created", createdPoint);
  map.on("draw:drawstart", () => {
    startedDrawing.value = true;
  });
  map.on("draw:drawstop", () => {
    startedDrawing.value = false;
  });
}
function createdPoint(e) {
  const requestIcon = L.divIcon({
    className: "leaflet-data-marker",
    html: newRequest.value.origin ? marker("#0044CB") : marker("black"),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  if (!newRequest.value.service || !newRequest.value.user) {
    createEstimateRequestError.value = true;
    return;
  }
  createEstimateRequestError.value = false;

  if (newRequest.value.origin) {
    newRequest.value.destinations?.push(e.layer._latlng);
    const markerMark: any = L.marker(e.layer._latlng, {
      icon: requestIcon,
    }).addTo(map);
    markerMark._leafletId = `destination${newRequest.value.destinations?.length}`;

    if (newRequest.value.destinations) {
      getEstimatedRequest();
    }
  } else {
    newRequest.value.origin = e.layer._latlng;
    const markerMark: any = L.marker(e.layer._latlng, {
      icon: requestIcon,
    }).addTo(map);
    markerMark._leafletId = "origin1";
  }
}
function getEstimatedRequest() {
  if (
    !newRequest.value.service ||
    !newRequest.value.user ||
    !newRequest.value.origin
  )
    return;
  RequestService.getEstimatedRequest({
    requestBody: {
      serviceId: newRequest.value.service!.id!,
      source: newRequest.value.origin,
      userId: newRequest.value.user!.uid!,
      destinations: newRequest.value.destinations,
      discountCodeId: newRequest.value.discountCode?.id,
    },
  }).then((response) => {
    for (const index in map._layers) {
      if (map._layers[index]._leafletId == "routing") {
        map.removeLayer(map._layers[index]);
      }
    }
    response.directions?.map((res, index) => {
      const routingPolyline: any = L.polyline(
        decodeCoordinates(res.route as string),
        {
          color: getMultiDestinationRouteColor(index),
          dashArray: "10,10",
          className: "estimatedRoute",
        }
      ).addTo(map);
      routingPolyline._leafletId = "routing";
    });
    estimatedRequestData.value = response;
  });
}
async function getAllUsers() {
  UserService.getUsers(usersFilterData.value).then((response) => {
    users.value = response.items ?? [];
  });
}
async function getDiscountCodes() {
  await DiscountCodeService.listDiscountCodes({
    activeCodesOnly: true,
    includeDisable: false,
    searchField: discountCodeSearchValue.value
      ? DiscountCodeSearchFieldEnum.CODE
      : undefined,
    searchValue: discountCodeSearchValue.value,
  }).then((Response) => {
    discountCodes.value = Response.items ?? [];
  });
}
const debouncedOnInputChange = debounce(getAllUsers, 500);
const debouncedOnDiscountInputChange = debounce(getDiscountCodes, 500);
function changeFilterField(field) {
  usersFilterData.value.searchField = field;
  setTimeout(() => {
    showUserFilterFieldOptions.value = false;
  }, 100);
}
async function deletePoint() {
  let layerId;
  if (
    newRequest.value.destinations &&
    newRequest.value.destinations.length > 0
  ) {
    newRequest.value.destinations.pop();
    layerId = `destination${newRequest.value.destinations.length + 1}`;
  } else {
    newRequest.value.origin = undefined;
    layerId = "origin1";
  }
  for (const index in map._layers) {
    if (
      map._layers[index]._leafletId == layerId ||
      map._layers[index]._leafletId == "routing"
    ) {
      map.removeLayer(map._layers[index]);
    }
  }
  if (
    newRequest.value.destinations &&
    newRequest.value.destinations.length > 0 &&
    newRequest.value.origin
  ) {
    MapService.routing({
      requestBody: {
        origin: newRequest.value.origin,
        destination: newRequest.value.destinations,
      },
    }).then((res: any) => {
      const routingPolyline: any = L.polyline(
        decodeCoordinates(res.route as string),
        {
          color: "#3D4042",
          dashArray: "10,10",
          className: "estimatedRoute",
        }
      ).addTo(map);
      routingPolyline._leafletId = "routing";
    });
  }
}
function marker(color: string) {
  return `<svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="${color}"/>
`;
}
async function createNewRequest() {
  submittedForm.value = true;
  if (v$.value.$invalid) return;

  await RequestService.createNewRequestForClient({
    requestBody: mapCreateRequestToDto(newRequest.value),
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.request_create_header"),
      summary: t("toasts.request_create_desc"),
      type: "success",
    });
  });
  submittedForm.value = false;
}
function clearData() {
  for (const layer in map._layers) {
    if (map._layers[layer]._leafletId) {
      map.removeLayer(map._layers[layer]);
    }
  }
  newRequest.value = {
    user: undefined,
    origin: undefined,
    currentLocation: {
      lat: 0,
      lng: 0,
    },
    service: undefined,
    discountCode: undefined,
    paymentType: PaymentType.BALANCE,
    destinations: [],
  };
  estimatedRequestData.value = undefined;
}
function getRegionsName(regionIds) {
  const response = getExistingRegionsByIds(regionIds);
  return response?.map((region) => region.name).join(", ");
}
</script>
<style lang="scss">
.estimatedRoute {
  animation: dash 1s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}
#createRequestMapContainer {
  height: calc(100vh - 350px);
  border-radius: 10px;
  .deleteContainer {
    height: 33px;
    width: 33px;
    background-color: white;
    z-index: 1000000;
    position: absolute;
    top: auto;
    margin-top: 130px;
    margin-left: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    line-height: 30px;
    left: 0;
    &:hover {
      background-color: #f4f4f4;
    }
  }
}
.customFilterMultiSelect {
  .p-dropdown-item {
    display: flex !important;
    align-items: center !important;
  }
}
.listBox {
  position: absolute;
  right: 0;
  width: 100px !important;
  margin: 0 10px;
  z-index: 2000000000000;
  background-color: var(--background-color-kubak);
  border-radius: 4px;
  .listbox-item {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0;
    &:hover {
      background-color: var(--default-color-hover-kubak);
    }
    &.active {
      background-color: var(--default-color-hover-kubak);
    }
  }
}
</style>
