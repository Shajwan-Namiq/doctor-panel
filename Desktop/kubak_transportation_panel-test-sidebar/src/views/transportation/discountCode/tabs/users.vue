<template>
  <div class="p">
    <div class="pageWrapper">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid px-6" style="width: 100% !important">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="regions"
                    display="chip"
                    :placeholder="$t('auth.area.regions')"
                    v-model="filterData.region"
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
            <div class="px-6 flex justify-content-end">
              <Button
                :label="$t('buttons.clear')"
                @click="clearData"
                class="mx-1 p-button-secondary"
              />
              <Button
                :label="$t('buttons.search')"
                @click="search"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </Transition>
      </div>
      <tableComponent
        :tableInformation="tableInformation"
        :response="users"
        @clickedFirstCell="detail"
        @page="paginate"
        @sort="sortData"
      >
        <template #footer>
          <div
            class="flex justify-content-end flex-column align-items-end w-full"
          >
            <div>
              <p class="mb-3 mt-2">
                Total Amount :
                <span>{{ users?.metadata.totalDiscountAmount }} IQD </span>
              </p>
              <p>
                Total Count : <span>{{ users?.metadata.totalCount }}</span>
              </p>
            </div>
          </div>
        </template>
      </tableComponent>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { requestStatus } from "@/stores/common/requestStatus";
import {
  DiscountCodeSearchFieldEnum,
  DiscountCodeService,
  type DiscountCodeDtoPagination,
  type RegionDto,
} from "@/backend/transport";
import tableComponent from "@/common/interfaces/tableComponent.vue";
import { RegionStore } from "@/stores/common/region";

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();
const tableInformation = {
  hideAddDialog: true,
  headers: [
    {
      field: "userName",
      header: "transportation.discountCode.users.name",
    },
    {
      field: "userPhoneNumber",
      header: "transportation.discountCode.users.mobile",
    },
    {
      field: "amount",
      header: "transportation.discountCode.users.amount",
    },
    {
      field: "count",
      header: "transportation.discountCode.users.count",
    },
  ],
};

const route = useRoute();
const filterData = ref<any>({
  searchField: DiscountCodeSearchFieldEnum.ID,
  searchValue: +route.params.id,
  region: undefined,
  codeId: +route.params.id,
  page: 0,
  sortField: undefined,
  sortDescending: undefined,
});

const users = ref<DiscountCodeDtoPagination>();
getUsers();
async function getUsers() {
  await DiscountCodeService.listDiscountUsages({
    regionId: filterData.value?.region?.id,
  }).then((response) => {
    users.value = response;
  });
}

const router = useRouter();
function detail(data) {
  router.push({
    name: "detailServant",
    params: {
      id: data.Servant.Id,
    },
  });
}

function search() {
  if (!filterData.value.searchValue) {
    filterData.value.searchField = undefined;
  }
  getUsers();
}

function clearData() {
  filterData.value = {
    searchField: undefined,
    searchValue: undefined,
    region: undefined,
    codeId: +route.params.id,
    page: 0,
    sortField: undefined,
    sortDescending: undefined,
  };
}
function paginate(event) {
  filterData.value.page = event.page;
  getUsers();
}
function sortData(event) {
  const field =
    event.sortField.split(".")[event.sortField.split(".").length - 1];
  filterData.value.sortField = field;
  filterData.value.sortDescending = event.sortOrder == 1 ? true : false;
  getUsers();
}
</script>
<style lang="scss">
.servantStatus {
  height: 34px;
  width: 115px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.Online {
    background-color: #1cbfad;
    color: white;
  }
}
</style>
