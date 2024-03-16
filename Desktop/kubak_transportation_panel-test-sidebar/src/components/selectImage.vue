<template>
  <Button
    v-if="!imageUrl"
    outlined
    class="mb-2 w-full h-full align-items-center justify-content-center flex cursor-pointer"
    @click="onSelectFile()"
    :class="props.circle ? 'border-circle' : 'border-round-sm'"
  >
    <i class="pi pi-image" style="color: slateblue; font-size: 2.5rem"></i>
  </Button>
  <div v-if="imageUrl" class="w-full h-full cursor-pointer">
    <img
      :src="imageUrl"
      alt="image"
      class="w-full h-full"
      @click="onSelectFile()"
      style="object-fit: cover"
      :class="props.circle ? 'border-circle' : 'border-round-sm'"
    />
  </div>
  <input
    type="file"
    ref="fileInput"
    class="hidden"
    @change="imageSelectInput"
  />
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { onMounted, ref, type Ref, watch } from "vue";

const toast = useToast();
const imageUrl = ref<string | null>(null);

const props = defineProps(["circle", "imageToEdit", "imageUrl"]);
if (props.imageUrl) {
  imageUrl.value = props.imageUrl;
}
watch(
  () => props.imageUrl,
  () => {
    imageUrl.value = props.imageUrl;
  }
);
const emits = defineEmits(["selectImageFile"]);

const fileInput: Ref<any> = ref(null);

function onSelectFile() {
  fileInput.value.click();
}

onMounted(() => {
  if (
    props.imageToEdit ||
    props.imageToEdit === null ||
    props.imageToEdit === undefined
  ) {
    imageUrl.value = props.imageToEdit ?? null;
  }
});

function imageSelectInput(payload) {
  const file = payload.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    imageUrl.value = reader.result as string;

    emits("selectImageFile", file);
  };
  reader.onerror = (error) => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  };
}
</script>
