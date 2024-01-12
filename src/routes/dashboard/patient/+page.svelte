<script lang="ts">
  import { goto } from '$app/navigation';
  import DeleteModal from '$lib/components/DeleteModal.svelte';

  function handleDelete(id){}

  let items =[ 
  ]
</script>

 
  <div class="mx-4 bg-white shadow rounded-sm border border-gray-300">
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead class="bg-bg_color text-bg_main text-xs font-semibold uppercase">
          <tr>
            <th class="p-2 whitespace-nowrap w-20">
              <div class="font-semibold text-right px-2">IDCard</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">Image</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">FullName</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">Gender</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">phoneNumber</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-right">Action</div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-200">
          {#each items as item, index (item.id)}
            <tr>
              <td class="p-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="font-medium text-gray-500 w-20 text-right px-2">
                   index
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
                        goto(`/dashboard/magazine/detail/${item.id}`);
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


<style></style>