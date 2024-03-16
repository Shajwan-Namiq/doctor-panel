<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <div class="form px-4">
        <div class="grid mt-2" style="width: 100% !important">
          <div class="col-12 lg:col-6 mb-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <ion-icon name="call-outline" class="text-2xl"></ion-icon>
              </span>
              <span class="p-float-label">
                <InputText v-model="phoneNumber" @keyup.enter="checkUser" />
                <label for="inputgroup">{{ $t("fields.phoneNumber") }}</label>
              </span>
            </div>
          </div>
          <div class="col-12 lg:col-5 mb-4">
            <div
              class="flex align-items-center h-full w-full justify-content-end"
            >
              <Button
                icon="pi pi-search"
                :label="$t('buttons.search')"
                @click="checkUser"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full flex justify-content-center"
        v-if="requestStatusStore.loading"
      >
        <ProgressSpinner />
      </div>
      <TabView lazy v-if="userDetail && userDetail.isUser" class="mt-4">
        <TabPanel :header="$t('transportation.passenger.profile')">
          <Profile :userDetail="userDetail" />
        </TabPanel>
        <TabPanel :header="$t('transportation.tasks.title')">
          <Tasks :uid="userDetail.user?.uid" />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Profile from "./detailTabs/profile.vue";
import Tasks from "./detailTabs/tasks.vue";
import ProgressSpinner from "primevue/progressspinner";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref } from "vue";
import { ServantService } from "@/backend/transport/services/ServantService";
import { useRoute } from "vue-router";

const route = useRoute();
const requestStatusStore = requestStatus();
const phoneNumber = ref((route.query.phoneNumber as string) ?? "");
const userDetail = ref();

if (phoneNumber.value) {
  checkUser();
}
function checkUser() {
  userDetail.value = {};
  ServantService.isUserExist({ phone: phoneNumber.value }).then((Response) => {
    userDetail.value = Response;
  });
}
</script>
<style lang="scss">
.passengerDetailWrapper {
  background-color: var(--secondary-background-color-kubak);
}
</style>
