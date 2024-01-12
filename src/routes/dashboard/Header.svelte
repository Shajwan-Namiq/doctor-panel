<script lang="ts">
   import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip } from 'flowbite-svelte';
</script>

 <nav class="bg-white border-b-2 px-4 py-2 flex items-center justify-between">
    
<div></div>

<div class="flex justify-center items-center">
  
<form action="/?/signout" method="POST">
      <button type="submit" class="flex items-center mr-4 hover:text-blue-100">
        <span class="inline-flex items-center gap-2 text-gray-400">
          Logout
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            /></svg
          >
        </span>
      </button>
    </form>
</div>   
</nav>
