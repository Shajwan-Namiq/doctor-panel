<!-- <template>
  <div class="card flex justify-content-center">
    <form
      @submit="onSubmit"
      class="flex flex-column gap-2 align-items-center justify-content-center"
    >
      <div class="flex flex-row gap-3 justify-center">
        <div class="h-10rem w-10rem">
          <SelectImage
            v-if="isLoaded"
            :imageToEdit="imageToEdit"
            @selectImageFile="onImageSelected"
          ></SelectImage>
        </div>
        <div
          class="flex flex-column gap-3 align-items-center justify-content-center"
        >
          <InputText
            placeholder="Company name"
            class="w-full"
            id="value"
            v-model="value"
            type="text"
            :class="{ 'p-invalid': errorMessage }"
            aria-describedby="text-error"
          />
          <Dropdown
            placeholder="Card Category"
            aria-required="true"
            v-model="selectedCardCategory"
            :options="colorsArray"
            class="w-full md:w-14rem"
          />
        </div>
      </div>
      <small class="p-error" id="text-error">{{
        errorMessage || "&nbsp;"
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
  CardCategoryEnum,
  CardProviderService,
  type CardProviderDto,
} from "@/backend/wallet";
import { inject, ref, type Ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField("value", validateField);

let file: File | null = null;
let blobFile: Blob | undefined;
const dialogRef: any = inject("dialogRef");
const selectedCardCategory: Ref<CardCategoryEnum | undefined | null> =
  ref(null);
const prevCardProvider: Ref<CardProviderDto | null | undefined> = ref(null);
const colorsArray: CardCategoryEnum[] = Object.values(CardCategoryEnum);
const route = useRoute();
const imageToEdit = ref<string | null>(null);
const isLoaded = ref<boolean>(false);

function validateField(value) {
  if (!value) {
    return "Company name is required.";
  }

  return true;
}

onMounted(() => {
  const params = dialogRef.value.data;
  prevCardProvider.value = params.cardProviderDto;
  if (prevCardProvider.value) {
    value.value = prevCardProvider.value.name;
    selectedCardCategory.value = prevCardProvider.value.cardCategory;
    imageToEdit.value = prevCardProvider.value.logoUrl!;
  }
  isLoaded.value = true;
});

const onSubmit = handleSubmit(async (values) => {
  if (values.value && values.value.length > 0) {
    const name: string = values.value;
    const cardProviderData = {
      id: prevCardProvider.value?.id!,
      formData: {
        name: name,
        file: file!,
        cardCategory: selectedCardCategory.value!,
      },
    };

    // file to blob

    if (prevCardProvider.value) {
      const cardProviderDataa = {
        id: prevCardProvider.value!.id!,
        formData: {
          name: name,
          file: file ?? undefined,
          cardCategory:
            selectedCardCategory.value == null
              ? prevCardProvider.value!.cardCategory
              : selectedCardCategory.value,
        },
      };
      CardProviderService.patchCardProvider(cardProviderDataa).then(
        function (data) {
          dialogRef.value.close(data.statusCode);
        },
        function (errorMessage) {
          //Do something with the error message
        }
      );
    } else {
      CardProviderService.postCardProvider(cardProviderData).then(
        function (data) {
          dialogRef.value.close(data.statusCode);
        },
        function (errorMessage) {
          //Do something with the error message
        }
      );
    }
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
