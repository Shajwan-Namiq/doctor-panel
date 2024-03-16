<!-- <template>
  <div class="p-4 lg:py-6 lg:px-8">
    <DataTable :value="paginatedCardType?.items ?? []" paginator :rows="10">
      <template #header>
        <div class="table-header">
          {{ $t("table.header", { field: $t("routes.transactionList") }) }}
        </div>
        <div class="flex justify-content-end pb-2">
          <Button
            icon="pi pi-plus"
            @click="openDialog()"
            v-tooltip.bottom="$t('tooltips.add', { field: $t('transaction') })"
          />
        </div>
      </template>

      <Column field="id" :header="$t('id')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.id
          }}</i>
        </template>
      </Column>
      <Column field="imageUrl" :header="$t('wallet.image')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <i class="p-datatable-reorderablerow-handle">
            <img :src="slotProps.data?.imageUrl!" class="w-5rem h-5rem" />
          </i>
        </template>
      </Column>
      <Column field="displayName" :header="$t('wallet.username')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.name
          }}</i>
        </template>
      </Column>
      <Column field="price" :header="$t('wallet.price')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.price
          }}</i>
        </template>
      </Column>
      <Column field="cardProvider" :header="$t('wallet.cardProvider')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.cardProvider?.name
          }}</i>
        </template>
      </Column>
      <Column field="edit" :header="$t('wallet.edit')" :key="1">
        <template #body="slotProps: SlotProps<CardTypeDto>">
          <Button icon="pi pi-pencil" @click="openDialog(slotProps.data)">
          </Button>
        </template>
      </Column>
      <template #footer>
        {{
          $t(`table.tableFooter`, {
            total: paginatedCardType?.items
              ? paginatedCardType?.items.length
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
import {
  WalletService,
  type WalletDto,
  type WalletDtoPaginatedResponse,
  type CardTypeDtoPaginatedResponse,
  CardTypeService,
  type CardTypeDto,
} from "@/backend/wallet";
import type { SlotProps } from "@/common/interfaces/slotProps";
import { useDialog } from "primevue/usedialog";
import { provide, reactive, ref, watch, type Ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import AddCardType from "../addCardType.vue";
import { debounce } from "../../../utils/debounce";
import { useRoute } from "vue-router";
import { cardType } from "@/global/enums/city/card";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const { t } = useI18n();
const dialog = useDialog();

let dialogRef;

const toast = useToast();
const value1 = ref(null);
const filters = ref();
let cardProviderId: string | string[];

let paginatedCardType: Ref<CardTypeDtoPaginatedResponse | undefined> = ref();

onMounted(() => {
  cardProviderId = route.params.cardProviderId;
  fetchData(cardProviderId);
});

const fetchData = (cardProviderId) => {
  CardTypeService.getCardTypes({
    page: 0,
    limit: 10,
    cardProviderId: parseInt(cardProviderId),
  }).then((response: CardTypeDtoPaginatedResponse) => {
    paginatedCardType.value = response;
  });
};

const initFilters = () => {
  filters.value = {};
};

const clearFilter = () => {
  initFilters();
};

const onInputChange = (value: any) => {
  const phoneNumber = value.target.value;
  WalletService.getAdminWallets({
    page: 0,
    limit: 9,
    phoneNumber: phoneNumber,
    roleId: 2,
  }).then((response: WalletDtoPaginatedResponse) => {
    paginatedCardType.value = response;
  });
};

const debouncedOnInputChange = debounce(onInputChange, 500);

function openDialog(cardTypeDto: CardTypeDto | undefined = undefined) {
  dialogRef = dialog.open(AddCardType, {
    header: t("addCardType"),
    data: { cardTypeDto: cardTypeDto },
    // props: {
    //   breakpoints: {
    //     "2000px": "50vw",
    //     "1500px": "65vw",
    //     "960px": "75vw",
    //     "640px": "90vw",
    //   },
    //   modal: true,
    // },
    onClose: (option) => {
      if (option?.data === 200) {
        fetchData(cardProviderId);
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
};

const showError = () => {
  toast.add({ severity: "error", summary: "Money not transfared", life: 3000 });
};

// provide("dialogRef", dialogRef);
</script> -->
<template>
  <div></div>
</template>
