<script>
  import HomeCard from "$lib/components/HomeCard.svelte";
  import Container from "../../lib/components/Container.svelte";

</script>
<!-- <script lang="ts">
  import { Label, Input, Fileupload, Textarea } from "flowbite-svelte";
  import { updateData } from "../../stores/homeStore";
  import type { HomeModel } from "../../models/homeModel";
  import { getRandomTextNumber } from "$lib/utils/generateRandomNumber";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  //@ts-ignore
  import { isEmpty } from "validator";
  import { activeUrlStore } from "../../stores/activeUrlStore";

  onMount(() => {
    activeUrlStore.set("/dashboard");
  });

  let isImageLoading = true;
  export let data;
  let fileName: string;
  let fileName_footer: string;
  let imageFile: File | undefined;
  let imageFile_footer: File | undefined;
  let submitted = false;
  let showToast = false;
  let prevThumbnail_header: string = "";
  let prevThumbnail_footer: string = "";
  let isFormSubmitted = false;

  let about_Data: HomeModel = {
    id: 0,
    logo_header: "",
    logo_footer: "",
    url: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  };

  //**** get data from db and put it into the fields ****//
  async function getBookData() {
    const result = await data.supabase.from("home_page").select("*").single();

    about_Data = {
      id: result.data?.id,
      url: result.data?.url,
      youtube: result.data?.youtube,
      linkedin: result.data?.linkedin,
      facebook: result.data?.facebook,
      twitter: result.data?.twitter,
      instagram: result.data?.instagram,
      logo_header: `${import.meta.env.VITE_PUBLIC_SUPABASE_STORAGE_URL}/${
        result.data?.logo_header
      }`,
      logo_footer: `${import.meta.env.VITE_PUBLIC_SUPABASE_STORAGE_URL}/${
        result.data?.logo_footer
      }`,
    };

    isImageLoading = false;
    // console.log("bookData: ", bookData);
    prevThumbnail_header = result.data?.logo_header;
    prevThumbnail_footer = result.data?.logo_footer;

    // console.log(about_Data);
  }

  onMount(async () => {
    await getBookData();
  });

  //**for upload logo_header image**//
  function handleFileUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files![0];
    imageFile = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      about_Data.logo_header = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName = `logo/${randomText}`; // Append random text to the file name
      // console.log(fileName);
    };

    reader.readAsDataURL(file);
  } //**for upload logo_header image**//

  //**for upload logo_footer image**//
  function handleFileUpload_footer(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files![0];
    imageFile_footer = file;
    const reader = new FileReader();

    reader.onloadend = () => {
      about_Data.logo_footer = reader.result as "";
      const randomText = getRandomTextNumber(); // Generate random text
      fileName_footer = `logo/${randomText}`; // Append random text to the file name
    };

    reader.readAsDataURL(file);
  } //**for upload logo_footer image**//

  //**Handle submit**//
  async function formSubmit() {
    let isValidPublishingObject = false;

    if (
      !isEmpty(about_Data.logo_header) &&
      !isEmpty(about_Data.logo_footer) &&
      about_Data?.url?.length > 0
    ) {
      isValidPublishingObject = true;
    }

    if (isValidPublishingObject) {
      submitted = true;
      showToast = true;

      if (imageFile) {
        if (about_Data.logo_header) {
          await data.supabase.storage
            .from("image")
            .remove([about_Data.logo_header]);
        }

        const response = await data.supabase.storage
          .from("image")
          .upload(`${fileName}`, imageFile!);
        about_Data.logo_header = response.data?.path ?? "";
      } else {
        about_Data.logo_header = prevThumbnail_header;
      }

      if (imageFile) {
        if (about_Data.logo_footer) {
          await data.supabase.storage
            .from("image")
            .remove([about_Data.logo_footer]);
        }

        const response = await data.supabase.storage
          .from("image")
          .upload(`${fileName_footer}`, imageFile_footer!);
        about_Data.logo_footer = response.data?.path ?? "";
      } else {
        about_Data.logo_footer = prevThumbnail_footer;
      }
      // console.log(about_Data);
      updateData(about_Data, data.supabase);

      setTimeout(() => {
        showToast = false;
        goto("/library");
      }, 1000);
    } else {
      isFormSubmitted = true;
      return;
    }
  }
</script>

