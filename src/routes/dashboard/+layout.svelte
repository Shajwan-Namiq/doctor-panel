<script>
  import Header from './Header.svelte'; 
  import Sidebar from './Sidebar.svelte';
  export let data;
</script>

<div>

  <Header {data} />
  <Sidebar  {data}/>
</div>

<div class="pl-[256px] pt-10">  
  <slot />
</div>


