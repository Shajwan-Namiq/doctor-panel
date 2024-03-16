<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <DataTable
        class="rolesTable"
        :value="baseRoles"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :lazy="true"
        :loading="requestStatusStore.loading"
        :rowReorder="true"
      >
        <template #header>
          <div class="table-header">{{ $t("baseRoles.baseRoleHeader") }}</div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="Name" :header="$t('baseRoles.name')">
          <template #body="slotProps">
            <p>
              <InputText
                type="text"
                v-model="slotProps.data.name"
                v-if="editMode.showInput && slotProps.data.id == editMode.id"
              />
            </p>
            <p v-if="editMode.id != slotProps.data.id">
              {{ slotProps.data.name }}
            </p>
          </template>
        </Column>
        <Column :exportable="false" style="width: 10rem">
          <template #body="slotProps">
            <div v-if="editMode.id != slotProps.data.id">
              <Button
                icon="pi pi-pencil"
                class="p-button-warn mr-2"
                v-tooltip.bottom="$t('baseRoles.tooltips.editBaseRole')"
                @click="editRoleDialog(slotProps.data)"
                v-can="[PolicyType.WRITE_BASE_ROLE]"
              />
            </div>
            <div v-if="editMode.id == slotProps.data.id">
              <Button
                icon="pi pi-check"
                class="p-button-success mr-2"
                v-tooltip.bottom="$t('baseRoles.tooltips.editBaseRole')"
                @click="editRole(slotProps.data)"
                v-can="[PolicyType.WRITE_BASE_ROLE]"
              />
              <Button
                icon="pi pi-times"
                class="p-button-warn"
                @click="cancelEdit()"
                v-tooltip.bottom="$t('baseRoles.tooltips.cancel')"
              />
            </div>
          </template>
        </Column>
        <template #expansion="roleProps">
          <div class="orders-subtable">
            <h5>
              {{
                $t("baseRoles.subTableHeader", { role: roleProps.data.name })
              }}
            </h5>
            <DataTable
              :value="roleProps.data.policies"
              responsiveLayout="scroll"
            >
              <Column field="Name" :header="$t('baseRoles.policyName')">
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.name }}
                  </p>
                </template>
              </Column>
              <Column :exportable="false" style="width: 10rem">
                <template #body="PolicyProps" v-if="editMode.showInput">
                  <Button
                    icon="pi pi-trash"
                    class="p-button-danger"
                    v-tooltip.bottom="$t('roles.tooltips.deleteRole')"
                    @click="
                      confirmDeletePolicy(roleProps.data, PolicyProps.data)
                    "
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
        <template #footer>
          {{
            $t("baseRoles.tableFooter", {
              total: baseRoles ? baseRoles.length : 0,
            })
          }}
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { useDialog } from "primevue/usedialog";
import addPolicyDialog from "./addPolicyDialog.vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useI18n } from "vue-i18n";
import { PolicyType } from "@/backend/transport";
import { RolesService } from "@/backend/transport";
import { BaseRoleStore } from "@/stores/common/baseRole";
import { useConfirm } from "primevue/useconfirm";

const { t } = useI18n();
const requestStatusStore = requestStatus();
const expandedRows = ref([]);
const editMode = reactive({
  showInput: false,
  id: 0,
});

const confirm = useConfirm();
const dialog = useDialog();

const baseRoleStore = BaseRoleStore();
const baseRoles = ref();
baseRoleStore.getAllBaseRole().then((res) => {
  baseRoles.value = res.baseRoles;
});

function editRoleDialog(data) {
  dialog.open(addPolicyDialog, {
    data: data,
    props: {
      header: t("baseRoles.updateBaseRoleHeader"),

      breakpoints: {
        "5000px": "40vw",
        "2000px": "50vw",
        "1500px": "70vw",
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
async function editRole(data) {
  const policyIds: number[] = [];
  for (const item in data.Policies) {
    expandedRows.value = [];
    policyIds.push(data.Policies[item].id);
  }
  await RolesService.putRole({
    id: data.id,
    requestBody: { name: data.name, policyIds },
  });

  editMode.id = 0;
}

function deletePolicy(baseRoledata, policyData) {
  const index = baseRoles.value.findIndex((x) => x.id == baseRoledata.id);
  const policyIndex = baseRoles.value[index]?.policies?.findIndex(
    (x) => x.id == policyData.id
  );

  baseRoles.value[index].policies?.splice(policyIndex ?? 0, 1);
  editRole(baseRoles.value[index]);
}
const confirmDeletePolicy = (baseRoleData, policyData) => {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t(`reusables.dialog.fields.policy`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deletePolicy(baseRoleData, policyData);
    },
  });
};
</script>

<style lang="scss">
.addIcon {
  font-size: 24px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.orders-subtable {
  padding: 1rem;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Role-image {
  width: 50px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-datatable-tbody tr td {
  img {
    width: 120px;
    height: 50px;
  }
}
.rolesTable {
  .p-button.p-button-icon-only {
    height: 30px !important;
    width: 30px !important;
    .p-button-icon {
      font-size: 13px;
    }
  }
}
.status-true {
  background-color: #c8e6c995;
  color: #256029;
}
.status-false {
  background-color: #ffd8b299;
  color: #c63737;
}
.RoleStatus {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
</style>
