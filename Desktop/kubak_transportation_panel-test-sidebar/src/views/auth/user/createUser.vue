<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <div class="flex flex-column justify-content-between">
        <div class="flex justify-content-between">
          <div>
            <div style="height: 150px; width: 150px" class="mx-4 mt-3">
              <SelectImage :circle="true" @selectImageFile="onImageSelect" />
            </div>
          </div>
        </div>
        <div class="grid mt-3">
          <div class="col-12 md:col-6 lg:col-4 py-4">
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
          <div class="col-12 md:col-6 lg:col-4 py-4">
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
                  :useGrouping="false"
                  :class="{
                    'p-invalid': v$.phoneNumber.$invalid && submittedForm,
                  }"
                />
                <label for="inputgroup">{{
                  $t("transportation.users.mobile")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 py-4">
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
                  :class="{
                    'p-invalid': v$.email.$invalid && submittedForm,
                  }"
                />
                <label for="inputgroup">{{
                  $t("transportation.users.email")
                }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon
                  name="lock-closed-outline"
                  class="text-2xl"
                ></ion-icon>
              </span>
              <span class="p-float-label">
                <InputText
                  autofocus
                  id="inputgroup"
                  type="text"
                  v-model="userDetail.password"
                  :class="{
                    'p-invalid': v$.password.$invalid && submittedForm,
                  }"
                />
                <label for="inputgroup">
                  <template v-if="!submittedForm">
                    {{ $t("authPage.login.passwordInputPlaceholder") }}
                  </template>
                  <template
                    v-else-if="
                      userDetail.password && userDetail.password.length < 6
                    "
                  >
                    {{ $t("validationMessages.password_length") }}
                  </template>
                  <template v-else-if="!userDetail.password">
                    {{
                      $t("validationMessages.required", {
                        field: $t("authPage.login.passwordInputPlaceholder"),
                      })
                    }}
                  </template>
                  <template v-else>
                    {{ $t("authPage.login.passwordInputPlaceholder") }}
                  </template>
                </label>
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="menu-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                v-model="userDetail.gender"
                optionLabel="name"
                :placeholder="$t('dropdowns.gender.placeholder')"
                class="genderDropdown"
                :options="genders"
                :class="{
                  'p-invalid': v$.gender.$invalid && submittedForm,
                }"
              >
                <template #value="slotProps">
                  {{
                    v$.gender.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: $t("dropdowns.gender.placeholder"),
                        })
                      : slotProps.value
                      ? $t(`dropdowns.gender.${slotProps.value}`)
                      : slotProps.placeholder
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
          <div class="col-12 md:col-6 lg:col-4 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="person-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                v-model="userDetail.userType"
                optionLabel="name"
                :placeholder="$t('dropdowns.userType.placeholder')"
                :options="userTypes"
              >
                <template #value="slotProps">
                  {{
                    slotProps.value
                      ? $t(`dropdowns.userType.${slotProps.value}`)
                      : slotProps.placeholder
                  }}
                </template>
                <template #option="slotProps">
                  <div class="flex">
                    <p class="mx-2">
                      {{ $t(`dropdowns.userType.${slotProps.option}`) }}
                    </p>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="language-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                :options="languages"
                v-model="userDetail.language"
                display="chip"
                :placeholder="$t('dropdowns.languages.placeholder')"
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
          <div class="col-12 md:col-6 lg:col-4 py-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="business-outline" class="text-2xl"></ion-icon>
              </span>
              <Dropdown
                v-model="userDetail.region"
                :options="regions"
                display="chip"
                :placeholder="$t('auth.area.regions')"
                :class="{
                  'p-invalid': v$.region.$invalid && submittedForm,
                }"
              >
                <template #value="valueProp">
                  {{
                    v$.region.$invalid && submittedForm
                      ? $t("validationMessages.required", {
                          field: $t("auth.area.regions"),
                        })
                      : valueProp.value?.name ?? valueProp.placeholder
                  }}
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
            v-model:expandedRows="expandedRows"
            dataKey="id"
            responsiveLayout="scroll"
            :lazy="true"
            :rowReorder="true"
            :value="selectedRoles"
            class="dataTable"
          >
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <div class="table-header">{{ $t("roles.role") }}</div>
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="document-lock-outline"
                        class="text-xl"
                      ></ion-icon>
                    </span>
                    <MultiSelect
                      :placeholder="$t('fields.role')"
                      :options="roleOptions"
                      v-model="selectedRoles"
                      :class="{
                        'p-invalid': v$.roles.$invalid && submittedForm,
                      }"
                    >
                      <template #value="valueProp">
                        {{
                          v$.roles.$invalid && submittedForm
                            ? $t("validationMessages.required", {
                                field: $t("auth.area.roles"),
                              })
                            : valueProp.value.length
                            ? valueProp.value.map((x) => x.name).join(" , ")
                            : valueProp.placeholder ?? valueProp.placeholder
                        }}
                      </template>
                      <template #option="slotProps">
                        <p>
                          {{ slotProps.option.name }}
                        </p>
                      </template>
                    </MultiSelect>
                  </div>
                </div>
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

        <div class="flex justify-content-end mt-4">
          <Button
            :label="$t('buttons.submit')"
            icon="pi pi-check-circle"
            :loading="requestInfoStore.loading"
            @click="submitEdit"
          />
        </div>
      </div>
      <loadingComponent v-if="requestInfoStore.loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { requestStatus } from "@/stores/common/requestStatus";
