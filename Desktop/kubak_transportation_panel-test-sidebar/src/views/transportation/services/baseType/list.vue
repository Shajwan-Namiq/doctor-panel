<template>
  <div class="p-4 xl:py-4 xl:px-8 justify-content-center grid">
    <div class="col-12 md:col-8 h-full pageWrapper p-6">
      <DataTable
        :value="serviceType"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
        :rowReorder="true"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="table-header">
              {{
                $t("table.header", {
                  field: $t("transportation.services.serviceType"),
                })
              }}
            </div>
            <Button
              icon="pi pi-plus"
              class="p-button-primary addButton"
              @click="addBaseType"
            />
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column
          field="name"
          :header="$t('transportation.services.serviceType')"
        >
          <template #body="slotProps">
            <p>
              {{ slotProps.data.title }}
            </p>
          </template>
        </Column>
        <Column :exportable="false" style="width: 10rem">
          <template #body="typeProps">
            <Button
              icon="pi pi-pencil"
              v-tooltip.bottom="
                $t('tooltips.edit', {
                  field: $t('transportation.services.serviceType'),
                })
              "
              @click="editBaseType(typeProps.data)"
            />
            <Button
              class="p-button-danger"
              icon="pi pi-trash"
              v-tooltip.bottom="
                $t('tooltips.delete', {
                  field: $t('transportation.services.serviceType'),
                })
              "
              @click="confirmDelete(typeProps.data.id)"
            />
          </template>
        </Column>

        <template #expansion="roleProps">
          <div class="orders-subtable">
            <DataTable
              :value="roleProps.data.translations"
              responsiveLayout="scroll"
            >
              <Column :header="$t('fields.title')">
                <template #body="typeProps">
                  <p>
                    {{ typeProps.data.text }}
                  </p>
                </template>
              </Column>

              <Column :header="$t('auth.language.languageTitle')">
                <template #body="typeProps">
                  <p>
                    {{ typeProps.data.language }}
                  </p>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
      <ConfirmDialog></ConfirmDialog>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { requestStatus } from "@/stores/common/requestStatus";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { useDialog } from "primevue/usedialog";
import { ref, watch } from "vue";
import AddNewBaseType from "./addNewBaseType.vue";
import { ServiceStore } from "@/stores/common/service";
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue/useconfirm";
// import { ServiceBaseTypeService } from "@/backend/transport";
import EditBaseType from "./editBaseType.vue";

const serviceStore = ServiceStore();
const requestStatusStore = requestStatus();
const { t } = useI18n();
const serviceType = ref();
const expandedRows = ref<any>([]);
const dialog = useDialog();

let dialogRef;
watch(
  () => serviceStore.serviceBaseType,
  () => {
    if (dialogRef) dialogRef.close();
    getAllTypes;
  }
);
getAllTypes();
async function getAllTypes() {
  await serviceStore.getAllServiceType();
  serviceType.value = serviceStore.serviceBaseType;
}
function editBaseType(service) {
  serviceStore.addCurrentBaseType(service);
  dialogRef = dialog.open(EditBaseType, {
    props: {
      header: t("reusables.dialog.edit", {
        field: t("transportation.services.serviceType"),
      }),
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
const confirm = useConfirm();

function confirmDelete(id: number) {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t(`transportation.services.serviceType`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deleteServiceType(id);
    },
  });
}
async function deleteServiceType(id: number) {
  await ServiceBaseTypeService.deleteBaseType({ id });
  await serviceStore.getAllServices();
  getAllTypes();
}
function addBaseType() {
  dialogRef = dialog.open(AddNewBaseType, {
    props: {
      header: t("reusables.dialog.add", {
        field: t("transportation.services.serviceType"),
      }),

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
