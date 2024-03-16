<template>
  <div class="page-style">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterRequestData.startDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterRequestData.endDate"
                      :class="{
                        'p-invalid': filterRequestData.startDate! > filterRequestData.endDate!,
                      }"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      filterRequestData.startDate! > filterRequestData.endDate!
                        ? $t(
                            "validationMessages.end_date_must_greater_than_start_date"
                          )
                        : $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
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
                    v-model="filterRequestData.region"
                    :options="regions"
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
                      class="w-full h-full"
                      v-model="filterRequestData.service"
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
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    v-model="filterRequestData.searchField"
                    :options="userSearchFields"
                    display="chip"
                    :placeholder="$t('dropdowns.searchField.placeholder')"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(
                              `transportation.discountCode.usage.searchBy.${valueProp.value}`
                            )
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(
                            `transportation.discountCode.usage.searchBy.${slotProps.option}`
                          )
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputText
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterRequestData.searchValue"
                    />
                    <label for="inputgroup">{{ $t("fields.search") }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="discountTypes"
                    display="chip"
                    :placeholder="
                      $t('transportation.discountCode.usage.discountType')
                    "
                    v-model="filterRequestData.discountType"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="discountActiveTypes"
                    display="chip"
                    :placeholder="
                      $t(
                        'transportation.discountCode.usage.activeOnly.placeholder'
                      )
                    "
                    v-model="filterRequestData.activeOnly"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value !== undefined || valueProp.value != null
                          ? $t(
                              `transportation.discountCode.usage.activeOnly.${valueProp.value}`
                            )
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(
                            `transportation.discountCode.usage.activeOnly.${slotProps.option}`
                          )
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterRequestData.discountAmountLessThan"
                    />
                    <label for="inputgroup">{{
                      $t(
                        "transportation.discountCode.usage.discountAmountLessThan"
                      )
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterRequestData.discountAmountGreaterThan"
                    />
                    <label for="inputgroup">{{
                      $t(
                        "transportation.discountCode.usage.discountAmountLessThan"
                      )
                    }}</label>
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearData"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="getAllDiscountUsage()"
                :loading="requestStatusStore.loading"
                :disabled="filterRequestData.startDate! > filterRequestData.endDate!"
              />
            </div>
          </div>
        </Transition>
      </div>

      <DataTable
        :value="discountUsages.items"
        v-model:expandedRows="expandedRows"
        dataKey="userId"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
        :rowReorder="true"
        :paginator="true"
        :rows="discountUsages?.limit ?? 10"
        :totalRecords="discountUsages?.count"
        @page="paginate"
      >
        <template #header>
          <div class="table-header">
            {{ $t("transportation.serviceType.name") }}
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column
          v-for="(header, index) in tableHeaders.headers"
          :header="$t(`transportation.discountCode.usage.${header}`)"
          :key="index"
        >
          <template #body="slotProps">
            {{
              header == "lastRequestAt"
                ? moment
                    .utc(slotProps.data[header])
                    .local()
                    .format("DD-MM-YYYY hh:mm:ss ")
                : slotProps.data[header]
            }}
          </template>
        </Column>

        <Column :exportable="false" style="width: 10rem"> </Column>
        <template #expansion="usageProps">
          <div class="orders-subtable">
            <DataTable
              :value="usageProps.data.requests"
              responsiveLayout="scroll"
              class="expanded-table"
            >
              <Column
                v-for="(subHeader, index) in tableHeaders.subHeaders"
                :header="$t(`transportation.discountCode.usage.${subHeader}`)"
                :key="index"
              >
                <template #body="requestProp">
                  <div
                    :class="
                      subHeader == 'statusEnum'
                        ? `requestStatuses ${requestProp.data[subHeader]}`
                        : ''
                    "
                  >
                    {{
                      subHeader == "type"
                        ? requestProp.data[subHeader]
                        : subHeader == "createdAt"
                        ? moment
                            .utc(requestProp.data[subHeader])
                            .local()
                            .format("DD-MM-YYYY hh:mm:ss ")
                        : requestProp.data[subHeader]
                    }}
                  </div>
                </template>
              </Column>

              <Column :exportable="false" style="width: 10rem">
                <template #body="requestProp">
                  <Button
                    icon="pi pi-info"
                    class="p-button-success mr-2"
                    v-tooltip.bottom="'more detail'"
                    @click="requestDetail(requestProp.data?.taskId)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #footer>
          <div class="w-full flex justify-content-end px-8">
            {{ $t("transportation.requests.totalUsers") }}:
            {{ discountUsages?.metadata?.numberOfUsers }}
          </div>
          <div class="w-full flex justify-content-end px-8 mt-2">
            {{ $t("transportation.discountCode.usage.totalDiscountAmount") }}:
            {{ discountUsages?.metadata?.totalDiscountAmount }}
          </div>
        </template>
        <template #empty>
          <div
            class="w-full flex justify-content-center flex-column align-items-center py-6"
            v-if="!requestStatusStore.loading"
          >
            <img
              src="@/static/images/empty.png"
              style="height: 80px; width: 150px"
            />

            <h3 class="mt-3">{{ $t("reusables.emptyRecordHeader") }}</h3>
            <p>{{ $t("reusables.emptyRecordDesc") }}</p>
          </div>
        </template>
        <ConfirmDialog></ConfirmDialog>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { endOfToday, startOfToday } from "@/composables/customRequest";
import { requestStatus } from "@/stores/common/requestStatus";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  DiscountCodeService,
  type DiscountCodeDtoPagination,
  ListDiscountUsageDiscountType,
  DiscountCodeSearchFieldEnum,
} from "@/backend/transport";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import moment from "moment";
import { ServiceStore } from "@/stores/common/service";
import {
  createMapperForDiscountUsageFilterRequest,
  type DiscountUsageFilterRequestDto,
} from "./mapper";

const router = useRouter();
const expandedRows = ref<any>([]);

const requestStatusStore = requestStatus();
const userSearchFields = Object.keys(DiscountCodeSearchFieldEnum).map(
  (key) => DiscountCodeSearchFieldEnum[key]
);
const discountTypes = Object.keys(ListDiscountUsageDiscountType).map(
  (key) => ListDiscountUsageDiscountType[key]
);
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
const discountUsages = ref<DiscountCodeDtoPagination>({
  items: [],
});
const discountActiveTypes = [true, false];

regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const tableHeaders = {
  headers: ["userName", "userPhoneNumber", "usedCount", "totalAmount"],
  subHeaders: ["discountName", "type", "amount"],
};

const filterRequestData = ref<DiscountUsageFilterRequestDto>({
  activeOnly: undefined,
  discountAmountGreaterThan: undefined,
  discountAmountLessThan: undefined,
  discountType: undefined,
  endDate: new Date(endOfToday),
  page: undefined,
  region: undefined,
  searchField: undefined,
  searchValue: undefined,
  service: undefined,
  startDate: new Date(startOfToday),
  user: undefined,
});
const serviceStore = ServiceStore();
const services = ref();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});

onMounted(() => {
  getAllDiscountUsage();
});

async function getAllDiscountUsage() {
  await DiscountCodeService.listDiscountUsages(
    createMapperForDiscountUsageFilterRequest(filterRequestData.value)
  ).then((response) => {
    discountUsages.value = response;
  });
}

function clearData() {
  filterRequestData.value = {
    activeOnly: undefined,
    discountAmountGreaterThan: undefined,
    discountAmountLessThan: undefined,
    discountType: undefined,
    endDate: new Date(endOfToday),
    page: undefined,
    region: undefined,
    searchField: undefined,
    searchValue: undefined,
    service: undefined,
    startDate: new Date(startOfToday),
    user: undefined,
  };
}
function paginate(event) {
  filterRequestData.value.page = event.page;
  getAllDiscountUsage();
}
function requestDetail(taskId) {
  router.push({
    name: "detailTask",
    params: {
      id: taskId,
    },
  });
}
</script>
