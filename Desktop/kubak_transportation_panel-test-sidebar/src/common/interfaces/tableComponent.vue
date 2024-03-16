<template>
  <div class="dynamicTableComponent">
    <div
      class="flex justify-content-end py-1 text-lg align-items-center"
      v-if="response && response.count"
    >
      <p class="mx-2">{{ $t("transportation.common.total") }}:</p>
      <h3>{{ response?.count }}</h3>
    </div>
    <DataTable
      :loading="requestStatusStore.loading || !response"
      :value="response?.items ?? response"
      responsiveLayout="scroll"
      :paginator="response?.items ? true : false"
      :rows="response?.limit ?? 10"
      :totalRecords="response?.count"
      :lazy="true"
      :currentPageReportTemplate="
        $t('table.paginator', {
          first: '{first}',
          last: '{last}',
          totalRecords: '{totalRecords}',
        })
      "
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
      @page="$emit('page', $event)"
      @sort="$emit('sort', $event)"
      style="min-height: 300px"
    >
      <template #footer v-if="$slots.footer">
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <slot name="footer" />
        </div>
      </template>
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
            <div :class="[item.status, getTheValue(item, slotProps) + '']">
              {{
                item.value
                  ? $t(item.value + "." + slotProps.data[item.field] + "")
                  : $t(
                      `statuses.${item.status}.${getTheValue(item, slotProps)}`
                    )
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
              v-if="editMode.showInput && slotProps.data.id == editMode.id"
            >
              <InputText
                type="text"
                class="inPlaceInputText"
                v-model="slotProps.data[item.field]"
              />
            </div>
            <div
              class="tableCell"
              :class="item.class ?? ''"
              v-if="editMode.id != slotProps.data.id"
              @click="
                item.clickable
                  ? $emit('clickedFirstCell', slotProps.data, $event)
                  : ''
              "
              @click.middle="
                $emit('middleClickedFirstCell', slotProps.data, $event)
              "
              :style="item.clickable ? 'cursor:pointer' : ''"
            >
              <div>
                {{
                  item.format
                    ? formatDate(item, slotProps)
                    : getTheValue(item, slotProps)
                }}
              </div>
            </div>
          </div>
        </template>
      </Column>
      <Column v-if="$slots.customColumn">
        <template #body="slotProp">
          <slot name="customColumn" :data="slotProp.data" />
        </template>
        <template #header>
          <slot name="customColumnHeader" />
        </template>
      </Column>
      <Column
        :exportable="false"
        style="width: 10rem; text-align: end"
        v-if="tableActions"
      >
        <template #body="slotProps">
          <div v-if="editMode.id != slotProps.data.id" class="px-8 flex">
            <Button
              icon="pi pi-info"
              class="p-button-success"
              v-if="tableActions.info"
              @click="$emit('clickedFirstCell', slotProps.data, $event)"
              @click.middle="
                $emit('middleClickedFirstCell', slotProps.data, $event)
              "
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-success"
              v-if="tableActions.edit"
              @click="toggleColumnToEditMode(slotProps.data.id)"
            />
            <!-- v-can="[policies?.editPolicy]" -->
            <Button
              icon="pi pi-trash"
              class="p-button-danger"
              v-if="tableActions.delete"
              @click="$emit('deleteRow', slotProps.data)"
            />
            <!-- v-can="[policies?.deletePolicy]" -->
          </div>
          <div v-if="editMode.id == slotProps.data.id">
            <Button
              icon="pi pi-check"
              class="p-button-success"
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
          v-if="!requestStatusStore.loading && response"
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
    <!-- <ConfirmDialog></ConfirmDialog> -->
  </div>
</template>
<script setup lang="ts">
import { requestStatus } from "@/stores/common/requestStatus";
import moment from "moment";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Rating from "primevue/rating";
import { reactive, ref, watch } from "vue";

const requestStatusStore = requestStatus();
const props = defineProps(["tableInformation", "response"]);
const response = ref(props.response);

watch(
  () => props.response,
  () => {
    response.value = props.response;
  }
);
const tableActions = props.tableInformation.actions;
const tableHeaders = ref(props.tableInformation.headers);
const policies = props.tableInformation.policies;
watch(
  () => props.tableInformation,
  () => {
    tableHeaders.value = props.tableInformation.headers;
  }
);
const editMode = reactive({
  showInput: false,
  id: 0,
});
const emits = defineEmits(["update"]);
function formatDate(item, slotProps) {
  if (item.format.includes("hh")) {
    return moment
      .utc(
        item.field
          .replace(/\[|\]\.?/g, ".")
          .split(".")
          .filter((s) => s)
          .reduce((acc, val) => acc && acc[val], slotProps.data)
      )
      .local()
      .format(item.format);
  }
  return moment(
    item.field
      .replace(/\[|\]\.?/g, ".")
      .split(".")
      .filter((s) => s)
      .reduce((acc, val) => acc && acc[val], slotProps.data)
  ).format(item.format);
}
function getTheValue(item, slotProps) {
  let value = item.field
    .replace(/\[|\]\.?/g, ".")
    .split(".")
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], slotProps.data);
  if (Array.isArray(value)) {
    value = value.join(", ");
  }
  return value;
}
function toggleColumnToEditMode(id: number) {
  editMode.showInput = true;
  editMode.id = id;
}
function cancelEdit() {
  editMode.showInput = false;
  editMode.id = 0;
}
function edit(data) {
  emits("update", data);
  editMode.showInput = false;
  editMode.id = 0;
}
</script>

<style lang="scss">
.dynamicTableComponent {
  .tableCell {
    text-align: center !important;
  }
  .p-column-title {
    width: 100% !important;
    text-align: center !important;
  }
  .p-datatable .p-datatable-thead > tr > th {
    padding: 1rem 0 !important;
  }
}
</style>
