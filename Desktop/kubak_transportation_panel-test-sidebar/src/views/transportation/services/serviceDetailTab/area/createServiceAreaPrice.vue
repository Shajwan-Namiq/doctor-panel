<template>
  <div class="w-full grid px-2">
    <div class="col-12 md:col-12 lg:col-6 mb-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="car-outline" class="text-xl"></ion-icon>
        </span>
        <InputNumber
          v-model="destinationData.priceRatePerDistance"
          :placeholder="$t('transportation.services.area.withDestinationPrice')"
        />
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-6 mb-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="car-outline" class="text-xl"></ion-icon>
        </span>
        <InputNumber
          v-model="withoutDestinationData.priceRatePerDistance"
          :placeholder="
            $t('transportation.services.area.withoutDestinationPrice')
          "
        />
      </div>
    </div>
    <div
      class="w-full flex justify-content-center"
      v-if="serviceData.destinationTypes?.length === 0"
    >
      <Message severity="error" class="w-full" :closable="false">
        {{ $t("transportation.services.area.priceError") }}
      </Message>
    </div>
    <div class="col-12 flex justify-content-end">
      <Button
        :label="$t('buttons.submit')"
        @click="addServiceAreaData"
        :loading="requestStatusStore.loading"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DestinationType, ServiceAreaPriceService } from "@/backend/transport";
import { ServiceStore } from "@/stores/common/service";
import { inject, ref } from "vue";
import Message from "primevue/message";
import { requestStatus } from "@/stores/common/requestStatus";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const toast = toastStore();
const { t } = useI18n();
const requestStatusStore = requestStatus();
const submittedForm = ref(false);
const route = useRoute();
const serviceData = ref<any>({
  boundary: [],
  destinationTypes: undefined,
  serviceId: route.params.id,
});
const destinationData = ref({
  destinationType: DestinationType.WITH_DESTINATION,
  priceRatePerDistance: undefined,
});
const withoutDestinationData = ref({
  destinationType: DestinationType.WITHOUT_DESTINATION,
  priceRatePerDistance: undefined,
});
const serviceStore = ServiceStore();
const services = ref();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});
const dialogRef: any = inject("dialogRef");

async function addServiceAreaData() {
  submittedForm.value = true;
  serviceData.value.destinationTypes = [];
  if (destinationData.value.priceRatePerDistance) {
    serviceData.value.destinationTypes!.push(destinationData.value);
  }
  if (withoutDestinationData.value.priceRatePerDistance) {
    serviceData.value.destinationTypes!.push(withoutDestinationData.value);
  }
  serviceData.value.boundary = dialogRef.value.data.boundary;
  // serviceData.value.serviceId = selectedService?.value?.id;
  // if (!serviceData.value.serviceId) return;
  if (serviceData.value.destinationTypes.length === 0) return;
  await ServiceAreaPriceService.createServiceAreaPrice({
    requestBody: serviceData.value,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("transportation.services.area.title"),
      }),
      type: "success",
    });
  });
  dialogRef.value.close();
  dialogRef.value.options.emits.onCreateServiceAreaPrice();
}
</script>
