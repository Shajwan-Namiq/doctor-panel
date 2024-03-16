<template>
  <div class="flex flex-column justify-content-between">
    <div class="flex justify-content-between">
      <div>
        <Avatar
          style="height: 150px; width: 150px"
          class="mt-3 mx-4"
          shape="circle"
          :image="
            userDetail.photoUrl
              ? getImage(userDetail.photoUrl)
              : 'https://willowbank.ca/wp/wp-content/uploads/bb-plugin/cache/Missing-profile-image-square.jpg'
          "
          v-if="!editMode"
          :style="
            userDetail.disabled
              ? 'border: 3px solid var( --passive-kubak-color)'
              : 'border: 3px solid var(--active-kubak-color)'
          "
        />
        <div
          style="height: 150px; width: 150px"
          class="mx-4 mt-3"
          v-if="editMode"
        >
          <SelectImage :circle="true" @selectImageFile="onImageSelect" />
        </div>
      </div>

      <div v-if="!editMode" class="m-4">
        <Button
          v-if="userDetail.disabled"
          icon="pi pi-times"
          class="p-button-danger"
          v-tooltip.bottom="
            $t('transportation.users.changeUserStatus.disableTooltip')
          "
          @click="confirmUpdate"
          :label="$t('buttons.disabled')"
        />

        <Button
          v-if="!userDetail.disabled"
          icon="pi pi-times"
          severity="success"
          v-tooltip.bottom="
            $t('transportation.users.changeUserStatus.disableTooltip')
          "
          @click="confirmUpdate"
          :label="$t('buttons.enable')"
        />

        <Button
          icon="pi pi-sign-out"
          class="p-button-info mx-2"
          @click="logoutUser"
          :label="$t('transportation.users.logout')"
          :loading="requestStatusStore.loading"
        />

        <Button
          icon="pi pi-pencil"
          class="p-button-warn"
          @click="toggleEditMode(true)"
          v-tooltip.bottom="
            $t('tooltips.edit', { field: $t('tooltips.fields.user') })
          "
          v-can="[PolicyType.WRITE_USER]"
        />
      </div>
      <div v-if="editMode" class="m-4">
        <Button
          icon="pi pi-check"
          class="p-button-success mx-2"
          v-tooltip.bottom="
            $t('tooltips.edit', { field: $t('tooltips.fields.user') })
          "
          @click="updateUser"
        />
        <Button
          icon="pi pi-times"
          class="p-button-warn"
          @click="toggleEditMode(false)"
          v-tooltip.bottom="$t('tooltips.cancel')"
        />
      </div>
    </div>
    <div class="grid p-4">
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="text-outline" class="text-2xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              type="text"
              v-model="userDetail.displayName"
              :disabled="!editMode"
            />
            <label for="inputgroup">{{
              $t("transportation.users.name")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="call-outline" class="text-2xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              type="text"
              v-model="userDetail.phoneNumber"
              :disabled="!editMode"
            />
            <label for="inputgroup">{{
              $t("transportation.users.mobile")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="mail-outline" class="text-2xl"></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText
              autofocus
              id="inputgroup"
              type="text"
              v-model="userDetail.email"
              :disabled="!editMode"
            />
            <label for="inputgroup">{{
              $t("transportation.users.email")
            }}</label>
          </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="reorder-three-outline" class="text-2xl"></ion-icon>
          </span>
          <Dropdown
            v-model="userDetail.gender"
            optionLabel="name"
            :placeholder="$t('dropdowns.gender.placeholder')"
            :disabled="!editMode"
            :options="genders"
          >
            <template #value="slotProps">
              {{
                $t(`dropdowns.gender.${slotProps.value}`) ??
                slotProps.placeholder
              }}
            </template>
            <template #option="slotProps">
              <p>{{ $t(`dropdowns.gender.${slotProps.option}`) }}</p>
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="language-outline" class="text-2xl"></ion-icon>
          </span>
          <Dropdown
            v-model="userDetail.language"
            :options="languages"
            display="chip"
            :placeholder="$t('dropdowns.languages.placeholder')"
            :class="{ 'p-invalid': !userDetail.language }"
            :disabled="!editMode"
          >
            <template #value="valueProp">
              {{ valueProp.value ?? valueProp.placeholder }}
            </template>
            <template #option="slotProps">
              <p>{{ slotProps.option }}</p>
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 xl:col-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="business-outline" class="text-2xl"></ion-icon>
          </span>
          <Dropdown
            v-model="userDetail.region"
            display="chip"
            :placeholder="$t('auth.area.region')"
            :class="{ 'p-invalid': !userDetail.region }"
            :disabled="!editMode"
            :options="regions"
          >
            <template #value="valueProp">
              {{ valueProp.value?.name ?? valueProp.placeholder }}
            </template>
            <template #option="slotProps">
              <p>{{ slotProps.option?.name }}</p>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="card px-4" style="height: 50%; overflow-y: auto">
      <DataTable
        :value="userDetail.roles"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :lazy="true"
        :rowReorder="true"
        class="dataTable"
      >
        <template #header>
          <div class="w-full flex justify-content-end">
            <Button
              icon="pi pi-plus"
              class="p-button-rounded p-button-secondary"
              @click="openDialog"
              v-can="[PolicyType.WRITE_USER]"
            />
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="Name" :header="$t('roles.name')">
          <template #body="slotProps">
            <p>
              {{ slotProps.data.name }}
            </p>
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="orders-subtable">
            <h5>
              {{ $t("roles.subTableHeader", { role: slotProps.data.name }) }}
            </h5>
            <DataTable
              :value="slotProps.data.policies"
              responsiveLayout="scroll"
            >
              <Column field="Name" :header="$t('roles.policyName')">
                <template #body="PolicyProps">
                  <p>
                    {{ PolicyProps.data.name }}
                  </p>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Avatar from "primevue/avatar";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from "vue-i18n";
import { UserService } from "@/backend/auth/services/UserService";
import { UserService as userServiceFromTransportation } from "@/backend/transport/services/UserService";
import { Gender, Language } from "@/backend/auth";
import { useDialog } from "primevue/usedialog";
import addRole from "../addRole.vue";
import { UserStore } from "@/stores/transportation/user";
import type { RegionDto } from "@/backend/city";
import SelectImage from "@/components/selectImage.vue";
import { getImage } from "@/composables/getImage";
import { requestStatus } from "@/stores/common/requestStatus";
import { GetMapGetUserListDto, type GetUserListDto } from "../mapper";
import { getAllRegions } from "../../regions/regions";
import { PolicyType } from "@/backend/transport";

const genders = Object.keys(Gender).map((key) => Gender[key]);
const { t } = useI18n();
const userStore = UserStore();
const requestStatusStore = requestStatus();
watch(
  () => userStore.dialogStatus,
  () => {
    if (userStore.dialogStatus == "close") {
      closeDialog();
    }
  }
);

const languages = Object.keys(Language).map((key) => Language[key]);
const regions = ref<RegionDto[]>();

onMounted(async () => {
  regions.value = await getAllRegions();
});

const expandedRows = ref([]);
const route = useRoute();
const id = route.params.id as string;
const editMode = ref<boolean>(false);

const userDetail = ref<GetUserListDto>({
  displayName: "",
  phoneNumber: undefined,
  email: undefined,
  photoUrl: undefined,
  photo: undefined,
  emailVerified: false,
  disabled: false,
  roles: [],
  region: {},
  gender: Gender.FEMALE,
  language: Language.EN,
});

getUserData();

async function getUserData() {
  await userServiceFromTransportation.getUser({ id }).then((Response) => {
    userDetail.value = Response;
  });
}

function onImageSelect(file) {
  userDetail.value.photo = file;
}
function toggleEditMode(cond: boolean) {
  editMode.value = cond;
}

async function updateUser() {
  await UserService.updateUser({
    userId: id,
    formData: GetMapGetUserListDto(userDetail.value),
  });
  editMode.value = false;
  await getUserData();
}

const confirm = useConfirm();
function confirmUpdate() {
  confirm.require({
    message: !userDetail.value.disabled
      ? t("transportation.users.confirmation.disable")
      : t("transportation.users.confirmation.enable"),
    header: t("reusables.confirmation.header"),
    icon: "pi pi-exclamation-triangle",
    acceptLabel: t("reusables.confirmation.yes"),
    rejectLabel: t("reusables.confirmation.no"),
    accept: () => {
      disableUser();
    },
  });
}

const dialog = useDialog();
let dialogRef: any = "";

function openDialog() {
  userStore.addUserDetail(userDetail.value);
  dialogRef = dialog.open(addRole, {
    props: {
      header: t("roles.addRoleHeader"),

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

function closeDialog() {
  dialogRef.close();
  getUserData();
  userStore.changeDialogStatus("open");
}

async function logoutUser() {
  await UserService.postRevokeLogin({
    requestBody: {
      userId: route.params.id as string,
    },
  });
}

async function disableUser() {
  userDetail.value.disabled = !userDetail.value.disabled;
  await UserService.updateUser({
    userId: id,
    formData: GetMapGetUserListDto(userDetail.value),
  });
  await getUserData();
}
</script>