import { computed, onMounted, ref } from "vue";
import { Gender } from "@/backend/auth/models/Gender";
import { Language } from "@/backend/auth/models/Language";
import type { RegionDto, RoleDto } from "@/backend/auth";
import SelectImage from "@/components/selectImage.vue";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { RoleStore } from "@/stores/common/role";
import { UserService } from "@/backend/auth";
import { UserType } from "@/backend/auth/models/UserType";
import { CreateMapUserListDto, UserList } from "./mapper";
import { getAllRegions } from "../regions/regions";
import { useRouter } from "vue-router";

const { t } = useI18n();
const regions = ref<RegionDto[]>();
onMounted(async () => {
  regions.value = await getAllRegions();
});

const languages = Object.keys(Language).map((key) => Language[key]);
const genders = Object.keys(Gender).map((key) => Gender[key]);
const userTypes = Object.keys(UserType).map((key) => UserType[key]);
const router = useRouter();

const requestInfoStore = requestStatus();
const submittedForm = ref(false);

const userDetail = ref<UserList>({
  displayName: "",
  email: "",
  gender: Gender.FEMALE,
  language: Language.EN,
  phoneNumber: undefined,
  photo: undefined,
  region: {},
  roles: [],
  password: "",
});
const selectedRoles = ref<{ id: number }[]>([]);
const expandedRows = ref([]);

const roleOptions = ref<RoleDto[]>();

const roleStore = RoleStore();
roleStore.getAllRole().then((res) => {
  roleOptions.value = res;
});

const userType = computed(() => userDetail.value.userType);

const phoneNumberValidation = computed(() => {
  return userType.value === UserType.APP ? { required } : {};
});

const passwordValidation = computed(() => {
  return userType.value === UserType.PANEL
    ? { required, minLength: minLength(6) }
    : {};
});

const emailValidation = computed(() => {
  return userType.value === UserType.PANEL ? { required } : {};
});

const rule = {
  displayName: { required },
  roles: { required },
  email: emailValidation,
  password: passwordValidation,
  language: { required },
  gender: { required },
  region: { required },
  phoneNumber: phoneNumberValidation,
};

const v$ = useVuelidate(rule, userDetail.value as any);

async function submitEdit() {
  submittedForm.value = true;

  for (const role of selectedRoles.value) {
    userDetail.value.roles.push({
      id: role.id,
    });
  }

  if (!v$.value || v$.value.$invalid) return;

  await UserService.postUser({
    formData: CreateMapUserListDto(userDetail.value),
  }).then(() => {
    const toast = toastStore();
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", { field: t("fields.profile") }),
      type: "success",
    });
  });
  submittedForm.value = false;
  clearData();
  selectedRoles.value = [];
  router.push({
    path: "/user/list",
  });
}

function onImageSelect(file) {
  userDetail.value.photo = file;
}

function clearData() {
  userDetail.value = {
    displayName: "",
    email: "",
    gender: Gender.FEMALE,
    language: Language.EN,
    phoneNumber: undefined,
    photo: undefined,
    region: {},
    roles: [],
    password: "",
  };
}
</script>
