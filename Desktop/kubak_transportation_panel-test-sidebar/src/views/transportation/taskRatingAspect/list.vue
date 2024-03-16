<template>
  <div class="page-style">
    <div class="page-container">
      <!--title and create new instance  -->
      <div class="flex justify-content-end">
        <!-- <div>
          <h5 class="text-xl">
            {{
              t("table.header", {
                field: t("transportation.tasks.fields.taskRatingAspectTitle"),
              })
            }}
          </h5>
        </div> -->

        <Button
          icon="pi pi-plus"
          class="p-button-primary mb-4 addButton"
          @click="createData"
          v-can="[PolicyType.WRITE_TASK_RATING_ASPECT]"
        />
      </div>

      <!-- filter -->
      <div class="flex justify-center align-item-center">
        <!-- filter data by rater role -->
        <div class="col-12 md:col-6 lg:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="document-lock-outline"></ion-icon>
            </span>
            <Dropdown
              :placeholder="$t('roles.raterRole')"
              :options="roles"
              v-model="filterData.raterRole"
            >
              <template #value="slotProps">
                {{ filterData.raterRole?.name ?? slotProps.placeholder }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option.name }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>

        <!-- filter data by rated role -->
        <div class="col-12 md:col-6 lg:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="document-lock-outline"></ion-icon>
            </span>
            <Dropdown
              :placeholder="$t('roles.ratedRole')"
              :options="roles"
              v-model="filterData.ratedRole"
            >
              <template #value="slotProps">
                {{ filterData.ratedRole?.name ?? slotProps.placeholder }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option.name }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
      <!-- button filter  -->
      <div class="mt-2 mb-3 flex justify-content-end">
        <Button
          icon="pi pi-times"
          :label="$t('buttons.clear')"
          class="mx-2 p-button-secondary"
          @click="clearData"
        />
        <Button
          icon="pi pi-filter"
          :label="$t('buttons.filter')"
          @click="search"
          :loading="requestStatusStore.loading"
        />
      </div>
      <!-- show table data  -->
      <TableComponent
        :tableInformation="tableInformation"
        :response="taskData"
        @clickedFirstCell="detail"
        @deleteRow="confirmDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoleType, TaskRatingAspectService } from "@/backend/transport";
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { toastStore } from "@/stores/common/toastStore";
import { useDialog } from "primevue/usedialog";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import createTaskRatingAspect from "./create.vue";
import editTaskRatingAspect from "./editTaskRatingAspect.vue";
import { confirmed } from "@vee-validate/rules";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { PolicyType } from "@/backend/transport";
import { RoleStore } from "@/stores/common/role";

const confirm = useConfirm();
const dialog = useDialog();
const { t } = useI18n();
const requestStatusStore = requestStatus();
const toast = toastStore();

// header table
const tableInformation = {
  hideAddDialog: true,
  headers: [
    {
      field: "translations[0].name",
      header: "transportation.tasks.fields.taskRatingAspectName",
    },
    {
      field: "translations[0].description",
      header: "transportation.tasks.fields.taskRatingAspectDescription",
    },
    {
      field: "weight",
      header: "transportation.tasks.fields.taskRatingAspectWeight",
    },
  ],
  policies: {
    editPolicy: "WriteTaskRatingAspect",
    deletePolicy: "DeleteTaskRatingAspect",
  },
  actions: { delete: true, info: true },
};

// get all exist roles
const roles = Object.keys(RoleType).map((key) => ({ name: RoleType[key] }));

const taskData = ref({});

interface FilterData {
  raterRole?: RoleType | undefined;
  ratedRole?: RoleType | undefined;
}

const filterData = ref<FilterData>({
  raterRole: undefined,
  ratedRole: undefined,
});

//return all data from the database
onMounted(() => {
  getAllTaskRatingAspects();
});

async function getAllTaskRatingAspects() {
  // just return the role name not the entire object
  const { raterRole, ratedRole } = filterData.value;
  const raterRoleName = raterRole ? raterRole.name : undefined;
  const ratedRoleName = ratedRole ? ratedRole.name : undefined;

  const filter = {
    raterRole: raterRoleName,
    ratedRole: ratedRoleName,
  };

  await TaskRatingAspectService.getTaskRatingAspects(filter as any).then(
    (Response) => {
      taskData.value = Response;
    }
  );
}

//open dialog for create new instance
function createData() {
  dialog.open(createTaskRatingAspect, {
    emits: {
      onCreate: () => {
        getAllTaskRatingAspects();
      },
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.tasks.fields.taskRatingAspectTitle`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "960px": "50vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

// clear filter
function clearData() {
  filterData.value = {};
  getAllTaskRatingAspects();
}

function search() {
  getAllTaskRatingAspects();
}

//Update function
function detail(data) {
  dialog.open(editTaskRatingAspect, {
    data: data,
    emits: {
      onEdit: () => {
        getAllTaskRatingAspects();
      },
    },
    props: {
      header: t("reusables.dialog.add", {
        field: t(`transportation.tasks.fields.taskRatingAspectTitle`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "960px": "50vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

//Delete function
const confirmDelete = (task) => {
  confirm.require({
    message: t(`table.deleteConfirmationMessage`, {
      field: t(`reusables.dialog.fields.role`),
    }),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      deleteData(task);
    },
  });
};

async function deleteData(task) {
  await TaskRatingAspectService.deleteTaskRatingAspect({ id: task.id! });
  getAllTaskRatingAspects();
}
</script>
