<template>
  <div class="page-style">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 lg:col-6 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    display="chip"
                    :placeholder="$t('dropdowns.searchField.placeholder')"
                    :options="searchField"
                    v-model="filterData.searchField"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(`dropdowns.searchField.${valueProp.value}`)
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ $t(`dropdowns.searchField.${slotProps.option}`) }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 lg:col-6 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.searchValue"
                    />
                    <label for="inputgroup">{{ $t("fields.search") }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 lg:col-6 xl:col-3">
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
                      $t('dropdowns.discountCode.isActive.placeholder')
                    "
                    :options="activeCodes"
                    v-model="filterData.activeCodesOnly"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value != undefined
                          ? $t(
                              `dropdowns.discountCode.isActive.${valueProp.value}`
                            )
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(
                            `dropdowns.discountCode.isActive.${slotProps.option}`
                          )
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 lg:col-6 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    display="chip"
                    :placeholder="$t('auth.area.regions')"
                    :options="regions"
                    @change="changeRegionId"
                    v-model="selectedRegion"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.name ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.name }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="flex justify-content-end mb-3">
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mr-2 p-button-secondary"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.search')"
                @click="filterCode"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </Transition>
      </div>
      <tableComponent
        :tableInformation="tableInformation"
        :response="discountCode"
        @clickedFirstCell="detail"
        @sort="sortData"
        @page="paginate"
      >
      </tableComponent>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import tableComponent from "@/common/interfaces/tableComponent.vue";
import { DiscountCodeService } from "@/backend/transport/services/DiscountCodeService";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/auth";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();
const filterContainerHeight = ref(40);

const discountCode = ref();

const tableInformation = {
  clickFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "code",
      header: "transportation.discountCode.fields.code",
      clickable: true,
      sortable: true,
    },
    {
      field: "type",
      header: "transportation.discountCode.fields.type.type",
      sortable: true,
    },
    {
      field: "startAt",
      header: "transportation.common.startDate",
      sortable: true,
      format: "DD-MM-YYYY HH:mm:ss",
    },
    {
      field: "expireAt",
      header: "transportation.common.endAt",
      sortable: true,
      format: "DD-MM-YYYY HH:mm:ss",
    },
    {
      field: "isActive",
      header: "transportation.discountCode.fields.active.isActive",
      status: "isActiveDiscountCode",
      value: "transportation.discountCode.fields.active",
    },
    {
      field: "isHidden",
      header: "transportation.discountCode.fields.isHidden.isHidden",
      status: "isHiddenDiscountCode",
      value: "transportation.discountCode.fields.isHidden",
    },
  ],
  policies: { editPolicy: "WriteDiscountCode" },
};
const searchField = ref(["code"]);
const activeCodes = ref([true, false]);
const router = useRouter();
const selectedRegion = ref();

const filterData = ref({
  searchField: undefined,
  searchValue: "",
  activeCodesOnly: undefined,
  regionId: undefined,
  page: 0,
  sortField: "id",
  sortDescending: true,
  includeDisable: true,
});

getAllDiscountCode();
function getAllDiscountCode() {
  DiscountCodeService.listDiscountCodes(filterData.value).then((response) => {
    if (response && response.items) {
      response.items.forEach((offer) => {
        if (offer.startAt) {
          offer.startAt = toLocaleDateFormat(offer.startAt);
        }
        if (offer.expireAt) {
          offer.expireAt = toLocaleDateFormat(offer.expireAt);
        }
      });
    }
    discountCode.value = response;
  });
}
function detail(data) {
  router.push({
    name: "transportationDetailDiscountCode",
    params: {
      id: data.id,
    },
  });
}
function changeRegionId() {
  filterData.value.regionId = selectedRegion.value.id;
}
function filterCode() {
  getAllDiscountCode();
}

function clearData() {
  filterData.value = {
    searchField: undefined,
    searchValue: "",
    activeCodesOnly: undefined,
    regionId: undefined,
    page: 0,
    sortField: "",
    sortDescending: false,
    includeDisable: true,
  };
  selectedRegion.value = undefined;
}
function sortData(event) {
  const field = event.sortField.split(".");
  filterData.value.sortField = field;
  filterData.value.sortDescending = event.sortOrder == 1 ? true : false;
  getAllDiscountCode();
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllDiscountCode();
}
</script>
<style lang="scss">
@import url("@/styles/statusColors/discountCode.scss");
.isActiveDiscountCode {
  height: 30px;
  width: 100px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  &.false {
    background-color: var(--discountCode-not-active);
  }
  &.true {
    background-color: var(--discountCode-active);
  }
}
.isHiddenDiscountCode {
  height: 30px;
  width: 100px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  &.false {
    background-color: var(--discountCode-not-active);
  }
  &.true {
    background-color: var(--discountCode-active);
  }
}
</style>
