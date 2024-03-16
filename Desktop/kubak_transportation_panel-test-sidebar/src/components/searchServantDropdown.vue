<template>
  <div class="">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <ion-icon name="car-outline" class="text-lg"></ion-icon>
      </span>
      <span class="w-full">
        <Dropdown
          optionLabel="name"
          placeholder="Select Cities"
          :maxSelectedLabels="3"
          closeIcon=""
          class="w-full"
          :selectAll="false"
          panelClass="customFilterMultiSelect"
          :loading="requestStatusStore.loading"
          :options="servants"
          v-model="selectedServant"
          v-if="props.singleUser"
        >
          <template #header>
            <div class="p-2 w-full">
              <div class="w-full flex justify-content-around">
                <div class="w-full">
                  <span class="p-input-icon-left w-full">
                    <i class="pi pi-search" />
                    <InputText
                      style="width: 98%"
                      :placeholder="
                        $t('reusables.searchBy', {
                          field: $t(
                            `fields.searchFields.${servantFilterData.searchField}`
                          ),
                        })
                      "
                      v-model="servantFilterData.searchValue"
                      @input="debouncedOnInputChange"
                    />
                  </span>
                </div>
                <div>
                  <Button
                    icon="pi pi-filter"
                    severity="secondary"
                    class="mb-1"
                    @click="
                      () => {
                        showServantFilterFieldOptions =
                          !showServantFilterFieldOptions;
                      }
                    "
                  />

                  <div
                    class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                    v-if="showServantFilterFieldOptions"
                  >
                    <div
                      v-for="(field, index) in servantSearchFields"
                      :key="index"
                      class="listbox-item my-1"
                      @click="changeFilterField(field)"
                      :class="
                        field == servantFilterData.searchField ? 'active' : ''
                      "
                    >
                      {{ $t(`fields.searchFields.${field}`) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #option="data">
            <div class="flex align-items-center">
              <img
                :src="getImage(data.option.avatarUrl)"
                class="h-2rem w-2rem border-circle mx-2"
              />
              {{ data.option.firstName }}
            </div>
          </template>
          <template #value>
            {{
              selectedServant ? selectedServant.firstName : $t("fields.servant")
            }}
          </template>
        </Dropdown>
        <MultiSelect
          optionLabel="name"
          :maxSelectedLabels="3"
          closeIcon=""
          class="w-full"
          :selectAll="false"
          panelClass="customFilterMultiSelect"
          :loading="requestStatusStore.loading"
          :options="servants"
          v-model="selectedServants"
          v-else
          :placeholder="$t('fields.servant')"
        >
          <template #header>
            <div class="p-2 w-full">
              <div class="w-full flex justify-content-around">
                <div class="w-full">
                  <span class="p-input-icon-left w-full">
                    <i class="pi pi-search" />
                    <InputText
                      style="width: 98%"
                      :placeholder="
                        $t('reusables.searchBy', {
                          field: $t(
                            `fields.searchFields.${servantFilterData.searchField}`
                          ),
                        })
                      "
                      v-model="servantFilterData.searchValue"
                      @input="debouncedOnInputChange"
                    />
                  </span>
                </div>
                <div>
                  <Button
                    icon="pi pi-filter"
                    severity="secondary"
                    class="mb-1"
                    @click="
                      () => {
                        showServantFilterFieldOptions =
                          !showServantFilterFieldOptions;
                      }
                    "
                  />

                  <div
                    class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                    v-if="showServantFilterFieldOptions"
                  >
                    <div
                      v-for="(field, index) in servantSearchFields"
                      :key="index"
                      class="listbox-item my-1"
                      @click="changeFilterField(field)"
                      :class="
                        field == servantFilterData.searchField ? 'active' : ''
                      "
                    >
                      {{ $t(`fields.searchFields.${field}`) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #option="data">
            <img
              :src="getImage(data.option.avatarUrl)"
              class="h-2rem w-2rem border-circle mx-2"
            />
            {{ data.option.fullName }}
          </template>
          <template #value>
            {{
              selectedServants && selectedServants.length > 0
                ? selectedServants.length < 4
                  ? selectedServants.map((x: any) => x.fullName).join(" , ")
                  : `${selectedServants.length}  ${$t(
                      "dropdowns.selected_field",
                      {
                        field: $t("fields.servant"),
                      }
                    )}`
                : $t("fields.servant")
            }}
          </template>
        </MultiSelect>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { requestStatus } from "@/stores/common/requestStatus";
import { debounce } from "@/utils/debounce";
import { onMounted, ref, watch } from "vue";
import { getImage } from "@/composables/getImage";
import {
  ServantService,
  type ServantDto,
  ServantSearchFieldEnum,
} from "@/backend/transport";

const emit = defineEmits(["selectedServants", "selectedServant"]);

const props = defineProps(["servants", "singleUser", "clearSelectedUsers"]);

const requestStatusStore = requestStatus();

const servantSearchFields = Object.keys(ServantSearchFieldEnum).map(
  (key) => ServantSearchFieldEnum[key]
);
const showServantFilterFieldOptions = ref(false);

const selectedServants = ref<any>([]);
const selectedServant = ref();
const servantFilterData = ref({
  searchField: ServantSearchFieldEnum.NAME_FIELD,
  searchValue: "",
});
const servants = ref<ServantDto[]>([]);
selectedServants.value = props.servants ?? [];

watch(
  () => props.servants,
  () => {
    if (!props.servants) return;
    selectedServants.value = props.servants ?? [];
  }
);
onMounted(() => {
  getAllServants();
});
async function getAllServants() {
  ServantService.listServants(servantFilterData.value).then((Response) => {
    servants.value = Response.items ?? [];
  });
}
const debouncedOnInputChange = debounce(getAllServants, 500);
function changeFilterField(field) {
  servantFilterData.value.searchField = field;
  setTimeout(() => {
    showServantFilterFieldOptions.value = false;
  }, 100);
}
watch(
  () => selectedServants.value,
  () => {
    emit("selectedServants", selectedServants.value);
  }
);
watch(
  () => selectedServant.value,
  () => {
    emit("selectedServant", selectedServant.value);
  }
);

// reset array after clearing filter
watch(
  () => props.clearSelectedUsers,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      selectedServants.value = []; // Reset selected servants
    }
  }
);
</script>
<style lang="scss">
.customFilterMultiSelect {
  .p-multiselect-header {
    display: none !important;
  }
}
.listBox {
  position: absolute;
  width: 100px !important;
  margin: 0 10px;
  z-index: 2000000000000;
  background-color: var(--background-color-kubak);
  border-radius: 4px;
  .listbox-item {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0;
    &:hover {
      background-color: var(--default-color-hover-kubak);
    }
    &.active {
      background-color: var(--default-color-hover-kubak);
    }
  }
}
</style>
