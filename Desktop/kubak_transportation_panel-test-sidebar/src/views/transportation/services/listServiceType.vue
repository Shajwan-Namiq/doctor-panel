<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <div class="flex justify-content-end">
        <Button
          icon="pi pi-plus"
          class="p-button-primary mb-3 addButton"
          @click="openDialog"
          v-can="[PolicyType.WRITE_SERVICE]"
        />
      </div>
      <DataTable
        :value="serviceTypes"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
        :rowReorder="true"
      >
        <template #header>
          <div class="table-header">
            {{ $t("transportation.serviceType.name") }}
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="Name" :header="$t('transportation.serviceType.title')">
          <template #body="slotProps">
            <p>
              <InputText
                type="text"
                class=""
                v-model="slotProps.data.title"
                v-if="editMode.showInput && slotProps.data.id == editMode.id"
              />
            </p>
            <p v-if="editMode.id != slotProps.data.id">
              {{ slotProps.data?.translations[0]?.title }}
            </p>
          </template>
        </Column>
        <Column
          field="Name"
          :header="$t('transportation.serviceType.description')"
        >
          <template #body="slotProps">
            <p v-if="editMode.id != slotProps.data.id">
              {{ slotProps.data?.translations[0]?.description }}
            </p>
          </template>
        </Column>
        <Column
          field="Icon"
          :header="$t('transportation.serviceType.icon')"
          style="text-align: start"
        >
          <template #body="slotProps">
            <img
              v-default-image
              class="h-2rem w-2rem objec"
              v-if="editMode.id != slotProps.data.id"
              :src="getImage(slotProps.data?.iconUrl)"
            />
          </template>
        </Column>
        <Column :exportable="false" style="width: 10rem">
          <template #body="slotProps">
            <div v-if="editMode.id != slotProps.data.id">
              <Button
                icon="pi pi-plus"
                class="p-button-success mr-2"
                v-tooltip.bottom="
                  $t('tooltips.add', {
                    field: $t('transportation.services.title'),
                  })
                "
                @click="openDialogForCreate"
                v-can="[PolicyType.WRITE_SERVICE]"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-warn mr-2"
                v-tooltip.bottom="
                  $t('tooltips.edit', {
                    field: $t('transportation.services.title'),
                  })
                "
                @click="editServiceType(slotProps.data)"
                v-can="[PolicyType.WRITE_SERVICE]"
              />
            </div>
            <div v-if="editMode.id == slotProps.data.id">
              <Button
                icon="pi pi-check"
                class="p-button-success mr-2"
                v-tooltip.bottom="'Edit service'"
                @click="saveEdit(slotProps.data)"
              />
              <Button
                icon="pi pi-times"
                class="p-button-warn"
                @click="cancelEdit()"
                v-tooltip.bottom="'Delete service'"
              />
            </div>
          </template>
        </Column>
        <template #expansion="serviceProps">
          <div class="orders-subtable">
            <DataTable
              :value="serviceProps.data.services"
              responsiveLayout="scroll"
            >
              <Column field="Name" :header="$t('transportation.services.name')">
                <template #body="serviceProp">
                  <p>
                    {{ serviceProp.data?.region.name }}
                  </p>
                </template>
              </Column>
              <Column
                field="Name"
                :header="$t('transportation.services.icon')"
                style="text-align: start"
              >
                <template #body="serviceProp">
                  <div
                    class="serviceStatus"
                    :class="serviceProp.data?.isActive ? 'active' : 'inactive'"
                  >
                    {{ $t(`fields.active.${serviceProp.data?.isActive}`) }}
                  </div>
                </template>
              </Column>
              <Column :exportable="false" style="width: 10rem">
                <template #body="serviceProp">
                  <Button
                    icon="pi pi-info"
                    class="p-button-success mr-2"
                    v-tooltip.bottom="'more detail'"
                    @click="moreDetail(serviceProp.data)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #footer>
          {{
            $t(`table.tableFooter`, {
              total: serviceTypes ? serviceTypes.length : 0,
              field: $t("transportation.serviceType.name"),
            })
          }}
        </template>
        <ConfirmDialog></ConfirmDialog>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useDialog } from "primevue/usedialog";
///store
import { requestStatus } from "@/stores/common/requestStatus";
import Button from "primevue/button";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import createServiceType from "./createServiceType.vue";
import createService from "./createService.vue";
import EditServiceTypeComponent from "./editServiceType.vue";
import { useI18n } from "vue-i18n";
import { ServiceStore } from "@/stores/common/service";
import { getImage } from "@/composables/getImage";
import { toastStore } from "@/stores/common/toastStore";
import { PolicyType } from "@/backend/transport";

const toast = toastStore();
const serviceStore = ServiceStore();
const serviceTypes = ref();
// serviceStore.getAllServiceType().then((res) => {
//   serviceTypes.value = res;
// });
const router = useRouter();
const { t } = useI18n();
onMounted(() => {
  serviceStore.getAllServiceType().then((res) => {
    serviceTypes.value = res;
  });
});
const requestStatusStore = requestStatus();
const expandedRows = ref<any>([]);
const editMode = reactive({
  showInput: false,
  id: 0,
});

const dialog = useDialog();
let dialogRef: any = "";
let dialogRefForCreate: any = "";

function moreDetail(service) {
  router.push({
    name: "detailService",
    params: { id: service.id },
  });
}
watch(
  () => requestStatusStore.loading,
  () => {
    if (!requestStatusStore.loading) {
      closeDialog();
    }
  }
);
watch(
  () => serviceStore.serviceTypes,
  (val) => {
    serviceTypes.value = val;
  }
);
function openDialog() {
  dialogRef = dialog.open(createServiceType, {
    props: {
      header: t("reusables.dialog.add", {
        field: t("transportation.serviceType.name"),
      }),
      breakpoints: {
        "5000px": "25vw",
        "2000px": "30vw",
        "960px": "65vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

function editServiceType(data) {
  dialogRef = dialog.open(EditServiceTypeComponent, {
    data: {
      serviceType: data,
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t("transportation.serviceType.name"),
      }),
      breakpoints: {
        "5000px": "25vw",
        "2000px": "30vw",
        "960px": "65vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
function cancelEdit() {
  expandedRows.value = [];
  editMode.showInput = false;
  editMode.id = 0;
}
function closeDialog() {
  if (dialogRef.visible) {
    /* empty */
  }
}
async function saveEdit(data) {
  serviceStore.updateService(data);
  cancelEdit();
}

// function openDialogForCreate() {
//   dialogRefForCreate = dialog.open(createService, {
//     props: {
//       header: t("reusables.dialog.add", {
//         field: t("transportation.serviceType.name"),
//       }),
//       breakpoints: {
//         "5000px": "25vw",
//         "2000px": "30vw",
//         "960px": "65vw",
//         "640px": "90vw",
//       },
//       modal: true,
//     },
//   });
// }

function openDialogForCreate() {
  dialogRefForCreate = dialog.open(createService, {
    header: t("addProvider"),

    props: {
      header: t("reusables.dialog.add", {
        field: t("transportation.serviceType.name"),
      }),
      breakpoints: {
        "5000px": "25vw",
        "2000px": "30vw",
        "960px": "65vw",
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
    summary: "successfully updated",
    life: 4000,
  });
  // get();
};

const showError = () => {
  toast.add({ severity: "error", summary: "Money not transfared", life: 3000 });
};
</script>
