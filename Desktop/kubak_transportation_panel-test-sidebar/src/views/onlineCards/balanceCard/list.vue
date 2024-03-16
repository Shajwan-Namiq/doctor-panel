<!-- <template>
  <div class="p-4 lg:py-6 lg:px-8">
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
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
    >
      <template #header>
        <div class="table-header">
          {{ $t("table.header", { field: $t("routes.balanceCardList") }) }}
        </div>
        <div class="flex justify-content-end pb-2">
          <Button
            icon="pi pi-plus"
            @click="openDialog()"
            v-tooltip.bottom="$t('tooltips.add', { field: $t('transaction') })"
          />
        </div>
      </template>

      <Column field="amount" :header="$t('wallet.amount')" :key="1">
        <template #body="slotProps: SlotProps<BalanceCardDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.pin
          }}</i>
        </template>
      </Column>
      <Column
        field="serialNumber"
        :header="$t('wallet.transactionDate')"
        :key="1"
      >
        <template #body="slotProps: SlotProps<BalanceCardDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.serialNumber
          }}</i>
        </template>
      </Column>
      <Column field="balance" :header="$t('wallet.transactionDate')" :key="1">
        <template #body="slotProps: SlotProps<BalanceCardDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.price
          }}</i>
        </template>
      </Column>

      <template #footer>
        {{
          $t(`table.tableFooter`, {
            total: paginatedTransaction?.items
              ? paginatedTransaction?.items.length
              : 0,
            field: $t("wallet.transactions"),
          })
        }}
      </template>
      <ConfirmDialog></ConfirmDialog>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { SlotProps } from "@/common/interfaces/slotProps";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { ref, type Ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
  BalanceCardService,
  type BalanceCardDto,
  type BalanceCardDtoPaginatedResponse,
} from "@/backend/wallet";
import AddBalanceCard from "../addBalanceCard.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();

let dialogRef;

const loading = ref(false);

let paginatedTransaction: Ref<BalanceCardDtoPaginatedResponse | undefined> =
  ref();

const lazyParams = ref({});

onMounted(() => {
  loading.value = true;
  lazyParams.value = {
    page: 0,
    limit: 9,
  };
  loadLazyData();
});

const loadLazyData = () => {
  loading.value = true;
  BalanceCardService.getAllCard(lazyParams.value).then(
    (response: BalanceCardDtoPaginatedResponse) => {
      paginatedTransaction.value = response;
      loading.value = false;
    }
  );
};

const onPage = (event) => {
  lazyParams.value = {
    page: event.page,
    limit: event.rows,
  };
  loadLazyData();
};

function openDialog() {
  dialogRef = dialog.open(AddBalanceCard, {
    props: {
      header: t("wallet.addBalance"),
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

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Successfully transfared",
    life: 4000,
  });
  loadLazyData();
};

const showError = () => {
  toast.add({ severity: "error", summary: "Money not transfared", life: 3000 });
};
</script> -->
<template>
  <div></div>
</template>
