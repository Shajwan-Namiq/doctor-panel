<template>
  <div class="my-10">
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="card-outline" class="text-xl"></ion-icon>
          </span>
          <div class="p-inputgroup flex-1">
            <InputNumber
              autofocus
              id="inputgroup"
              type="number"
              v-model="walletData.balance"
              :placeholder="
                v$.balance.$invalid && submittedForm
                  ? $t('validationMessages.required', {
                      field: $t('wallet.amount'),
                    })
                  : $t('wallet.amount')
              "
              :class="{
                'p-invalid': v$.balance.$invalid && submittedForm,
              }"
            />
          </div>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="person-outline" class="text-xl"></ion-icon>
          </span>
          <Dropdown
            :options="walletTypeOptions"
            display="chip"
            :placeholder="$t('wallet.walletType')"
            v-model="walletData.type"
            :class="{
              'p-invalid': v$.type.$invalid && submittedForm,
            }"
          >
            <template #value="valueProp">
              {{
                v$.type.$invalid && submittedForm
                  ? $t("validationMessages.required", {
                      field: $t("wallet.walletType"),
                    })
                  : valueProp.value ?? valueProp.placeholder
              }}
            </template>
            <template #option="slotProps">
              <p>
                {{ slotProps.option }}
              </p>
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 mb-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon name="cash-outline" class="text-xl"></ion-icon>
          </span>
          <div class="p-inputgroup flex-1">
            <Dropdown
              :options="currencyOptions"
              display="chip"
              :placeholder="$t('wallet.currency')"
              v-model="walletData.currency"
              :class="{
                'p-invalid': v$.currency.$invalid && submittedForm,
              }"
            >
              <template #value="valueProp">
                {{
                  v$.currency.$invalid && submittedForm
                    ? $t("validationMessages.required", {
                        field: $t("wallet.currency"),
                      })
                    : valueProp.value ?? valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="my-2 flex justify-content-end">
      <Button
        @click="updateBalance()"
        icon="pi pi-pencil"
        :label="$t('buttons.update_balance')"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { onMounted } from "vue";
import { WalletService, WalletType, Currency } from "@/backend/wallet";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const dialogRef: any = inject("dialogRef");
const loading = ref<boolean>(false);
const submittedForm = ref(false);

const walletTypeOptions = Object.keys(WalletType).map((key) => WalletType[key]);
const currencyOptions = Object.keys(Currency).map((key) => Currency[key]);

const walletData = ref({
  balance: undefined,
  currency: undefined,
  id: undefined,
  type: undefined,
});
const rule = {
  balance: { required },
  currency: { required },
  type: { required },
  id: { required },
};
const v$ = useVuelidate(rule, walletData);

onMounted(() => {
  const params = dialogRef.value.data;
  walletData.value = {
    balance: params.wallet?.balance,
    currency: params.wallet?.currency,
    id: params.wallet?.walletId,
    type: params.wallet?.type,
  };
});

const updateBalance = async () => {
  submittedForm.value = true;
  if (v$.value.$invalid) return;
  loading.value = true;
  WalletService.updateWallet(walletData.value as any)
    .then(() => {
      loading.value = false;
      submittedForm.value = false;
      dialogRef.value.close();
      dialogRef.value.options.emits.onWalletUpdated();
    })
    .catch(() => {
      loading.value = false;
      submittedForm.value = false;
    });
};
</script>