<div>
   here
  {#if showToast}
    <div
      class="bg-green-500 text-white text-center py-2 fixed bottom-0 left-0 right-0"
    >
      !گۆڕانکاریەکە بە سەرکەوتووی جێبەجێ کرا
    </div>
  {/if}
  <div class="max-w-screen-2xl mx-auto py-10 px-4">
    <div class="flex justify-center py-10">
      <h1 class="text-2xl font-bold">گۆڕینی داتا</h1>
    </div>

    <div
      dir="ltr"
      class="grid grid-cols-3 gap-4 p-10 lg:p-20 border border-gray-200 rounded-lg"
    >
      <div class="col-span-4 lg:col-span-4">
        <div class="flex lg:flex-row flex-col gap-4 lg:col-span-4">
          <div class="w-full">
            <div
              class="col-span-1 h-[300px] flex items-center border justify-center shadow-lg py-10 px-4 mt-7 rounded-lg"
            >
              {#if isImageLoading}
                <div class="spinner" />
              {:else}
                <img
                  src={about_Data.logo_header}
                  class="h-full w-full object-contain rounded-lg"
                />
              {/if}
            </div>

            <Label class="space-y-2 my-5">
              <Label for="thumbnail" class="mb-2">زیادکردنی لۆگۆی سەرەکی</Label>
              <Fileupload
                on:change={handleFileUpload}
                accept=".jpg, .jpeg, .png"
                class=" dark:bg-white"
              />

              {#if isFormSubmitted && !about_Data?.logo_header?.trim()}
                <p class="error-message">Required</p>
              {/if}
            </Label>
          </div>

          <div class="w-full">
            <div
              class="col-span-1 h-[300px] flex items-center justify-center shadow-lg py-10 px-4 mt-7 rounded-lg border"
            >
              {#if isImageLoading}
                <div class="spinner" />
              {:else}
                <img
                  src={about_Data.logo_footer}
                  class="h-full w-full object-contain rounded-lg"
                />
              {/if}
            </div>

            <Label class="space-y-2 my-5">
              <Label for="thumbnail" class="mb-2">زیادکردنی لۆگۆ</Label>
              <Fileupload
                on:change={handleFileUpload_footer}
                accept=".jpg, .jpeg, .png"
                class=" dark:bg-white"
              />

              {#if isFormSubmitted && !about_Data?.logo_footer?.trim()}
                <p class="error-message">Required</p>
              {/if}
            </Label>
          </div>
        </div>

        <div class="flex gap-4 lg:col-span-2">
          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">Facebook</Label>
              <Input
                type="text"
                placeholder="Enter facebook"
                bind:value={about_Data.facebook}
                id="facebook"
                name="facebook"
              />
            </Label>
          </div>

          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">Instagram</Label>
              <Input
                type="text"
                placeholder="Enter instagram"
                bind:value={about_Data.instagram}
                id="instagram"
                name="instagram"
              />
            </Label>
          </div>
        </div>

        <div class="flex gap-4 lg:col-span-2">
          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">Twitter</Label>
              <Input
                type="text"
                placeholder="Enter twitter"
                bind:value={about_Data.twitter}
                id="twitter"
                name="twitter"
              />
            </Label>
          </div>

          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">Linkedin</Label>
              <Input
                type="text"
                placeholder="Enter linkedin"
                bind:value={about_Data.linkedin}
                id="linkedin"
                name="linkedin"
              />
            </Label>
          </div>
        </div>

        <div class="flex gap-4 lg:col-span-2">
          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">Youtube</Label>
              <Input
                type="text"
                placeholder="Enter youtube"
                bind:value={about_Data.youtube}
                id="youtube"
                name="youtube"
              />
            </Label>
          </div>

          <div class="w-full">
            <Label class="space-y-2 mb-5">
              <Label for="thumbnail" class="mb-2">لینکی ماڵپەڕ</Label>
              <Input
                type="text"
                placeholder="Enter title"
                bind:value={about_Data.url}
                id="title"
                name="title"
              />
              {#if isFormSubmitted && !about_Data?.url?.trim()}
                <p class="error-message">Required</p>
              {/if}
            </Label>
          </div>
        </div>
        
        <div class="lg:col-span-2 mt-10" dir="ltr">
          <div class="w-full flex justify-end">
            <button
              on:click|preventDefault={formSubmit}
              type="submit"
              class="bg-bg_colsor hover:bg-bg_color hover:opacity-95 hover:text-primary-dark text-white font-bold py-2 px-4 border border-primary-50 rounded-lg"
            >
              گۆڕانکاری
            </button>
          </div>
        </div>
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
</style> -->


<div class="mx-4 ">
  <HomeCard />
  <Container />
</div>
