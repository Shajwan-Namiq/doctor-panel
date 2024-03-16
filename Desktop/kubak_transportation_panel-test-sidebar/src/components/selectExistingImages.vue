<template>
  <div class="grid container">
    <!-- Image Preview Section -->
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="image-preview">
        <SelectImage
          :imageUrl="getImage(viewImage)"
          @selectImageFile="(file) => onImageUpload(file)"
        />
      </div>
    </div>

    <!-- Image List Section -->
    <div class="col-12 lg:col-12 xl:col-12">
      <div class="image-list">
        <div class="image-list-container">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="image-container"
          >
            <button @click="confirmDelete(image?.id)" class="remove-button">
              <ion-icon name="trash-outline" class="icon-trash"></ion-icon>
            </button>
            <img
              :src="getImage(image?.fileUrl)"
              :alt="`Image for ${image?.id}`"
              class="image-style cursor-pointer"
              @click="selectImage(image)"
            />
          </div>
        </div>
        <Paginator
          :page="currentPage"
          :rows="pageLimit"
          :totalRecords="totalRecords"
          @page="onPageChange"
          pageCount
          class="paginator"
        />
      </div>
    </div>
  </div>

  <!-- Submit Button -->
  <div class="flex align-items-end justify-content-end pt-5">
    <Button @click="submit()"
      ><i class="pi pi-check-circle mr-2" style="font-size: 1rem"></i
      >{{ $t("buttons.send") }}</Button
    >
  </div>

  <!-- Dialog for delete confirmation -->
  <Dialog
    v-model:visible="visible"
    modal
    :header="$t('reusables.confirmation.header')"
    :style="{ width: '32rem' }"
    :breakpoints="{ lg: '50%', xl: '50%', '1199px': '75vw', '575px': '90vw' }"
  >
    <p class="m-0">{{ $t("table.deleteConfirmationMessage") }}</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="visible = false" text />
      <Button @click="removeImage" label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { UploadedFileService } from "@/backend/city";
import { changeFileToBase64 } from "@/composables/fileToBase64";
import { getImage } from "@/composables/getImage";
import { toastStore } from "@/stores/common/toastStore";
import { inject, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SelectImage from "./selectImage.vue";
import Paginator from "primevue/paginator";
import Dialog from "primevue/dialog";

const dialogRef: any = inject("dialogRef");
const images = ref<any>([]);
const { t } = useI18n();
const toast = toastStore();
const selectedImageUrl = ref<any>({});
const viewImage = ref(null);
const currentPage = ref<number>(0);
const totalRecords = ref<number>(0);
const pageLimit = ref<number>(10);
const visible = ref(false);
const imageIdToDelete = ref(null);

onMounted(async () => {
  const response = await dialogRef.value.data.imagesList;
  images.value = response.items || [];
  totalRecords.value = response.count;
});

// When selecting an existing image
function selectImage(file) {
  selectedImageUrl.value = file.fileUrl;
  viewImage.value = file?.fileUrl;
}

// When uploading a new image
const onImageUpload = (imageFile) => {
  viewImage.value = null;
  changeFileToBase64(imageFile).then((res) => {
    selectedImageUrl.value = {
      bytes: res,
      fileName: imageFile?.name,
      imageFile: imageFile,
    };
  });
};

// change the pagination
async function onPageChange(event) {
  currentPage.value = event.page + 1;
  await dialogRef.value?.options.emits?.changePageNumber(
    event.page,
    pageLimit.value
  );
  images.value = await dialogRef.value.data.imagesList.items; // return new data after changing the page number
}

// remove an existing image from db
const confirmDelete = (id) => {
  visible.value = true;
  imageIdToDelete.value = id;
};

async function removeImage() {
  if (imageIdToDelete.value === null) return;
  try {
    await UploadedFileService.deleteUploadedFiles({
      id: imageIdToDelete.value,
    });
    toast.changeToastState({
      severity: t("toasts.delete_success_header"),
      summary: t("toasts.delete_success_desc", {
        field: t("toasts.delete_success_message"),
      }),
      type: "success",
    });

    images.value = images.value.filter(
      (image) => image.id !== imageIdToDelete.value
    );
    imageIdToDelete.value = null;
    visible.value = false;
    dialogRef.value?.options.emits?.imageDeleted();
  } catch (error) {
    //
  }
}
// return the fileURL to showing in the main file
function submit() {
  dialogRef.value?.options.emits?.onUploadImage(selectedImageUrl);
  dialogRef.value.close();
}
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto;

  @media (min-width: 992px) {
    max-width: 900px;
  }
}

.image-preview {
  width: 400px;
  height: 400px;
  padding: 1rem;
  border: 1px solid var(--background-color-kubak);
  border-radius: 4px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.image-list {
  width: 300px;
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid var(--background-color-kubak);
  border-radius: 4px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 4px;
    background-color: var(--background-color-kubak);
  }
}

.image-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.image-container {
  width: 80px;
  height: 80px;
  position: relative;

  .remove-button {
    position: absolute;
    top: -14px;
    right: 0;
    border: none;
    background-color: red;
    cursor: pointer;
    padding: 0.9rem;
    border-radius: 50%;
    z-index: 2;
    background: transparent;

    .icon-trash {
      color: white;
      background-color: red;
      border-radius: 50%;
      padding: 0.4rem;
      font-size: 1rem;
      position: absolute;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.paginator {
  margin-top: 1rem;
}

@media (max-width: 991px) {
  .image-preview,
  .image-list {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .image-preview,
  .image-list {
    width: 100%;
  }
}
</style>
