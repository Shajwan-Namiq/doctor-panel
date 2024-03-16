<template>
  <h2 class="text-center py-2">
    {{ $t("transportation.services.area.areaListHeader") }}
  </h2>
  <div class="areaListContainer">
    <DataTable
      :value="props?.serviceAreasPrice"
      :reorderableColumns="true"
      @rowReorder="(e) => onRowReorder(e)"
    >
      <Column rowReorder />
      <Column>
        <template #body="areaPrice">
          <div class="flex flex-column align-items-center my-1">
            <div
              v-for="(areaRequestType, index) in areaPrice.data
                .destinationTypes"
              :key="index"
              class="flex"
            >
              <div class="mx-2">
                {{ areaRequestType.destinationType }}
              </div>
              <div>
                {{ areaRequestType.priceRatePerDistance }}
              </div>
            </div>
          </div>
        </template>
      </Column>
      <Column>
        <template #body="areaPrice">
          <div class="flex flex-justify-content">
            <Button
              icon="pi pi-map-marker"
              class="h-2rem w-2rem mx-1"
              @click="$emit('areaLocation', areaPrice.data)"
              :style="`background-color: ${areaPrice.data.color}; border: none;`"
            />
            <Button
              icon="pi pi-pencil"
              class="h-2rem w-2rem mx-1"
              @click="$emit('editServiceAreaPrice', areaPrice.data)"
              :style="`background-color: ${areaPrice.data.color}; border: none;`"
              :disabled="!ifUserHasPolicy(PolicyType.WRITE_SERVICE_AREA_PRICE)"
            />
            <Button
              icon="pi pi-trash"
              class="h-2rem w-2rem mx-1"
              @click="confirmDelete(areaPrice.data)"
              :style="`background-color: ${areaPrice.data.color}; border: none;`"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script lang="ts" setup>
import { PolicyType } from "@/backend/transport";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from "vue-i18n";

const props = defineProps(["serviceAreasPrice"]);
const emits = defineEmits(["areaReorder", "deleteAreaPrice"]);
const confirm = useConfirm();
const { t } = useI18n();

function onRowReorder(e: any) {
  emits(
    "areaReorder",
    e.dropIndex + 1,
    props.serviceAreasPrice[e.dragIndex].id
  );
}
function confirmDelete(areaPrice) {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t("transportation.services.area.title"),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      emits("deleteAreaPrice", areaPrice);
    },
  });
}
</script>
<style lang="scss">
.areaListContainer {
  thead {
    display: none;
  }
  max-height: calc(100vh - 350px);
  overflow-y: auto;
}
</style>
