<template>
  <div class="page-style">
    <div class="page-container">
      <div class="flex justify-content-end">
        <Button
          icon="pi pi-plus"
          :label="$t('buttons.add')"
          @click="openDialog()"
          v-can="[PolicyType.WRITE_CANCEL_REASON]"
        />
      </div>
      <div class="py-4">
        <DataTable
          class="rolesTable"
          :value="cancelReason"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          responsiveLayout="scroll"
          :lazy="true"
          :loading="requestStatusStore.loading"
          :rowReorder="true"
        >
          <template #header>
            <div class="table-header">
              {{
                $t("table.header", {
                  field: $t("transportation.cancelReason.title"),
                })
              }}
            </div>
          </template>
          <Column
            :expander="true"
            headerStyle="width: 3rem"
            v-can="[PolicyType.WRITE_CANCEL_REASON]"
          />

          <Column :header="$t('auth.area.title')">
            <template #body="slotProps">
              <p>
                {{ slotProps.data?.translations[0]?.text }}
              </p>
            </template>
          </Column>
          <Column :header="$t('roles.role')">
            <template #body="slotProps">
              <p>
                {{ slotProps.data?.role?.name ?? "" }}
              </p>
            </template>
          </Column>
          <Column :exportable="false" style="width: 10rem; text-align: end">
            <template #body="slotProps">
              <Button
                @click="confirmDelete(slotProps.data.id)"
                icon="pi pi-trash"
                class="p-button-danger"
                v-tooltip.bottom="
                  $t('tooltips.delete', {
                    field: $t('transportation.cancelReason.title'),
                  })
                "
                v-can="[PolicyType.DELETE_CANCEL_REASON]"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-info"
                v-tooltip.bottom="
                  $t('tooltips.edit', {
                    field: $t('transportation.cancelReason.title'),
                  })
                "
                @click="updateCancelReason(slotProps.data)"
                v-can="[PolicyType.WRITE_CANCEL_REASON]"
              />
            </template>
          </Column>
          <template #expansion="cancelProps">
            <div
              class="orders-subtable"
              v-can="[PolicyType.WRITE_CANCEL_REASON]"
            >
              <h5>
                {{
                  $t("table.header", { field: $t("auth.language.languages") })
                }}
              </h5>
              <DataTable
                :value="cancelProps.data.translations"
                responsiveLayout="scroll"
              >
                <Column :header="$t('auth.language.languageTitle')">
                  <template #body="PolicyProps">
                    <p>
                      {{ PolicyProps.data.language }}
                    </p>
                  </template>
                </Column>
                <Column :header="$t('transportation.cancelReason.title')">
                  <template #body="PolicyProps">
                    <p>
                      {{ PolicyProps.data.text }}
                    </p>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
          <template #footer>
            {{
              $t("table.tableFooter", {
                total: cancelReason ? cancelReason.length : 0,
                field: $t("transportation.cancelReason.title"),
              })
            }}
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from "primevue/usedialog";
import { watch, ref, onMounted } from "vue";
import { CancelReasonStore } from "./cancelReasonStore";
import { useI18n } from "vue-i18n";
import CreateReason from "./createReason.vue";
import { requestStatus } from "@/stores/common/requestStatus";
import updateCancelReasonComponent from "./updateCancelReason.vue";
import { useConfirm } from "primevue/useconfirm";
import { CancelReasonService, PolicyType } from "@/backend/transport";

const cancelReasonStore = CancelReasonStore();
const dialog = useDialog();
const { t } = useI18n();
const requestStatusStore = requestStatus();
const confirm = useConfirm();

let dialogRef;
const expandedRows = ref<any>([]);
const cancelReason = ref(cancelReasonStore.cancelReason);

onMounted(() => {
  cancelReasonStore.getCancelReasonsIfEmpty();
});
watch(
  () => cancelReasonStore.cancelReason,
  () => {
    cancelReason.value = cancelReasonStore.cancelReason;
    if (dialogRef) {
      dialogRef.close();
    }
  }
);
function confirmDelete(id: number) {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t(`transportation.cancelReason.title`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deleteCancelReason(id);
    },
  });
}
async function deleteCancelReason(id: number) {
  await CancelReasonService.delete({ id: id });
  cancelReasonStore.getAllCancelReason();
}
function openDialog() {
  dialogRef = dialog.open(CreateReason, {
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.cancelReason.title`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "1500px": "50vw",
        "960px": "90vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
function updateCancelReason(data) {
  dialogRef = dialog.open(updateCancelReasonComponent, {
    data: data,
    props: {
      header: t("reusables.dialog.edit", {
        field: t(`transportation.cancelReason.title`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "1500px": "50vw",
        "960px": "90vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
</script>
