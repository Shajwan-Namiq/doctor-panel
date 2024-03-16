<template>
  <div class="page-style">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <!-- Filter by start Date  -->
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
                      v-model="filterData.createdFrom"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <!-- Filter by end Date  -->
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
                      v-model="filterData.createdTo"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="searchFiledOptions"
                    display="chip"
                    :placeholder="$t('dropdowns.searchField.placeholder')"
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
                      v-model="filterData.searchValue"
                    />
                    <label for="inputgroup">{{ $t("fields.search") }}</label>
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
                    :placeholder="$t('auth.area.region')"
                    v-model="filterData.region"
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
                    <ion-icon
                      name="color-filter-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    display="chip"
                    :placeholder="$t('dropdowns.servantStatuses.placeholder')"
                    v-model="filterData.status"
                    :options="servantStatuses"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value
                          ? $t(`dropdowns.servantStatuses.${valueProp.value}`)
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{
                          $t(`dropdowns.servantStatuses.${slotProps.option}`)
                        }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.export')"
                icon="pi pi-upload"
                severity="help"
                @click="
                  exportAsXlsx(servants.items, 'servants.xlsx', 'servants')
                "
              />
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                @click="clearData"
                class="mx-2 p-button-secondary"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="getAllServants"
              />
            </div>
          </div>
        </Transition>
      </div>
      <div>
        <DataTable
          :loading="requestStatusStore.loading || !servants"
          :value="servants?.items"
          responsiveLayout="scroll"
          :paginator="servants?.items ? true : false"
          :rows="servants?.limit ?? 10"
          :totalRecords="servants?.count"
          :lazy="true"
          :currentPageReportTemplate="
            $t('table.paginator', {
              first: '{first}',
              last: '{last}',
              totalRecords: '{totalRecords}',
            })
          "
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
          style="min-height: 300px"
          @page="paginate"
          @sort="sortData"
        >
          <Column
            :header="$t('transportation.servant.id')"
            sortable
            sortField="id"
          >
            <template #body="servant">
              <div
                class="h-full w-full cursor-pointer"
                @click="detail(servant.data)"
              >
                {{ servant.data.id }}
              </div>
            </template>
          </Column>
          <Column :header="$t('transportation.servant.avatar')">
            <template #body="servant">
              <img
                :src="getImage(servant.data.avatarUrl)"
                class="h-4rem w-4rem border-circle"
                style="object-fit: cover"
              />
            </template>
          </Column>
          <Column :header="$t('transportation.servant.fullName')">
            <template #body="servant">
              {{ servant.data.fullName }}
            </template>
          </Column>
          <Column :header="$t('transportation.servant.mobile')">
            <template #body="servant">
              {{ servant.data.phoneNumber }}
            </template>
          </Column>

          <Column :header="$t('transportation.servant.detail.status')">
            <template #body="servant">
              <div :class="`servant ${servant.data.status}`">
                {{ servant.data.status }}
              </div>
            </template>
          </Column>
          <Column :header="$t('transportation.servant.blocked.title')">
            <template #body="servant">
              <div
                :class="`servant ${servant.data.blocked ? 'Block' : 'Active'}`"
              >
                {{
                  $t(`transportation.servant.blocked.${servant.data.blocked}`)
                }}
              </div>
            </template>
          </Column>
          <Column
            :header="$t('fields.createdAt')"
            sortable
            sortField="createdAt"
          >
            <template #body="servant">
              <div
                v-if="servant.data.createdAt"
                class="flex justify-content-center flex-column"
              >
                <div>
                  {{
                    moment(servant.data.createdAt).utc().format("YYYY-MM-DD")
                  }}
                </div>
                <div class="mt-1 mx-2">
                  {{ moment(servant.data.createdAt).utc().format("HH:mm:ss") }}
                </div>
              </div>
            </template>
          </Column>
          <Column :exportable="false" style="width: 10rem; text-align: end">
            <template #body="servant">
              <div class="px-8 flex">
                <Button
                  icon="pi pi-info"
                  class="p-button-success"
                  @click="detail(servant.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ServantService } from "@/backend/transport/services/ServantService";
import { ServantStatusEnum } from "@/backend/transport";
import { ServantSearchFieldEnum } from "@/backend/transport";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { requestStatus } from "@/stores/common/requestStatus";
import Column from "primevue/column";
import moment from "moment";
import { getImage } from "@/composables/getImage";
import { exportAsXlsx } from "@/composables/exportAdXlsx";
import {
  createMapServantListFilterDto,
  type ServantListFilterDto,
} from "./mapper";
import { getAllRegions } from "@/views/auth/regions/regions";

const servantStatuses = Object.keys(ServantStatusEnum).map(
  (key) => ServantStatusEnum[key]
);
const searchFiledOptions = Object.keys(ServantSearchFieldEnum).map(
  (key) => ServantSearchFieldEnum[key]
);
const requestStatusStore = requestStatus();

const regions = ref<RegionDto[]>();
onMounted(async () => {
  regions.value = await getAllRegions();
});

const servants = ref();
const filterData = ref<ServantListFilterDto>({
  searchField: undefined,
  status: undefined,
  searchValue: undefined,
  incompleteOnly: undefined,
  region: undefined,
  page: undefined,
  sortField: "id",
  sortDescending: true,
  createdFrom: undefined,
  createdTo: undefined,
});

onMounted(async () => {
  await getAllServants();
});

async function getAllServants() {
  ServantService.listServants(
    createMapServantListFilterDto(filterData.value)
  ).then((response) => {
    servants.value = response;
  });
}

const router = useRouter();
function detail(data) {
  router.push({
    name: "detailServant",
    params: {
      id: data.id,
    },
  });
}

async function clearData() {
  filterData.value = {
    searchField: undefined,
    status: undefined,
    searchValue: undefined,
    incompleteOnly: undefined,
    region: undefined,
    page: undefined,
    sortField: "id",
    sortDescending: true,
    createdFrom: undefined,
    createdTo: undefined,
  };
  await getAllServants();
}
function sortData(event) {
  const field = event.sortField.split(".");
  filterData.value.sortField = field[field.length - 1];
  filterData.value.sortDescending = event.sortOrder == 1 ? true : false;
  getAllServants();
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllServants();
}
</script>
