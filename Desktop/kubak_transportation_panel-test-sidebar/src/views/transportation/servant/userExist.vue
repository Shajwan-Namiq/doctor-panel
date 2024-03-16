<template>
  <div class="md:p-6 p-2">
    <div class="addDataComponentWrapper p-4">
      <div class="mb-6">
        <h2 class="mx-2">
          {{ $t("transportation.servant.createServant.steps.checkUser.desc") }}
        </h2>
      </div>
      <div class="grid" style="width: 100% !important">
        <div class="col-8 md:col-5 lg:col-4 xl:col-3 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="call-outline" class="text-2xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <InputText
                class="w-full"
                autofocus
                id="inputgroup"
                type="text"
                v-model="userData.mobile"
                @keyup.enter="submitActiveService()"
              />
              <label for="inputgroup">{{
                $t("transportation.passenger.phoneNumber")
              }}</label>
            </span>
          </div>
        </div>
        <div class="col-2">
          <Button
            :label="$t('buttons.search')"
            @click="submitActiveService"
            :loading="requestStatusStore.loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { requestStatus } from "@/stores/common/requestStatus";
import { ServantService } from "@/backend/transport/services/ServantService";

const requestStatusStore = requestStatus();
const userData = ref({
  mobile: "",
});
const router = useRouter();
const rule = {
  mobile: { required },
};
const v$ = useVuelidate(rule, userData.value);

function submitActiveService() {
  if (!v$.value.$invalid) {
    ServantService.isUserExist({
      phone: userData.value.mobile,
      includeServant: true,
    }).then((Response) => {
      if (Response.isUser) {
        if (Response.isServant) {
          router.push({
            name: "detailServant",
            params: {
              id: Response.servant?.id,
            },
          });
        } else {
          router.push({
            path: "/transportation/servant/create/createServant",
          });
          localStorage.setItem("createServantId", Response.user?.uid ?? "");
        }
      }
    });
  }
}
</script>
<style lang="scss">
.addDataComponentWrapper {
  background-color: var(--secondary-background-color-kubak);
  padding-bottom: 20px;
  border-radius: 5px;
}
</style>
