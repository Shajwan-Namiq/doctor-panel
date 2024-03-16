<template>
  <div class="my-10 p-4">
    <div class="grid">
      <div class="p-inputgroup col-1">
        <span class="p-inputgroup-addon">
          <ion-icon name="cash-outline" class="text-xl"></ion-icon>
        </span>
        <div class="p-inputgroup flex-1">
          <InputNumber
            autofocus
            id="inputgroup"
            type="number"
            v-model="adminBalanceRequest.amount"
            :placeholder="
              v$.amount.$invalid && submittedForm
                ? $t('validationMessages.required', {
                    field: $t('wallet.amount'),
                  })
                : $t('wallet.amount')
            "
            :class="{
              'p-invalid': v$.amount.$invalid && submittedForm,
            }"
          />
        </div>
      </div>
      <div class="p-inputgroup col-1">
        <div class="p-inputgroup flex-1">
          <Textarea
            autofocus
            id="inputgroup"
            type="number"
            v-model="adminBalanceRequest.description"
            :placeholder="
              v$.description.$invalid && submittedForm
                ? $t('validationMessages.required', {
                    field: $t('transportation.common.description'),
                  })
                : $t('transportation.common.description')
            "
            rows="6"
            :class="{
              'p-invalid': v$.description.$invalid && submittedForm,
            }"
          />
        </div>
      </div>
    </div>
    <div class="mt-3 flex justify-content-end">
      <Button
        @click="updateBalance()"
        :label="$t('buttons.send_balance')"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { onMounted } from "vue";
import { type WalletDto, AdminTransactionService } from "@/backend/wallet";
import Textarea from "primevue/textarea";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";


const dialogRef: any = inject("dialogRef");
const wallet = ref<any>();
const loading = ref<boolean>(false);
const submittedForm = ref<boolean>(false);
const adminBalanceRequest = ref({
  amount: undefined,
  description: undefined,
});
const rule = {
  amount: { required },
  description: { required },
};
const v$ = useVuelidate(rule, adminBalanceRequest);
onMounted(() => {
  const params = dialogRef.value.data;
  wallet.value = params.wallet;
});

onMounted(() => {
  const params = dialogRef.value.data;
  wallet.value = params.wallet;
});

const updateBalance = async () => {
  submittedForm.value = true;
  if (v$.value.$invalid) return;

  loading.value = true;

  AdminTransactionService.addToAdminWalletBalance({
    requestBody: {
      walletId: wallet.value?.walletId,
      amount: adminBalanceRequest.value.amount!,
      description: adminBalanceRequest.value.description!,
    },
  }).then((response: WalletDto) => {
    wallet.value = response;
    dialogRef.value.close();
    dialogRef.value.emits.onChange();
  });
  submittedForm.value = false;
  loading.value = false;
};
</script>
