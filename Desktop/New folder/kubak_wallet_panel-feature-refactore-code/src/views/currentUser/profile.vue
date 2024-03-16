<template>
  <div class="w-full flex justify-content-center">
    <div class="userProfileContainer w-full xl:w-9">
      <div class="detailContainer flex flex-column justify-content-between p-4">
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
              icon="pi pi-pencil"
              class="p-button-warn"
              @click="toggleEditMode(true)"
              v-tooltip.bottom="
                $t('tooltips.edit', { field: $t('tooltips.fields.user') })
              "
            />
          </div>
          <div v-if="editMode" class="m-4">
            <Button
              icon="pi pi-check"
              class="p-button-success mx-2"
              v-tooltip.bottom="
                $t('tooltips.edit', { field: $t('tooltips.fields.user') })
              "
              @click="submitEdit"
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
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
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
                  :class="{
                    'p-invalid': v$.displayName.$invalid && submittedForm,
                  }"
                />
                <label for="inputgroup">{{
                  v$.displayName.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t("transportation.users.name"),
                      })
                    : $t("transportation.users.name")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
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
                  :disabled="true"
                  :useGrouping="false"
                />
                <label for="inputgroup">{{
                  $t("transportation.users.mobile")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
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
                  :class="{
                    'p-invalid': v$.email.$invalid && submittedForm,
                  }"
                />
                <label for="inputgroup">{{
                  v$.displayName.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t("transportation.users.email"),
                      })
                    : $t("transportation.users.email")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="menu-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                v-model="userDetail.gender"
                optionLabel="name"
                :placeholder="$t('dropdowns.gender.placeholder')"
                :disabled="!editMode"
                :class="{ 'p-invalid': !userDetail.language }"
                class="genderDropdown"
                :options="genders"
              >
                <template #value="slotProps">
                  {{
                    $t(`dropdowns.gender.${slotProps.value}`) ??
                    slotProps.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <div class="flex">
                    <ion-icon
                      :name="`${
                        slotProps.option == 'Female' ? 'female' : 'male'
                      }-outline`"
                      class="text-2xl"
                    ></ion-icon>

                    <p class="mx-2">
                      {{ $t(`dropdowns.gender.${slotProps.option}`) }}
                    </p>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="language-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                :options="languages"
                v-model="userDetail.language"
                display="chip"
                :placeholder="$t('dropdowns.languages.placeholder')"
                :disabled="!editMode"
                :class="{
                  'p-invalid': v$.language.$invalid && submittedForm,
                }"
              >
                <template #value="valueProp">
                  {{
                    v$.language.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: $t("dropdowns.languages.placeholder"),
                        })
                      : valueProp.value
                      ? valueProp.value
                      : valueProp.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <p>{{ slotProps.option }}</p>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 xl:col-3 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="business-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                v-model="userDetail.region"
                :options="regions"
                display="chip"
                :placeholder="$t('auth.area.regions')"
                :class="{ 'p-invalid': !userDetail.region }"
                :disabled="!editMode"
              >
                <template #value="valueProp">
                  {{ valueProp.value?.name ?? valueProp.placeholder }}
                </template>
                <template #option="slotProps">
                  <p>{{ slotProps.option.name }}</p>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="card" style="height: 50%; overflow-y: auto">
          <DataTable
            :value="roles"
            v-model:expandedRows="expandedRows"
            dataKey="id"
            responsiveLayout="scroll"
            :lazy="true"
            :rowReorder="true"
            class="dataTable"
          >
            <template #header>
              <div class="flex justify-content-between">
                <div class="table-header">{{ $t("roles.role") }}</div>
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
                  {{
                    $t("roles.subTableHeader", { role: slotProps.data.Name })
                  }}
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
            <ConfirmDialog></ConfirmDialog>
          </DataTable>
        </div>
      </div>
      <loadingComponent v-if="requestInfoStore.loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { currentUser } from "@/stores/currentUser";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import Avatar from "primevue/avatar";
import { RegionStore } from "@/stores/common/region";
import { Gender } from "@/backend/auth/models/Gender";
import type { UserDto } from "@/backend/auth/models/UserDto";
import { watch } from "vue";
import { Language } from "@/backend/auth/models/Language";
import type { RegionDto } from "@/backend/auth";
import SelectImage from "@/components/selectImage.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { getImage } from "@/composables/getImage";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const languages = Object.keys(Language).map((key) => Language[key]);
const genders = Object.keys(Gender).map((key) => Gender[key]);
const requestInfoStore = requestStatus();
const currentUserStore = currentUser();
const submittedForm = ref(false);
watch(
  () => currentUserStore.userInfo,
  () => {
    userDetail.value = currentUserStore.userInfo;
  }
);
const userDetail = ref<UserDto>({
  disabled: false,
  displayName: "",
  email: "",
  emailVerified: false,
  gender: undefined,
  language: undefined,
  phoneNumber: undefined,
  photoUrl: undefined,
  region: undefined,
  roles: [],
  uid: undefined,
});
const updateUser = ref<any>({
  displayName: "",
  phoneNumber: "",
  email: "",
  photoUrl: "",
  gender: Gender.FEMALE,
  language: 0,
  regionId: 0,
});
userDetail.value = currentUserStore.userInfo;
const expandedRows = ref([]);

const editMode = ref<boolean>(false);
const roles = ref();
roles.value = userDetail.value?.roles;
const rule = {
  displayName: { required },
  phoneNumber: { required },
  email: { required },
  language: { required },
};

const v$ = useVuelidate(rule, updateUser.value);
function toggleEditMode(cond: boolean) {
  editMode.value = cond;
}
async function submitEdit() {
  submittedForm.value = true;
  for (const field in updateUser.value) {
    if (userDetail.value.hasOwnProperty(field)) {
      updateUser.value[field] = userDetail.value[field];
    } else {
      updateUser.value.regionId = userDetail.value.region?.id ?? 0;
    }
  }
  if (v$.value.$invalid) return;
  await currentUserStore.updateProfile(updateUser.value).then(() => {
    const toast = toastStore();
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", { field: t("fields.profile") }),
      type: "success",
    });
    editMode.value = false;
  });
}

function onImageSelect(file) {
  updateUser.value.photo = file;
}
</script>
<style lang="scss">
.userProfileContainer {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}
.detailContainer {
  border-radius: 10px;
  background-color: var(--secondary-background-color-kubak);
  height: 90%;
  width: 90%;
  .userDetail {
    p {
      font-size: 20px;
      margin: 15px;
    }
  }
  .userAvatarEdit {
    cursor: pointer;
    .p-avatar {
      background-color: black !important;
      img {
        opacity: 50% !important;
      }
    }
  }
}
.editIcon {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  height: 35px;
  width: 35px;
  margin: 10px 20px 0 20px;
  &:hover {
    background-color: var(--icon-background-color-kubak);
  }
  border-radius: 5px;
  i {
    font-size: 18px;
  }
}
</style>
