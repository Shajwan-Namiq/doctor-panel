<template>
  <div class="page-style">
    <div class="page-container">
      <Toast />

      <DataTable
        @page="onPage($event)"
        :totalRecords="wallets?.count"
        lazy
        :value="wallets?.items ?? []"
        paginator
        :rows="10"
        :loading="requestStatusStore.loading"
      >
        <Column
          field="displayName"
          :header="$t('wallet.destinationUser')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data.byUserName }} </i>
          </template>
        </Column>
        <Column field="balance" :header="$t('wallet.sourceUser')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data.walletUserName }} </i>
          </template>
        </Column>

        <Column field="phoneNumber" :header="$t('wallet.amount')" :key="1">
          <template #body="slotProps">
            <i>{{ slotProps.data?.amount }}</i>
          </template>
        </Column>
        <Column
          field="phoneNumber"
          :header="$t('transportation.common.description')"
          :key="1"
        >
          <template #body="slotProps">
            <i>{{ slotProps.data?.description }}</i>
          </template>
        </Column>
        <Column :header="$t('buttons.send_balance')" :key="1">
          <template #body="slotProps">
            <div class="pb-2">
              <Button
                @click="openDialog(slotProps.data)"
                icon="pi pi-user-plus"
                v-tooltip.bottom="$t('wallet.sendToAdmin')"
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
</template>

<script setup lang="ts">
import {
  type WalletDto,
  type WalletDtoPagination,
  type ListWalletResultPagination,
  AdminTransactionService,
} from "@/backend/wallet";
import { useDialog } from "primevue/usedialog";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Toast from "primevue/toast";
import { walletRequestStatus } from "@/stores/common/requestStatus";
import { RoleStore } from "@/stores/common/role";
import type { RoleDto } from "@/backend/wallet";
import SendBalanceComponent from "../wallet/sendBalanceToAdmin.vue";
const requestStatusStore = walletRequestStatus();
const roleStore = RoleStore();
const roles = ref<RoleDto[]>();

roleStore.getAllRole().then((response: RoleDto[]) => {
  roles.value = response;
});
const { t } = useI18n();
const dialog = useDialog();

const loading = ref(false);

const wallets = ref<ListWalletResultPagination>();

const lazyParams = ref({});

onMounted(() => {
  loading.value = true;
  lazyParams.value = {
    page: 0,
    limit: 9,
  };
  getAdminTransactions();
});

function getAdminTransactions() {
  loading.value = true;
  AdminTransactionService.listAdminTransactions({}).then(
    (response: WalletDtoPagination) => {
      wallets.value = response;
    }
  );
}

const onPage = (event) => {
  lazyParams.value = {
    page: event.page,
    limit: event.rows,
  };
  getAdminTransactions();
};

function openDialog(wallet: WalletDto) {
  dialog.open(SendBalanceComponent, {
    data: {
      wallet: wallet,
    },
    emits: {
      onChange: () => {
        getAdminTransactions();
      },
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
  });
}
</script>
