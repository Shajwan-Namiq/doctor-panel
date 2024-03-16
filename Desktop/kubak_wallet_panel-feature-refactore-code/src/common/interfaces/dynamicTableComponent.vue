<template>
  <div class="px-4 lg:px-6 dynamicTableComponent">
    <div
      class="flex justify-content-between"
      v-if="!props.tableInformation.hideAddDialog"
    >
      <div>
        <h5 class="text-xl">{{ tableInformation.sectionHeader }}</h5>
      </div>
      <Button
        icon="pi pi-plus"
        class="p-button-primary mb-4 addButton"
        @click="openDialog()"
        v-tooltip.bottom="
          $t('tooltips.add', {
            field: $t(`tooltips.fields.${storeInfo.detail.endPoint}`),
          })
        "
      />
    </div>

    <DataTable
      :loading="requestStatusStore.loading"
      :value="responseData"
      responsiveLayout="scroll"
      :paginator="responseData ? storeInfo.detail.isPagination : false"
      :rows="8"
      :totalRecords="totalRecords"
      :lazy="true"
      :currentPageReportTemplate="
        $t('table.paginator', {
          first: '{first}',
          last: '{last}',
          totalRecords: '{totalRecords}',
        })
      "
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
      @page="pagePaginator"
      @sort="sortData"
    >
      <Column
        v-for="(item, index) in tableHeaders"
        :key="index"
        :field="item.header"
        :header="$t(`${item.header}`)"
        :sortable="item.sortable"
        :sortField="item.field"
      >
        <template #body="slotProps">
          <div class="tableCell" v-if="item.Icon">
            <img class="h-2rem w-2rem" :src="slotProps.data[item.field]" />
          </div>
          <div v-else-if="item.status">
            <div :class="[item.status, slotProps.data[item.field] + '']">
              {{
                item.value
                  ? $t(item.value + "." + slotProps.data[item.field] + "")
                  : slotProps.data[item.field]
              }}
            </div>
          </div>
          <div v-else-if="item.rating">
            <div>
              <Rating
                v-model="slotProps.data[item.field]"
                :readonly="true"
                :cancel="false"
              />
            </div>
          </div>

          <div v-else>
            <div
              class="tableCell"
              v-if="editMode.showInput && slotProps.data.Id == editMode.Id"
            >
              <InputText
                type="text"
                class="inPlaceInputText"
                v-model="slotProps.data[item.field]"
              />
            </div>
            <div
              class="tableCell"
              v-if="editMode.Id != slotProps.data.Id"
              @click="
                item.clickable ? $emit('clickedFirstCell', slotProps.data) : ''
              "
              :style="item.clickable ? 'cursor:pointer' : ''"
            >
              <p>
                {{
                  item.format
                    ? formatDate(item, slotProps)
                    : item.field
                        .replace(/\[|\]\.?/g, ".")
                        .split(".")
                        .filter((s) => s)
                        .reduce((acc, val) => acc && acc[val], slotProps.data)
                }}
              </p>
            </div>
          </div>
        </template>
      </Column>

      <Column
        :exportable="false"
        style="width: 10rem; text-align: end"
        v-if="tableActions"
      >
        <template #body="slotProps">
          <div v-if="editMode.Id != slotProps.data.Id">
            <Button
              icon="pi pi-info"
              class="p-button-success"
              v-tooltip.bottom="
                $t('tooltips.info', {
                  field: $t(`tooltips.fields.${storeInfo.detail.endPoint}`),
                })
              "
              v-if="tableActions.info"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-success"
              v-tooltip.bottom="
                $t('tooltips.edit', {
                  field: $t(`tooltips.fields.${storeInfo.detail.endPoint}`),
                })
              "
              v-if="tableActions.edit"
              @click="toggleColumnToEditMode(slotProps.data.Id)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-danger"
              v-tooltip.bottom="
                $t('tooltips.delete', {
                  field: $t(`tooltips.fields.${storeInfo.detail.endPoint}`),
                })
              "
              v-if="tableActions.delete"
              @click="confirmDelete(slotProps.data.Id)"
            />
          </div>
          <div v-if="editMode.Id == slotProps.data.Id">
            <Button
              icon="pi pi-check"
              class="p-button-success"
              v-tooltip.bottom="
                $t('tooltips.edit', {
                  field: $t(`tooltips.fields.${storeInfo.detail.endPoint}`),
                })
              "
              @click="edit(slotProps.data)"
            />
            <Button
              icon="pi pi-times"
              class="p-button-warn"
              v-tooltip.bottom="$t('tooltips.cancel')"
              @click="cancelEdit()"
            />
          </div>
        </template>
      </Column>
      <template #empty>
        <div
          class="w-full flex justify-content-center flex-column align-items-center py-6"
        >
          <img
            src="@/static/images/empty.png"
            style="height: 80px; width: 150px"
          />

          <h3 class="mt-3">{{ $t("reusables.emptyRecordHeader") }}</h3>
          <p>{{ $t("reusables.emptyRecordDesc") }}</p>
        </div>
      </template>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useDialog } from "primevue/usedialog";
