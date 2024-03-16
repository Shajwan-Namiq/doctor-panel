<!-- <template>
  <div class="p-4 lg:py-6 lg:px-8">
    <Toast />
    <DataTable
      @page="onPage($event)"
      :totalRecords="paginatedCardProvider?.count"
      lazy
      :value="paginatedCardProvider?.items ?? []"
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
          {{ $t("table.header", { field: $t("routes.cardProviderList") }) }}
        </div>
        <div class="flex justify-content-end pb-2">
          <Button
            icon="pi pi-plus"
            @click="openDialog()"
            v-tooltip.bottom="$t('tooltips.add', { field: $t('transaction') })"
          />
        </div>
      </template>

      <Column field="logoUrl" :header="$t('wallet.logo')" :key="1">
        <template #body="slotProps: SlotProps<CardProviderDto>">
          <img :src="slotProps.data?.logoUrl!" class="w-5rem h-5rem" />
        </template>
      </Column>
      <Column field="name" :header="$t('wallet.name')" :key="1">
        <template #body="slotProps: SlotProps<CardProviderDto>">
          <i class="p-datatable-reorderablerow-handle">{{
            slotProps.data.name
          }}</i>
        </template>
      </Column>
      <Column field="edit" :header="$t('wallet.edit')" :key="1">
        <template #body="slotProps: SlotProps<CardProviderDto>">
          <Button icon="pi pi-pencil" @click="openDialog(slotProps.data)" />
          <Button icon="pi pi-search" @click="openCardProvider(slotProps.data)">
          </Button>
        </template>
      </Column>
      <template #footer>
        {{
          $t(`table.tableFooter`, {
            total: paginatedCardProvider?.items
              ? paginatedCardProvider?.items.length
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
import { ref, type Ref, onMounted } from "vue";
import { useDialog } from "primevue/usedialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import AddProvider from "../addProvider.vue";
import {
  CardProviderService,
  type CardProviderDto,
  type CardProviderDtoPaginatedResponse,
} from "@/backend/wallet";
import router from "@/router";
const { t } = useI18n();

const loading = ref(false);

let paginatedCardProvider: Ref<CardProviderDtoPaginatedResponse | undefined> =
  ref();

const toast = useToast();
const lazyParams = ref({});
const dialog = useDialog();

let dialogRef;

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

  CardProviderService.getCardProviders(lazyParams.value).then((response) => {
    paginatedCardProvider.value = response;
    loading.value = false;
  });
};

const onPage = (event) => {
  lazyParams.value = {
    page: event.page,
    limit: event.rows,
  };
  loadLazyData();
};

function openDialog(cardProviderDto: CardProviderDto | undefined = undefined) {
  dialogRef = dialog.open(AddProvider, {
    header: t("addProvider"),
    data: { cardProviderDto: cardProviderDto },
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
        loadLazyData();
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

const openCardProvider = (cardProvider: CardProviderDto) => {
  // navigate to cardType
  router.push({
    name: "cardTypes",
    params: { cardProviderId: cardProvider.id },
  });
};
</script> -->
<template>
  <div></div>
</template>
