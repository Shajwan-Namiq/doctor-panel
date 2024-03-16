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
                      name="document-lock-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <MultiSelect
                    display="chip"
                    :placeholder="$t('roles.role')"
                    :options="roles"
                    v-model="filterData.roles"
                  >
                    <template #value="valueProp">
                      {{
                        filterData.roles && filterData.roles.length > 0
                          ? filterData.roles.length < 4
                            ? filterData.roles
                                .map((x: any) => x.name)
                                .join(" , ")
                            : `${filterData.roles.length} ${$t(
                                "dropdowns.selected_field",
                                { field: $t("fields.role") }
                              )}`
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.name }}
                      </p>
                    </template>
                  </MultiSelect>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="card-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    :options="walletTypeOptions"
                    display="chip"
                    :placeholder="$t('wallet.walletType')"
                    v-model="filterData.walletType"
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
                    <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.maxBalance"
                    />
                    <label for="inputgroup">{{
                      $t("wallet.maxBalance")
                    }}</label>
                  </span>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.minBalance"
                    />
                    <label for="inputgroup">{{
                      $t("wallet.minBalance")
                    }}</label>
                  </span>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUsers="
                    (selectedUsers) => {
                      filterData.users = selectedUsers;
                    }
                  "
                />
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
                @click="getWalletList"
                :loading="requestStatusStore.loading"
                icon="pi pi-filter"
              />
            </div>
          </div>
        </Transition>
      </div>

      <Toast />
      <div class=" ">
        <DataTable
          @page="onPage($event)"
          :totalRecords="wallets?.count"
          lazy
          :value="wallets?.items ?? []"
          paginator
          :rows="10"
          :loading="requestStatusStore.loading"
        >
          <Column field="id" :key="1">
            <template #body="slotProps">
              <div>
                <img
                  :src="getImage(slotProps.data?.userPhotoUrl)"
                  class="w-3rem h-3rem border-circle mx-3"
                  style="object-fit: cover"
                />
              </div>
            </template>
          </Column>

          <Column field="balance" :header="$t('wallet.balance')" :key="1">
            <template #body="slotProps">
              <i
                >{{ slotProps.data.balance }}
                {{ slotProps.data.currency }}
              </i>
            </template>
          </Column>
          <Column
            field="displayName"
            :header="$t('transportation.users.name')"
            :key="1"
          >
            <template #body="slotProps">
              <i>{{ slotProps.data.userDisplayName }}</i>
            </template>
          </Column>

          <Column
            field="phoneNumber"
            :header="$t('transportation.users.mobile')"
            :key="1"
          >
            <template #body="slotProps">
              <i>{{ slotProps.data?.userPhoneNumber }}</i>
            </template>
          </Column>
          <Column :header="$t('buttons.send_balance')" :key="1">
            <template #body="slotProps">
              <div class="pb-2">
                <Button
                  icon="pi pi-send"
                  @click="openDialog(slotProps.data)"
                  v-tooltip.bottom="
                    $t('wallet.tooltip', {
                      userName: slotProps.data?.userDisplayName,
                    })
                  "
                  severity="secondary"
                />
                <Button
                  icon="pi pi-pencil"
                  @click="openDialogForUpdate(slotProps.data)"
                  v-tooltip.bottom="$t('wallet.updateWallet')"
                  severity="secondary"
                />
                <!-- v-can="[BasePolicy.WRITE_WALLET]" -->
                <Button
                  v-if="slotProps.data.walletType == WalletType.ADMIN"
                  icon="pi pi-user-plus"
                  v-tooltip.bottom="$t('wallet.sendToAdmin')"
                  @click="addBalanceToAdmin(slotProps.data)"
                  severity="secondary"
                />
              </div>
            </template>
          </Column>

          <template #footer>
            {{
              $t(`table.tableFooter`, {
                total: wallets?.items ? wallets?.items.length : 0,
                field: $t("wallet.transactions"),
              })
            }}
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  WalletService,
  type WalletDto,
  type WalletDtoPagination,
  WalletType,
  type ListWalletResultPagination,
} from "@/backend/wallet";
import { useDialog } from "primevue/usedialog";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import MakeTransaction from "../makeTransaction.vue";
import UpdateWallet from "../updateWallet.vue";
import AddBalanceToAdminComponent from "./sendBalanceToAdmin.vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { getImage } from "@/composables/getImage";
import { walletRequestStatus } from "@/stores/common/requestStatus";
import {
  createMapWalletFilterDtoToWalletFilter,
  type WalletFilterDataDto,
} from "./mapper";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { RoleStore } from "@/stores/common/role";
import { type RoleDto } from "@/backend/auth";

const requestStatusStore = walletRequestStatus();
const roleStore = RoleStore();
const roles = ref<RoleDto[]>();

roleStore.getAllRole().then((response: RoleDto[]) => {
  roles.value = response;
});
const walletTypeOptions = Object.keys(WalletType).map((key) => WalletType[key]);
const { t } = useI18n();
const dialog = useDialog();

const toast = useToast();

const loading = ref(false);

const wallets = ref<ListWalletResultPagination>();

const filterData = ref<WalletFilterDataDto>({
  maxBalance: undefined,
  minBalance: undefined,
  roles: undefined,
  sortDescending: true,
  sortField: "id",
  walletType: undefined,
  users: undefined,
});

onMounted(() => {
  loading.value = true;

  getWalletList();
});

function getWalletList() {
  loading.value = true;
  WalletService.listWallets(
    createMapWalletFilterDtoToWalletFilter(filterData.value)
  ).then((response: WalletDtoPagination) => {
    wallets.value = response;
  });
}

const onPage = (event) => {
  filterData.value = {
    page: event.page,
  };
  getWalletList();
};

function openDialog(wallet: WalletDto) {
  dialog.open(MakeTransaction, {
    data: {
      wallet: wallet,
    },
    props: {
      header: t("buttons.send_balance"),
      breakpoints: {
        "2000px": "50vw",
        "1500px": "65vw",
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
    onClose: (option) => {
      if (option?.data === 200) {
        showSuccess();
      } else if (option?.data === 400) {
        showError();
      }
    },
  });
}

const clearFilter = () => {
  filterData.value = {
    maxBalance: undefined,
    minBalance: undefined,
    roles: undefined,
    sortDescending: true,
    sortField: "id",
    walletType: undefined,
    users: undefined,
  };
  getWalletList();
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "successfully updated",
    life: 4000,
  });
  getWalletList();
};

const showError = () => {
  toast.add({ severity: "error", summary: "Money not transfared", life: 3000 });
};

function openDialogForUpdate(wallet: WalletDto) {
  loading.value = true;
  dialog.open(UpdateWallet, {
    data: {
      wallet: wallet,
    },
    emits: {
      onWalletUpdated: () => {
        getWalletList();
      },
    },
    props: {
      header: t("buttons.update"),
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
function addBalanceToAdmin(wallet: WalletDto) {
  loading.value = true;
  dialog.open(AddBalanceToAdminComponent, {
    data: {
      wallet: wallet,
    },
    props: {
      header: t("buttons.update"),
      breakpoints: {
        "2000px": "50vw",
        "1500px": "65vw",
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
    onClose: () => {
      getWalletList();
      showSuccess();
    },
  });
}
</script>