import addDataComponent from "@/common/interfaces/dialogAddData/createData.vue";
import moment from "moment";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import Rating from "primevue/rating";
import { useConfirm } from "primevue/useconfirm";

const { t } = useI18n();
const dialog = useDialog();
let dialogRef;
const editMode = reactive({
  showInput: false,
  Id: 0,
});
const props = defineProps(["tableInformation", "storeInfo"]);

const storeInfo = props.storeInfo;
const responseData = ref();
const requestStatusStore = requestStatus();
const tableHeaders = props.tableInformation.headers;
const tableActions = props.tableInformation.actions;
const totalRecords = ref<number>(0);
getAllData();
watch(
  () => storeInfo.responseData,
  () => {
    getAllData();
  }
);
watch(
  () => storeInfo.dialogStatus,
  () => {
    if (!storeInfo.dialogStatus) {
      if (dialogRef) dialogRef.close();
    }
  }
);

function getAllData() {
  if (props.storeInfo.detail.isPagination) {
    responseData.value = props.storeInfo.responseData.Items;
    totalRecords.value = props.storeInfo.responseData.Count;
  } else {
    responseData.value = props.storeInfo.responseData;
  }
}
function toggleColumnToEditMode(Id: number) {
  editMode.showInput = true;
  editMode.Id = Id;
}
function cancelEdit() {
  editMode.showInput = false;
  editMode.Id = 0;
}
const confirm = useConfirm();

function confirmDelete(Id: number) {
  confirm.require({
    message: t(`table.DeleteConfirmationMessage`, {
      field: t(`reusables.dialog.fields.${storeInfo.detail.endPoint}`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deleteRow(Id);
    },
  });
}
function deleteRow(Id: number) {
  storeInfo.deleteData(Id);
}
function edit(data) {
  storeInfo.editRow(data, data.Id);
  editMode.showInput = false;
  editMode.Id = 0;
}
function pagePaginator(event) {
  storeInfo.filterParameter({
    Page: event.originalEvent.page,
  });
}
function sortData(event) {
  const field = event.sortField.split(".");

  storeInfo.filterParameter({
    SortField: field[field.length - 1],
    SortDescending: event.sortOrder == 1,
    Page: 0,
  });
}
function openDialog() {
  storeInfo.changeDialogStatus(true);
  dialogRef = dialog.open(addDataComponent, {
    props: {
      header: t("reusables.dialog.add", {
        field: t(`reusables.dialog.fields.${storeInfo.detail.endPoint}`),
      }),

      breakpoints: {
        "2000px": "75vw",
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}
function formatDate(item, slotProps) {
  return moment(
    item.field
      .replace(/\[|\]\.?/g, ".")
      .split(".")
      .filter((s) => s)
      .reduce((acc, val) => acc && acc[val], slotProps.data)
  ).format(item.format);
}
</script>
<style lang="scss">
.dynamicTableComponent {
  .p-datatable .p-datatable-tbody > tr > td {
    padding: 0 0 !important;
    .tableCell {
      min-width: 10px;
      padding: 0.3rem !important;
    }
  }
  .tableCell {
    text-align: center !important;
  }
  .p-column-title {
    width: 100% !important;
    text-align: center !important;
  }
}
</style>
