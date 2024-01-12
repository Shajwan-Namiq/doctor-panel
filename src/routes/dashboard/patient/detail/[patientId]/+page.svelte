<script lang="ts">
  import { Label, Input, Fileupload } from "flowbite-svelte";
  import { updateData } from "../../../../../stores/magazineStore";
  import type { magazineModel } from "../../../../../models/magazineModel";
  import { getRandomTextNumber } from "$lib/utils/generateRandomNumber";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  //@ts-ignore
  import { isEmpty } from "validator";

  let isImageLoading = true;
  export let data../../../magazine/detail/[magazineId]/$types.js;
  let fileName: string;
  let fileName_pdf: string;
  let imageFile: File | undefined;
  let imageFile_pdf: File | undefined;
  let submitted = false;
  let showToast = false;
  let prevThumbnail: string = "";
  let prevPDF: string = "";
  let isFormSubmitted = false;

  let magazineData: magazineModel = {
    id: 0,
    title: "",
    thumbnail: "",
    pdf_url: "",
  };
  const id = $page.params.magazineId;

  //**** get data from db and put it into the fields ****//
  async function getBookData() {
    const result = await data.supabase
      .from("magazine")
      .select("*")
      .eq("id", id)
      .single();

    magazineData = {
      id: result.data?.id,
      title: result.data?.title,
      pdf_url: result.data?.pdf_url,
      thumbnail: `${import.meta.env.VITE_PUBLIC_SUPABASE_STORAGE_URL}/${
        result.data?.thumbnail
      }`,
    };
    isImageLoading = false;
    // console.log("magazineData: ", magazineData);
    prevThumbnail = result.data?.thumbnail;
    prevPDF = result.data?.pdf_url;
    // console.log("first", magazineData);
    return magazineData;
  }

  onMount(async () => {
    await getBookData();
  });

  //**for upload thumbnail image**//
  function handleFileUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files![0];
    imageFile = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      magazineData.thumbnail = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName = `magazine/${randomText}`; // Append random text to the file name
      // console.log(fileName);
    };

    reader.readAsDataURL(file);
  } //**for upload thumbnail image**//

  // handle pdf
  function handleFileUpload_pdf(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files![0];
    imageFile_pdf = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      magazineData.pdf_url = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName_pdf = `pdfFiles/${randomText}`;
    };

    reader.readAsDataURL(file);
  }

  //**Handle submit**//
  async function formSubmit() {
    let isValidPublishingObject = false;

    if (
      !isEmpty(magazineData.thumbnail) &&
      magazineData?.title?.length > 0 &&
      !isEmpty(magazineData.pdf_url)
    ) {
      isValidPublishingObject = true;
    }

    if (isValidPublishingObject) {
      submitted = true;
      showToast = true;

      if (imageFile) {
        if (magazineData.thumbnail) {
          await data.supabase.storage
            .from("image")
            .remove([magazineData.thumbnail]);
        }

        const response = await data.supabase.storage
          .from("image")
          .upload(`${fileName}`, imageFile!);
        magazineData.thumbnail = response.data?.path ?? "";
      } else {
        magazineData.thumbnail = prevThumbnail;
      }

      //add pdf file to table

      if (imageFile_pdf) {
        if (magazineData.pdf_url) {
          await data.supabase.storage
            .from("PDF")
            .remove([magazineData.pdf_url]);
        }

        const response_pdf = await data.supabase.storage
          .from("PDF")
          .upload(`${fileName_pdf}`, imageFile_pdf!);
        magazineData.pdf_url = response_pdf.data?.path ?? "";
      } else {
        magazineData.pdf_url = prevPDF;
      }

      updateData(magazineData, data.supabase);

      setTimeout(() => {
        showToast = false;
        goto("/dashboard/magazine/1");
      }, 1000);
    } else {
      isFormSubmitted = true;
      return;
    }
  }
</script>

<div>
  {#if showToast}
    <div
      class="bg-green-500 text-white text-center py-2 fixed bottom-0 left-0 right-0"
    >
      !گۆڕانکاریەکە بە سەرکەوتووی جێبەجێ کرا
    </div>
  {/if}
  <div class="max-w-screen-2xl mx-auto py-10">
    <div class="flex justify-center py-10">
      <h1 class="text-2xl font-bold">گۆڕینی داتا</h1>
    </div>

    <div
      dir="rtl"
      class="grid grid-cols-3 gap-4 p-10 lg:p-20 border border-gray-300 rounded-lg"
    >
      <div class="col-span-3 lg:col-span-2">
        <div class="lg:col-span-2">
          <Label class="space-y-2 mb-5">
            <Label for="thumbnail" class="mb-2">زیادکردنی وێنە</Label>
            <Fileupload
              on:change={handleFileUpload}
              accept=".jpg, .jpeg, .png, .svg"
              class=" dark:bg-white"
            />

            {#if isFormSubmitted && !magazineData?.thumbnail?.trim()}
              <p class="error-message">Required</p>
            {/if}
          </Label>
        </div>

        <div class="lg:col-span-2">
          <Label class="space-y-2 mb-5">
            <Label for="thumbnail" class="mb-2">ناونیشان</Label>
            <Input
              type="text"
              placeholder="Enter title"
              bind:value={magazineData.title}
              id="title"
              name="title"
            />
            {#if isFormSubmitted && !magazineData?.title?.trim()}
              <p class="error-message">Required</p>
            {/if}
          </Label>
        </div>

        <div class="lg:col-span-2 pt-3">
          <Label class="space-y-2 ">
            <Label for="thumbnail" class="mb-2">pdf زیادکردنی</Label>
            <Fileupload
              on:change={handleFileUpload_pdf}
              accept=".pdf"
              class=" dark:bg-white"
            />

            {#if isFormSubmitted && !magazineData?.pdf_url?.trim()}
              <p class="error-message">Required</p>
            {/if}
          </Label>
        </div>

        <!-- submit Form -->
        <div class="lg:col-span-2 mt-10" dir="ltr">
          <div class="w-full flex justify-end">
            <button
              on:click|preventDefault={formSubmit}
              type="submit"
              class="bg-bg_color hover:bg-bg_color hover:opacity-95 hover:text-primary-dark text-white font-bold py-2 px-4 border border-primary-50 rounded-lg"
            >
              گۆڕانکاری
            </button>
          </div>
        </div>
      </div>

      <div
        class="col-span-1 h-[300px] flex items-center justify-center bg-bg_color shadow-lg py-10 px-4 mt-7 rounded-lg"
      >
        {#if isImageLoading}
          <div class="spinner" />
        {:else}
          <img
            src={magazineData.thumbnail}
            class="h-full w-full object-contain rounded-lg"
          />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .error-message {
    color: red;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-top: 4px solid #000;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
