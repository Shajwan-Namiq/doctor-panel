<template>
  <div class="p-4">
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
              v-model="ammountValue"
            />
            <Button
              v-if="!loading"
              @click="sendBalance(wallet?.user?.phoneNumber)"
              icon="pi pi-wallet"
              severity="warning"
            />
            <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { AdminTransactionService, type WalletDto } from "@/backend/wallet";

const dialogRef: any = inject("dialogRef");
const wallet = ref<WalletDto>();
const ammountValue = ref<string>();
const loading = ref<boolean>(false);

// send balance to user
const sendBalance = async () => {
  loading.value = true;
  const sendBalanceRequest: any = {
    amount: parseInt(ammountValue.value!),
  };
  const result = await AdminTransactionService.updateAdminBalance({
    requestBody: sendBalanceRequest,
  });
  loading.value = false;
  // close the modal
  loading.value = false;
  dialogRef.value.close(result.statusCode);
};
</script>

<style>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background: #525252;
}
</style>
