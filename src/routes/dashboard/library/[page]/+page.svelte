<script lang="ts">
  import { onMount } from "svelte";
  import {
    getBookData,
    bookData,
    deleteData,
  } from "../../../../stores/libraryStore";
  import InsertButton from "$lib/components/InsertButton.svelte";
  import { goto } from "$app/navigation";
  import DeleteModal from "$lib/components/DeleteModal.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import { activeUrlStore } from "../../../../stores/activeUrlStore";
  import { page } from "$app/stores";

  onMount(() => {
    activeUrlStore.set("/dashboard/library/1");
  });

  export let data: any;
  let currentPage = 1;
  const pageSize = 8;
  let totalPages = 1;

  //pagination number with url
  onMount(() => {
    currentPage = +$page.params.page;
    fetchData();
  });

  async function fetchData() {
    let result = await getBookData(data.supabase, currentPage, pageSize);
    // Recalculate the total number of pages
    const totalItems = result.count || 0;
    totalPages = Math.ceil(totalItems / pageSize);
    // console.log($bookData);
  }
  onMount(fetchData);

  async function goToPage(page: number) {
    currentPage = page;
    await fetchData();
    goto(`/dashboard/library/${currentPage}`); // Update the URL
  }

  function AddData() {
    goto("/dashboard/create_book");
  }

  // delete data
  async function handleDelete(contactInfo_id: any) {
    try {
      await deleteData(contactInfo_id, data.supabase);
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      await fetchData();
    } catch (error) {
      console.error("Error deleting Information:", error);
    }
  }

  function calculateIndex(index: any) {
    return index + 1 + (currentPage - 1) * pageSize;
  }
</script>

<!-- table data -->
<div class="py-5" />
<div  dir="ltr" class="w-full max-w-screen-2xl mx-auto">
  <div class="flex justify-start">
    <InsertButton insertData={AddData} />
  </div>
  <!-- 
  <header class="px-5 py-4 border-b border-gray-200">
    <h2 class="font-semibold text-gray-800">کتێب</h2>
  </header> -->
  <div class=" bg-white shadow rounded-sm border border-gray-300">
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead class="bg-bg_color text-bg_main text-xs font-semibold uppercase">
          <tr>
            <th class="p-2 whitespace-nowrap w-20">
              <div class="font-semibold text-right px-2">#</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">وێنە</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">ناونیشان</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">کردار</div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-200">
          {#each $bookData as item, index (item.id)}
            <tr>
              <td class="p-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="font-medium text-gray-500 w-20 text-right px-2">
                    {calculateIndex(index)}
                  </div>
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-right">
                  <img
                    class="w-20 h-20 object-cover rounded"
                    src={`${import.meta.env.VITE_PUBLIC_SUPABASE_STORAGE_URL}/${
                      item.thumbnail
                    }`}
                    alt="thumbnail"
                  />
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-right text-base font-sans">
                  {item.title.slice(0, 44)}
                </div>
              </td>

              <td class="p-2 whitespace-nowrap">
                <div class="text-lg text-right">
                  <div class="flex justify-start items-center gap-2">
                    <button
                      on:click={() => {
                        goto(`/dashboard/library/detail/${item.id}`);
                      }}
                      class="text-gray-400 p-1 border border-gray-400 rounded flex gap-2"
                    >
                      گۆڕانکاری

                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#588157"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                    </button>

                    <DeleteModal itemIdToDelete={item.id} {handleDelete} />
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Add pagination -->
  <Pagination {currentPage} {totalPages} {goToPage} />
</div>
