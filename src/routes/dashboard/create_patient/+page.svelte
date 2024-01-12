<script lang="ts">
  import { Label, Input, Fileupload } from "flowbite-svelte";
  import { insertData } from "../../../stores/investigationsStore";
  import type { InvestigationsModel } from "../../../models/investigationsModel";
  import { goto } from "$app/navigation";
  //@ts-ignore
  import { isEmpty } from "validator";
  import { getRandomTextNumber } from "$lib/utils/generateRandomNumber";
  import FileUploadComponent from "$lib/components/fileUpload.svelte";
  import EditorComponent from "$lib/components/EditorComponent.svelte";

  export let data../create_investigation/$types.js;

  let showToast = false;
  let fileName: string;
  let imageFile: File | undefined;
  let isFormSubmitted = false;
  let sliderImagesFile: File[] = [];
  let carouselImages: any = undefined;

  let investigationsObject: InvestigationsModel = {
    images: [],
    thumbnail: "",
    title: "",
    long_description: "",
  };

  function handleFileUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files![0];
    imageFile = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      investigationsObject.thumbnail = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName = `investigation/${randomText}`; // Append random text to the file name
      // console.log(fileName);
    };

    reader.readAsDataURL(file);
  }

  function getImagesObject() {
    carouselImages = sliderImagesFile.map((image, i) => {
      const imgUrl = URL.createObjectURL(image);
      return {
        id: i,
        imgurl: imgUrl,
        name: image,
        attribution: "",
      };
    });
    //

    if (carouselImages.length <= 0) {
      carouselImages = undefined;
    }
  }

  //**dropzone**//
  function getAllImageFile(e: { detail: File[] }) {
    sliderImagesFile = e.detail;
    getImagesObject();
  } //**dropzone**//

  async function formSubmit() {
    let isValidinvestigationsObject = false;

    if (
      !isEmpty(investigationsObject.thumbnail) &&
      !isEmpty(investigationsObject.title) &&
      sliderImagesFile.length > 0
    ) {
      isValidinvestigationsObject = true;
    }

    if (!isValidinvestigationsObject) {
      isFormSubmitted = true;
      return;
    }

    showToast = true;
    // console.log("imageFile", imageFile);
    const response = await data.supabase.storage
      .from("image")
      .upload(`${fileName}`, imageFile!);
    investigationsObject.thumbnail = response.data?.path || "";

    if (sliderImagesFile.length > 0) {
      for (let image of sliderImagesFile) {
        const randomText = getRandomTextNumber();
        await data.supabase.storage
          .from("image")
          .upload(`investigation/${randomText}`, image!)
          .then((response) => {
            if (response.data) {
              investigationsObject.images.push(response.data.path);
            }
          });
      }
    }

    const imagesArray = investigationsObject.images.map(
      (image) => `"${image}"`
    );
    investigationsObject.images = `{${imagesArray.join(",")}}`;

    insertData(investigationsObject, data.supabase);

    resetForm();
    goto("/dashboard/investigation/1");
    setTimeout(() => {
      showToast = false;
    }, 1000);
  }

  function resetForm() {
    investigationsObject = {
      images: [],
      long_description: "",
      thumbnail: "",
      title: "",
    };
  }
</script>

<div>
  {#if showToast}
    <div
      class="bg-green-500 text-white text-center py-2 fixed bottom-0 left-0 right-0"
    >
      داتاکە بەسەرکەوتووی زیادکرا
    </div>
  {/if}
  <div class="max-w-screen-lg mx-auto py-10 px-4">
    <div class="flex justify-center py-10">
      <h1 class="text-2xl font-bold">زیادکردنی داتا</h1>
    </div>

    <div
         dir="ltr"
      class="grid grid-cols-2 gap-4 p-10 lg:p-20 border border-gray-300 rounded-lg"
    >
      <div class="col-span-2">
        <Label class="space-y-2 mb-2">
          <Label for="thumbnail" class="mb-2">زیادکردنی وێنە</Label>
          <Fileupload
            on:change={handleFileUpload}
            accept=".jpg, .jpeg, .png"
            class=" dark:bg-white "
          />

          {#if isFormSubmitted && !investigationsObject?.thumbnail?.trim()}
            <p class="error-message">Required</p>
          {/if}
        </Label>
      </div>

      <div class="col-span-2">
        <Label class="space-y-2 mb-2">
          <span>ناونیشان</span>
          <Input
            type="text"
            placeholder="Enter title"
            bind:value={investigationsObject.title}
            id="title"
            name="title"
          />
          {#if isFormSubmitted && !investigationsObject?.title?.trim()}
            <p class="error-message">Required</p>
          {/if}
        </Label>
      </div>

      <div class="col-span-2">
        <Label class="space-y-2 mb-8">
          <Label for="textarea-id" class="mb-2">ڕوونکردنەوە ی زیاتر</Label>
          <div class="pt-4 w-full">
            <EditorComponent
              langData={investigationsObject}
              {isFormSubmitted}
            />
          </div>
        </Label>
      </div>

      <!-- upload images -->
      <div class="col-span-2">
        <Label class="space-y-2 mb-2">
          <Label for="images" class="mb-2">هاوپێج کردنی وێنە</Label>
          <FileUploadComponent on:imageFilesChanges={getAllImageFile} />
          {#if isFormSubmitted && sliderImagesFile.length === 0}
            <p class="error-message">Required</p>
          {/if}
        </Label>
      </div>

      <!-- submit Form -->
      <div class="col-span-2">
        <div class="w-full flex justify-end pb-5">
          <button
            on:click|preventDefault={formSubmit}
            type="submit"
            class="bg-bg_color hover:bg-bg_color hover:opacity-95 hover:text-primary-dark text-white font-bold py-2 px-4 border border-primary-50 rounded-lg"
          >
            زیادکردن
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .error-message {
    color: red;
  }
</style>
