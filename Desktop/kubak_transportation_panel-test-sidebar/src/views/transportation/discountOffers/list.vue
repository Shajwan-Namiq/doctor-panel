<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <!-- filtering data  -->
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 lg:col-4 xl:col-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    display="chip"
                    :placeholder="
                      $t('dropdowns.discountOffers.isActive.placeholder')
                    "
                    :options="activeCodes"
                    v-model="filterData.isActive"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value != undefined
                          ? $t(
                              `dropdowns.discountOffers.isActive.${valueProp.value}`
                            )
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(
                            `dropdowns.discountOffers.isActive.${slotProps.option}`
                          )
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>

              <div class="col-12 lg:col-4 xl:col-4">
                <SearchUserComponent
                  @selectedUsers="
                    (selectedUsers) => {
                      filterData.users = selectedUsers;
                    }
                  "
                />
              </div>

              <div class="col-12 lg:col-4 xl:col-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                  </span>
                  <MultiSelect
                    :options="serviceStore.serviceTypes"
                    display="chip"
                    :placeholder="$t('routes.services')"
                    v-model="filterData.service"
                  >
                    <template #value="valueProp">
                      <div class="mt-1">
                        <div class="mt-1">
                          {{
                            valueProp.value?.length
                              ? valueProp.value
                                  .map((x) => x.translations[0].title)
                                  .join(" , ")
                              : valueProp.placeholder
                          }}
                        </div>
                      </div>
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option?.translations[0]?.title }}</p>
                    </template>
                  </MultiSelect>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-content-end my-4">
              <Button
                class="mx-3"
                :label="$t('buttons.detectLocation')"
                icon="pi pi-map-marker"
                @click="visible = true"
              />
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mr-2 p-button-secondary"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="filterDiscountOffers"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </Transition>
      </div>

      <!-- showing  data  -->
      <tableComponent
        :tableInformation="tableInformation"
        :response="discountOffers"
        @clickedFirstCell="detail"
        @page="paginate"
      >
      </tableComponent>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <MapBoxComponent
      @update-location="handleMapClick"
      @close-modal="handleCloseModal"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import MapBoxComponent from "./MapBoxComponent.vue";
import {
  DiscountOffersService,
  DiscountStepTimeFrame,
  DiscountType,
  type DiscountOfferDtoPagination,
} from "@/backend/transport";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import {
  createMapperForListDiscountOffers,
  type FilterDiscountOffersFilterRequestDto,
} from "./mapper";
import tableComponent from "@/common/interfaces/tableComponent.vue";
import { useRouter } from "vue-router";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { ServiceStore } from "@/stores/common/service";
import Dialog from "primevue/dialog";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";

const requestStatusStore = requestStatus();
const discountOffers = ref<DiscountOfferDtoPagination>();
const router = useRouter();
const activeCodes = ref([true, false]);
const filterCleared = ref(false);

const serviceStore = ServiceStore();
serviceStore.getAllServiceType();

const visible = ref(false);

const tableInformation = {
  clickFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "id",
      header: "transportation.discountOffers.fields.code",
      clickable: true,
    },
    {
      field: "type",
      header: "transportation.discountOffers.fields.types",
    },
    {
      field: "value",
      header: "transportation.discountOffers.fields.value",
    },
    {
      field: "maxDiscountAmount",
      header: "transportation.discountOffers.fields.maxDiscountAmount",
    },
    {
      field: "startFrom",
      header: "transportation.discountOffers.fields.startDate",
      format: "DD-MM-YYYY HH:mm:ss",
    },
    {
      field: "validUntil",
      header: "transportation.discountOffers.fields.validUntil",
      format: "DD-MM-YYYY HH:mm:ss",
    },
  ],
};

const filterData = ref<FilterDiscountOffersFilterRequestDto>({
  page: undefined,
  limit: undefined,
  service: undefined,
  users: undefined,
  locationLng: undefined,
  locationLat: undefined,
  isActive: undefined,
});

// calling map
const handleMapClick = (latitude, longitude) => {
  filterData.value.locationLat = latitude;
  filterData.value.locationLng = longitude;
};

const handleCloseModal = () => {
  visible.value = false;
};

// filtering data

function filterDiscountOffers() {
  getAllDiscountOffers();
}

function clearData() {
  filterData.value = {
    page: undefined,
    limit: undefined,
    service: undefined,
    users: undefined,
    locationLng: undefined,
    locationLat: undefined,
    isActive: undefined,
  };
  filterCleared.value = true;
  getAllDiscountOffers();
}

getAllDiscountOffers();

function getAllDiscountOffers() {
  DiscountOffersService.getDiscountOffers(
    createMapperForListDiscountOffers(filterData.value)
  ).then((response) => {
    if (response && response.items) {
      response.items.forEach((offer) => {
        if (offer.startFrom) {
          offer.startFrom = toLocaleDateFormat(offer.startFrom);
        }
        if (offer.validUntil) {
          offer.validUntil = toLocaleDateFormat(offer.validUntil);
        }
      });
    }
    discountOffers.value = response;
  });
}

// adding pagination to table
function paginate(event) {
  filterData.value.page = event.page;
  getAllDiscountOffers();
}

function detail(data) {
  router.push({
    name: "transportationDetailDiscountOffers",
    params: {
      id: data.id,
    },
  });
}
</script>

<style>
.map-container {
  height: 400px;
}
</style>
