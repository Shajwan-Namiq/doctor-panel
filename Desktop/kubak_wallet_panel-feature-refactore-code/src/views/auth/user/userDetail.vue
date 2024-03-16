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
            v-model="userDetail.regionData"
            display="chip"
            :placeholder="$t('auth.area.region')"
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
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { UserService as userServiceFromTransportation } from "@/backend/wallet/services/UserService";
import { Gender, Language } from "@/backend/wallet";
import type { RegionDto, RoleDto } from "@/backend/wallet";
import { getImage } from "@/composables/getImage";
import { currentUser } from "@/stores/currentUser";
import { getAllRegions, getRegionById } from "@/views/wallet/regions/regions";
import { UserStore } from "@/stores/user";

const genders = Object.keys(Gender).map((key) => Gender[key]);

const userStore = UserStore();

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

export type UserDto = {
  uid?: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  roles?: Array<RoleDto> | null;
  regionId?: number | null;
  region?: RegionDto;
  language?: Language;
  gender?: Gender;
  emailVerified?: boolean;
  disabled?: boolean;
  regionData?: RegionDto;
};

const userDetail = ref<UserDto>({
  displayName: "",
  phoneNumber: undefined,
  email: undefined,
  photoUrl: undefined,
  emailVerified: false,
  disabled: false,
  roles: [],
  regionData: {},
  gender: Gender.FEMALE,
  language: Language.EN,
});

getUserData();
const currentUserStore = currentUser();

async function getUserData() {
  await userServiceFromTransportation.getUser({ id }).then((Response) => {
    userDetail.value = Response;
  });
  userDetail.value.regionData =
    (await getRegionById(currentUserStore.userInfo.regionId)) || {};
}

let dialogRef;

function closeDialog() {
  dialogRef.close();
  getUserData();
  userStore.changeDialogStatus("open");
}
</script>
