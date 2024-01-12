<script lang="ts">
  import { Label, Input, Fileupload } from "flowbite-svelte";
  import { updateData } from "../../../../../stores/libraryStore";
  import type { BookModel } from "../../../../../models/libraryModel";
  import { getRandomTextNumber } from "$lib/utils/generateRandomNumber";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  //@ts-ignore
  import { isEmpty } from "validator";

  let isImageLoading = true;
  export let data;
  let fileName: string;
  let fileName_pdf: string;
  let imageFile: File | undefined;
  let imageFile_pdf: File | undefined;
  let submitted = false;
  let showToast = false;
  let prevThumbnail: string = "";
  let prevPDF: string = "";
  let isFormSubmitted = false;

  let bookData: BookModel = {
    id: 0,
    title: "",
    thumbnail: "",
    pdf_url: "",
  };
  const id = $page.params.bookId;

  //**** get data from db and put it into the fields ****//
  async function getBookData() {
    const result = await data.supabase
      .from("book")
      .select("*")
      .eq("id", id)
      .single();

    bookData = {
      id: result.data?.id,
      title: result.data?.title,
      pdf_url: result.data?.pdf_url,
      thumbnail: `${import.meta.env.VITE_PUBLIC_SUPABASE_STORAGE_URL}/${
        result.data?.thumbnail
      }`,
    };
    isImageLoading = false;
    // console.log("bookData: ", bookData);
    prevThumbnail = result.data?.thumbnail;
    prevPDF = result.data?.pdf_url;

    return bookData;
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
      bookData.thumbnail = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName = `book/${randomText}`; // Append random text to the file name
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
      bookData.pdf_url = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName_pdf = `pdfFiles/${randomText}`;
    };

    reader.readAsDataURL(file);
  }

  //**Handle submit**//
  async function formSubmit() {
    let isValidPublishingObject = false;

    if (
      !isEmpty(bookData.thumbnail) &&
      bookData?.title?.length > 0 &&
      !isEmpty(bookData.pdf_url)
    ) {
      isValidPublishingObject = true;
    }

    if (isValidPublishingObject) {
      submitted = true;
      showToast = true;

      if (imageFile) {
        if (bookData.thumbnail) {
          await data.supabase.storage
            .from("image")
            .remove([bookData.thumbnail]);
        }

        const response = await data.supabase.storage
          .from("image")
          .upload(`${fileName}`, imageFile!);
        bookData.thumbnail = response.data?.path ?? "";
      } else {
        bookData.thumbnail = prevThumbnail;
      }

      //add pdf file to table

      if (imageFile_pdf) {
        if (bookData.pdf_url) {
          await data.supabase.storage.from("PDF").remove([bookData.pdf_url]);
        }

        const response_pdf = await data.supabase.storage
          .from("PDF")
          .upload(`${fileName_pdf}`, imageFile_pdf!);
        bookData.pdf_url = response_pdf.data?.path ?? "";
      } else {
        bookData.pdf_url = prevPDF;
      }

      updateData(bookData, data.supabase);

      setTimeout(() => {
        showToast = false;
        goto("/dashboard/library/1");
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
              accept=".jpg, .jpeg, .png"
              class=" dark:bg-white"
            />

            {#if isFormSubmitted && !bookData?.thumbnail?.trim()}
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
              bind:value={bookData.title}
              id="title"
              name="title"
            />
            {#if isFormSubmitted && !bookData?.title?.trim()}
              <p class="error-message">Required</p>
            {/if}
          </Label>
        </div>

        <div class="lg:col-span-2 pt-3">
          <Label class="space-y-2 ">
            <Label for="thumbnail" class="mb-2 ">زیادکردنی pdf</Label>
            <Fileupload
              on:change={handleFileUpload_pdf}
              accept=".pdf"
              class=" dark:bg-white"
            />

            {#if isFormSubmitted && !bookData?.pdf_url?.trim()}
              <p class="error-message">Required</p>
            {/if}
          </Label>
        </div>

        <!-- submit Form -->
        <div class="lg:col-span-2 mt-10"  dir="ltr">
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
            src={bookData.thumbnail}
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
