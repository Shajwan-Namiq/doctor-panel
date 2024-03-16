<!-- <template>
  <div class="card flex justify-content-center">
    <form
      @submit="onSubmit"
      class="flex flex-column gap-3 align-items-center justify-content-center"
    >
      <div class="w-10rem h-10rem">
        <SelectImage
          v-if="loaded"
          :imageToEdit="prevCardType?.imageUrl"
          @selectImageFile="onImageSelected"
        ></SelectImage>
      </div>
      <InputText
        placeholder="Card Name"
        id="value"
        v-model="cardName"
        type="text"
        :class="{ 'p-invalid': cardNameError }"
      />
      <InputText
        placeholder="Card Price"
        id="price"
        v-model="cardPrice"
        type="text"
        :class="{ 'p-invalid': cardPriceError }"
        aria-describedby="text-error"
      />
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
import SelectImage from "@/components/selectImage.vue";
import {
  CardTypeService,
  type CardTypeDto,
  type CardProviderDto,
} from "@/backend/wallet";
import { inject, onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
const { handleSubmit, resetForm } = useForm();
const { value: cardName, errorMessage: cardNameError } = useField(
  "cardName",
  validateFieldName
);
const { value: cardPrice, errorMessage: cardPriceError } = useField(
  "cardPrice",
  validateFieldPrice
);

let file: File;
const dialogRef: any = inject("dialogRef");

const prevCardType: Ref<CardTypeDto | null | undefined> = ref(null);
const selectedCardProvider = ref<CardProviderDto | null>(null);
const selectedCardProviderId = ref<number | null>(null);
const loaded = ref<boolean>(false);
const route = useRoute();

function validateFieldName(value) {
  if (!value) {
    return "Company name is required.";
  }
  return true;
}

function validateFieldPrice(value) {
  if (!value) {
    return "Company name is required.";
  }
  return true;
}

onMounted(() => {
  const params = dialogRef.value.data;
  prevCardType.value = params.cardTypeDto;
  if (prevCardType.value) {
    cardName.value = prevCardType.value.name;
    cardPrice.value = prevCardType.value.price;
    selectedCardProvider.value = prevCardType.value!.cardProvider!;
    selectedCardProviderId.value = prevCardType.value!.cardProvider!.id!;
  } else {
    const paramId = route.params!.cardProviderId!;
    if (paramId) {
      selectedCardProviderId.value = parseInt(paramId as string);
    }
  }
  loaded.value = true;
});

const onSubmit = handleSubmit((values) => {
  const formData = new FormData();
  formData.append("file", file);
  // formData.append('name', values.value);
  const name: string = values.cardName;
  const price: number = values.cardPrice;

  if (prevCardType.value) {
    const cardProviderData = {
      id: prevCardType.value.id!,
      formData: {
        name: name ?? undefined,
        file: (file as Blob) ?? undefined,
        price: price ?? undefined,
        cardProviderId: selectedCardProviderId.value ?? undefined,
      },
    };
    CardTypeService.putCardType(cardProviderData).then(
      function (data) {
        dialogRef.value.close(data.statusCode);
      },
      function (errorMessage) {
        //Do something with the error message
      }
    );
  } else {
    const cardProviderData = {
      formData: {
        name: name,
        file: file,
        price: price,
        cardProviderId: selectedCardProviderId.value!,
      },
    };

    CardTypeService.postCardType(cardProviderData).then(
      function (data) {
        dialogRef.value.close(data.statusCode);
      },
      function (errorMessage) {
        //Do something with the error message
      }
    );
    resetForm();
  }
});

const onImageSelected = (imageFile: File) => {
  file = imageFile;
};
</script> -->
<template>
  <div></div>
</template>
