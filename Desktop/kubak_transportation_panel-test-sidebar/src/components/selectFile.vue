<template>
  <Button
    v-if="!fileUrl"
    outlined
    class="mb-2 w-full h-9rem align-items-center justify-content-center flex cursor-pointer"
    @click="onSelectFile()"
  >
    <i class="pi pi-file-excel" style="color: slateblue; font-size: 2.5rem"></i>
  </Button>
  <div v-if="fileUrl" class="w-full h-9rem cursor-pointer">
    <p>{{ fileUrl }}</p>
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
import { ref, type Ref } from "vue";

const toast = useToast();
const fileUrl = ref<string | null>(null);
const emits = defineEmits(["selectFile"]);

const fileInput: Ref<any> = ref(null);
// defineExpose({ fileInput });

function onSelectFile() {
  fileInput.value.click();
}

function imageSelectInput(payload) {
  const file = payload.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    fileUrl.value = reader.result as string;
    emits("selectFile", file);
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
