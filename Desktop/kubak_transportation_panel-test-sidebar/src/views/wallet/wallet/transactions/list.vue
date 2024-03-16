<template>
  <div class="page-style">
    <div class="page-container">
      <!-- filtering  -->
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <!-- max transactionDate -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="number"
                      v-model="lazyParams.maxTransactionPrice"
                    />
                    <label for="inputgroup">{{
                      $t("wallet.maxTransaction")
                    }}</label>
                  </span>
                </div>
              </div>
              <!-- min transactionDate -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="number"
                      v-model="lazyParams.minTransactionPrice"
                    />
                    <label for="inputgroup">{{
                      $t("wallet.minTransaction")
                    }}</label>
                  </span>
                </div>
              </div>

              <!-- sender regions  -->
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
                    :placeholder="$t('auth.area.senderRegions')"
                    v-model="lazyParams.receiverWalletUserRegion"
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

              <!-- receiver regions  -->
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
                    :placeholder="$t('auth.area.receiverRegions')"
                    v-model="lazyParams.senderWalletUserRegion"
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
                    <ion-icon name="wallet-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="walletTransactionTypes"
                    display="chip"
                    :placeholder="$t('wallet.walletTransactionType')"
                    v-model="lazyParams.transactionType"
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

              <!-- source wallet users  -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      lazyParams.sourceWalletUser = selectedUser;
                    }
                  "
                  :singleUser="true"
                  :placeholder="$t('wallet.sourceUser')"
                />
              </div>

              <!-- destination wallet users  -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      lazyParams.destinationWalletUser = selectedUser;
                    }
                  "
                  :singleUser="true"
                  :placeholder="$t('wallet.destinationUser')"
                />
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      lazyParams.transactionContainsUser = selectedUser;
                    }
                  "
                  :singleUser="true"
                  :placeholder="$t('wallet.transactionContainsUserId')"
                />
              </div>

              <!-- start date -->
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
                      v-model="lazyParams.fromDateTime"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>

              <!-- end date  -->
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
                      v-model="lazyParams.toDateTime"
                      :class="{
                        'p-invalid':
                          lazyParams.fromDateTime &&
                          lazyParams.toDateTime &&
                          lazyParams.fromDateTime > lazyParams.toDateTime,
                      }"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      lazyParams.fromDateTime &&
                      lazyParams.toDateTime &&
                      lazyParams.fromDateTime > lazyParams.toDateTime
                        ? $t(
                            "validationMessages.end_date_must_greater_than_start_date"
                          )
                        : $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
            </div>

            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearFilter"
                icon="pi pi-times"
              />
              <Button
                :label="$t('buttons.filter')"
                @click="loadLazyData"
                :loading="requestStatusStore.loading"
                icon="pi pi-filter"
              />
            </div>
          </div>
        </Transition>
      </div>

      <DataTable
        @page="onPage($event)"
        :totalRecords="paginatedTransaction?.count"
        lazy
        :value="paginatedTransaction?.items ?? []"
        paginator
        :rows="9"
        :currentPageReportTemplate="
          $t('table.paginator', {
            first: '{first}',
            last: '{last}',
            totalRecords: '{totalRecords}',
          })
        "
        :loading="requestStatusStore.loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
      >
        <template #header>
          <div class="table-header">
            {{ $t("table.header", { field: $t("routes.transactionList") }) }}
          </div>
        </template>

        <Column field="date" :header="$t('wallet.transactionDate')" :key="1">
          <template #body="slotProps">
            <i>{{
              moment(toLocaleDateFormat(slotProps.data.createdAt)).format(
                "DD/MM/YYYY"
              )
            }}</i>

            <div class="mt-2">
              {{
                moment(toLocaleDateFormat(slotProps.data.createdAt)).format(
                  "HH:mm:ss"
                )
              }}
            </div>
          </template>
        </Column>
        <Column field="sourceWallet" :header="$t('wallet.sourceUser')" :key="1">
          <template #body="slotProps">
            <div
              class="flex"
              :style="`background-color: ${
                lazyParams.transactionContainsUser?.uid ==
                slotProps.data.sourceWalletUserId
                  ? '#fbbd2320'
                  : ''
              }; border-radius: 4px`"
            >
              <div>
                <img
                  :src="getImage(slotProps.data.sourceWalletUserPhotoUrl)"
                  class="w-4rem h-4rem border-circle"
                  style="object-fit: cover"
                />
              </div>
              <div class="mx-2">
                <div>{{ slotProps.data.sourceWalletUserDisplayName }}</div>
                <div class="my-1">
                  {{ slotProps.data.sourceWalletUserPhoneNumber }}
                </div>
                <div class="flex align-items-center">
                  <div>
                    {{
                      slotProps.data.sourceWalletBalanceAfterChange +
                      slotProps.data.amount
                    }}
                  </div>
                  <ion-icon
                    name="arrow-forward-outline"
                    class="mx-2"
                  ></ion-icon>
                  <div>
                    {{ slotProps.data.sourceWalletBalanceAfterChange }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column field="amount" :header="$t('wallet.amount')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data.amount }}</i>
          </template>
        </Column>
        <Column
          field="sourceWallet"
          :header="$t('wallet.destinationUser')"
          :key="1"
        >
          <template #body="slotProps">
            <div
              class="flex h-full w-full px-2 py-1"
              :style="`background-color: ${
                lazyParams.transactionContainsUser?.uid ==
                slotProps.data.destinationWalletUserId
                  ? '#fbbd2320'
                  : ''
              }; border-radius: 4px`"
            >
              <div>
                <img
                  :src="getImage(slotProps.data.destinationWalletUserPhotoUrl)"
                  class="w-4rem h-4rem border-circle"
                  style="object-fit: cover"
                />
              </div>
              <div class="mx-2">
                <div>
                  {{ slotProps.data.destinationWalletUserDisplayName }}
                </div>
                <div class="my-1">
                  {{ slotProps.data.destinationWalletUserPhoneNumber }}
                </div>
                <div>
                  <div class="flex align-items-center">
                    <div>
                      {{
                        slotProps.data.destinationWalletBalanceAfterChange -
                        slotProps.data.amount
                      }}
                    </div>
                    <ion-icon
                      name="arrow-forward-outline"
                      class="mx-2"
                    ></ion-icon>
                    <div>
                      {{ slotProps.data.destinationWalletBalanceAfterChange }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column :header="$t('wallet.walletTransactionType')" :key="1">
          <template #body="slotProps">
            {{ slotProps.data.walletTransactionType }}
          </template>
        </Column>
        <template #footer>
          {{
            $t(`table.tableFooter`, {
              total: paginatedTransaction?.count ?? 0,
              field: $t("wallet.transactions"),
            })
          }}
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  WalletTransactionType,
  type GetTransactionsAdminResultPagination,
} from "@/backend/wallet/";
import { TransactionService } from "@/backend/wallet/services/TransactionService";
import { ref, type Ref, onMounted } from "vue";
import moment from "moment";
import { getImage } from "@/composables/getImage";
import { walletRequestStatus } from "@/stores/common/requestStatus";
import {
  createMapTransactionFilterDto,
  type TransactionFilterDto,
} from "./mapper";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import { useRoute } from "vue-router";
import { RegionStore } from "@/stores/common/region";
import type { RegionDto } from "@/backend/auth";
import Calendar from "primevue/calendar";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";

const requestStatusStore = walletRequestStatus();

const walletTransactionTypes = Object.keys(WalletTransactionType).map(
  (key) => WalletTransactionType[key]
);
const paginatedTransaction: Ref<
  GetTransactionsAdminResultPagination | undefined
> = ref();

// return regions data from store
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});

const lazyParams = ref<TransactionFilterDto>({
  transactionType: undefined,
  sourceWalletUser: undefined,
  destinationWalletUser: undefined,
  minTransactionPrice: undefined,
  maxTransactionPrice: undefined,
  fromDateTime: new Date(startOfToday),
  toDateTime: new Date(endOfToday),
  senderWalletUserRegion: undefined,
  receiverWalletUserRegion: undefined,
  page: undefined,
  sortField: undefined,
  sortDescending: undefined,
  transactionContainsUser: undefined,
});

const route = useRoute();

onMounted(() => {
  lazyParams.value = Object.assign(lazyParams.value, route.query);
  lazyParams.value.fromDateTime = new Date(
    lazyParams.value.fromDateTime ?? new Date(startOfToday)
  );
  lazyParams.value.toDateTime = new Date(
    lazyParams.value.toDateTime ?? new Date(endOfToday)
  );
  loadLazyData();
});

const loadLazyData = () => {
  TransactionService.getTransactionsAdmin(
    createMapTransactionFilterDto(lazyParams.value)
  ).then((response: GetTransactionsAdminResultPagination) => {
    paginatedTransaction.value = response;
  });
};

const onPage = (event) => {
  lazyParams.value.page = event.page;
  loadLazyData();
};

const clearFilter = () => {
  lazyParams.value = {
    transactionType: undefined,
    sourceWalletUser: undefined,
    destinationWalletUser: undefined,
    minTransactionPrice: undefined,
    maxTransactionPrice: undefined,
    fromDateTime: new Date(startOfToday),
    toDateTime: new Date(endOfToday),
    senderWalletUserRegion: undefined,
    receiverWalletUserRegion: undefined,
    page: undefined,
    sortField: undefined,
    sortDescending: undefined,
    transactionContainsUser: undefined,
  };

  loadLazyData();
};
</script>
