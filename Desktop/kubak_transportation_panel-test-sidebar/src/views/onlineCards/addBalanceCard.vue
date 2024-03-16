<!-- <template>
  <div class="card flex justify-content-center">
    <form
      @submit="onSubmit"
      class="flex flex-column gap-3 align-items-center justify-content-center"
    >
      <div class="w-full h-10rem">
        <SelectFile @selectFile="onFileSelected"></SelectFile>
      </div>
      <Dropdown
        optionLabel="name"
        placeholder="Card Provider"
        aria-required="true"
        v-model="selectedCardProvider"
        :options="cardProviders"
        class="w-full md:w-14rem"
      />
      <Dropdown
        optionLabel="name"
        placeholder="Card Type"
        aria-required="true"
        v-model="selectedCardType"
        :options="cardTypes"
        class="w-full md:w-14rem"
      />
      <small class="p-error" id="text-error">{{
        cardNameError || "&nbsp;"
      }}</small>
      <small class="p-error" id="text-error">{{
        cardPriceError || "&nbsp;"
      }}</small>
      <Button class="w-full" type="submit" label="Submit" />
    </form>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import SelectFile from "@/components/selectFile.vue";
import {
  CardTypeService,
  type CardTypeDto,
  type CardProviderDto,
  BalanceCardService,
  CardProviderService,
} from "@/backend/wallet";
import { inject, onMounted, ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
const { handleSubmit, resetForm } = useForm();
const { value: selectedCardProvider, errorMessage: cardNameError } = useField(
  "cardProvider",
  validateFieldCardProvider
);
const { value: selectedCardType, errorMessage: cardPriceError } = useField(
  "cardType",
  validateFieldCardType
);
// const selectedCardProvider: Ref<CardProviderDto | undefined | null> = ref(null);
// const selectedCardType: Ref<CardTypeDto | undefined | null> = ref(null);

const cardProviders: CardProviderDto[] = [];
const cardTypes: CardTypeDto[] = [];

let file: File;
const dialogRef: any = inject("dialogRef");

const prevCardType: Ref<CardTypeDto | null | undefined> = ref(null);
const selectedCardProviderId = ref<number | null>(null);
const route = useRoute();

function validateFieldCardProvider(value) {
  if (!value) {
    return "Please select a card provider.";
  }
  return true;
}

function validateFieldCardType(value) {
  if (!value) {
    return "Please select a card type.";
  }
  return true;
}

onMounted(() => {
  const params = dialogRef.value.data;
  CardProviderService.getCardProviders({
    page: 0,
    limit: 1000,
  }).then(
    function (data) {
      if (data.items) {
        cardProviders.push(...data.items!);
      }
    },
    function (errorMessage) {
      //Do something with the error message
    }
  );
});

watch(selectedCardProvider, (newValue) => {
  // update the imageToEdit value when prevCardProvider changes
  if (newValue) {
    CardTypeService.getCardTypes({
      page: 0,
      limit: 1000,
      cardProviderId: newValue.id!,
    }).then(
      function (data) {
        if (data.items) {
          cardTypes.push(...data.items!);
        }
      },
      function (errorMessage) {
        //Do something with the error message
      }
    );
  }
});

const onSubmit = handleSubmit((values) => {
  const formData = new FormData();
  formData.append("file", file);
  const name: string = values.cardName;
  const price: number = values.cardPrice;
  const cardData = {
    formData: {
      name: name,
      file: file,
      price: price,
      cardTypeId: selectedCardType.value!.id,
    },
  };

  BalanceCardService.postCards(cardData).then(
    function (data) {
      dialogRef.value.close(data.statusCode);
    },
    function (errorMessage) {
      //Do something with the error message
    }
  );
  resetForm();
});

const onFileSelected = (selectedFile: File) => {
  file = selectedFile;
};
</script> -->
<template>
  <div></div>
</template>
