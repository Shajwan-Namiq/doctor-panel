<template>
  <div class="p-4">
    <div class="flex flex-row items-center mb-4">
      <img
        class="w-4rem h-4rem border-circle mx-2"
        style="object-fit: cover"
        :src="getImage(wallet?.user?.photoUrl)"
      />

      <div class="m-1"></div>
      <div class="flex-col justify-center items-center">
        <h1 class="text-2xl font-bold">{{ wallet?.user?.displayName }}</h1>
        <h3 class="mt-1">{{ wallet?.user?.phoneNumber }}</h3>
      </div>
    </div>
    <div class="flex">
      <div class="flex">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="text-outline" class="text-xl"></ion-icon>
          </span>
          <div class="p-inputgroup flex-1">
            <InputText
              autofocus
              id="inputgroup"
              type="number"
              v-model="amountValue"
              :placeholder="
                !amountValue && submittedForm
                  ? $t('validationMessages.required', {
                      field: $t('wallet.amount'),
                    })
                  : $t('wallet.amount')
              "
              :class="{
                'p-invalid': !amountValue && submittedForm,
              }"
            />
            <Button
              @click="sendBalance()"
              icon="pi pi-wallet"
              :label="$t('buttons.send_balance')"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { onMounted } from "vue";
import { TransactionService } from "@/backend/wallet";
import { getImage } from "@/composables/getImage";

const dialogRef: any = inject("dialogRef");
const wallet = ref<any>();
const amountValue = ref<string>();
const loading = ref<boolean>(false);
const submittedForm = ref(false);

onMounted(() => {
  const params = dialogRef.value.data;
  wallet.value = params.wallet;
});

const sendBalance = async () => {
  submittedForm.value = true;
  if (!amountValue.value) return;
  loading.value = true;

  const sendBalanceRequest: any = {
    amount: parseInt(amountValue.value!),
    destinationUserId: wallet.value?.userId,
  };
  const result = await TransactionService.depositWallet({
    requestBody: sendBalanceRequest,
  });
  loading.value = false;
  submittedForm.value = false;

  dialogRef.value.close(result.statusCode);
};
</script>
