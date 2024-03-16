<template>
  <Splitter class="w-full grid py-6" style="min-width: 700px" layout="vertical">
    <SplitterPanel class="w-full grid">
      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="car-outline" class="text-xl"></ion-icon>
          </span>
          <span class="w-full">
            <Dropdown
              :options="services"
              optionLabel="Typ"
              :placeholder="$t('transportation.serviceType.name')"
              class="w-full"
              :class="{
                'p-invalid': v$.serviceType.$invalid && submittedForm,
              }"
              v-model="blockUserData.serviceType"
            >
              <template #value="valueProp">
                {{
                  v$.serviceType.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t("transportation.serviceType.name"),
                      })
                    : valueProp.value?.translations
                    ? valueProp.value?.translations[0]?.title
                    : valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <div class="w-full flex align-items-center">
                  <img
                    :src="getImage(slotProps.option.iconUrl)"
                    class="h-2rem w-2rem mx-2"
                  />
                  <p>{{ slotProps.option?.translations[0]?.title }}</p>
                </div>
              </template>
            </Dropdown>
          </span>
        </div>
      </div>

      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <SearchUserComponent
          @selectedUser="
            (selectedUser) => {
              blockUserData.users = selectedUser;
            }
          "
          :singleUser="true"
          :placeholder="$t('auth.user.blockUser')"
        />
      </div>

      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <div class="">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="calendar-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <Calendar
                autofocus
                id="inputgroup"
                type="text"
                dateFormat="dd/mm/yy"
                v-model="blockUserData.unblockedAt"
                showTime
                hourFormat="24"
                showSeconds
              />
              <label for="inputgroup">{{
                $t("transportation.users.unBlockAt")
              }}</label>
            </span>
          </div>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="flex justify-content-end">
          <Button severity="danger" @click="blockUser">
            <template #default>
              <div class="flex justify-content-between align-items-center">
                <ion-icon name="ban-outline" class="text-xl"></ion-icon>
                {{ $t("transportation.users.block") }}
              </div>
            </template>
          </Button>
        </div>
      </div>
    </SplitterPanel>
  </Splitter>
</template>
<script lang="ts" setup>
import { inject, ref } from "vue";
import { ServiceStore } from "@/stores/common/service";
import { UserBlockService } from "@/backend/transport";
import Calendar from "primevue/calendar";
import { getImage } from "@/composables/getImage";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { createMapBlockServantRequestDtoToBlockServantRequest } from "./mapperToBlockedUser/mapper";
import SearchUserComponent from "@/components/searchUserDropdown.vue";

const serviceStore = ServiceStore();
const toast = toastStore();
const { t } = useI18n();

// return service
const services = ref();
serviceStore.getAllServiceType().then((res) => {
  services.value = res;
});

const dialogRef: any = inject("dialogRef");

const blockUserData = ref({
  serviceType: undefined,
  unblockedAt: undefined,
  users: undefined,
});

const rule = {
  serviceType: { required },
  users: { required },
};

const submittedForm = ref(false);
const v$ = useVuelidate(rule, blockUserData as any);

function blockUser() {
  submittedForm.value = true;
  if (v$.value.$invalid) return;
  UserBlockService.postUserBlock({
    requestBody: createMapBlockServantRequestDtoToBlockServantRequest(
      blockUserData.value as any
    ),
  }).then(() => {
    dialogRef.value.close();
    toast.changeToastState({
      severity: t("toasts.block_header"),
      summary: t("toasts.block_desc", { field: t("fields.user") }),
      type: "success",
    });
  });
}
</script>
