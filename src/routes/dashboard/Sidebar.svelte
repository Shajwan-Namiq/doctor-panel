<script>
	import { goto } from '$app/navigation';
     import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarDropdownItem, SidebarDropdownWrapper, Avatar } from 'flowbite-svelte';
  
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
   
 
 function navigateTo(path) {
    goto(path);
  }
</script>

 

<aside class="fixed top-0 left-0 h-full  w-[256px] overflow-auto bg-blue-800 ">
  <div class="flex flex-col items-center justify-center py-5">
    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeTSS-IfO-Yw-ZUQ2fVA2zMvtuq2pN3pf46A&usqp=CAU" size="lg" stacked></Avatar>
    <p class="text-gray-300 py-2">Dr.Sarah Ahmad</p>
</div>

  <div class="flex flex-col">
 <Sidebar >
  <SidebarWrapper class="bg-blue-800 " >
    <SidebarGroup>
      
<div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard')}>
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
  <span>Home</span>
</div>
     

   <SidebarDropdownWrapper label="Patient" class="text-white hover:bg-[#00000037]">
        <svelte:fragment slot="icon" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

 </svelte:fragment>
        <svelte:fragment slot="arrowup">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
  </svelte:fragment>
        <svelte:fragment slot="arrowdown">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
 </svelte:fragment>
      
         
     
 <div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/createPatient')}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
        <span>Create Patient</span>
</div>
      <div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/report')}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
        <span>Patient List</span>
</div>
   </SidebarDropdownWrapper>
      


<div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/laboratory')}>
    <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.8 489.8" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M264.5,188.9h33.6v34c0,20.3,16.4,36.7,36.7,36.7l0,0c20.3,0,36.7-16.4,36.7-36.7v-34h34c20.3,0,36.7-16.4,36.7-36.7l0,0 c0-20.3-16.4-36.7-36.7-36.7h-34V81.8c0-20.3-16.4-36.7-36.7-36.7l0,0c-20.3,0-36.7,16.4-36.7,36.7v33.6h-33.6 c-20.3,0-36.7,16.4-36.7,36.7l0,0C227.8,172.5,244.2,188.9,264.5,188.9z"></path> <path d="M489.1,225.1c-8.9,106.1-98,189.3-206.4,189.3c-114.3,0-207.2-92.9-207.2-207.2C75.5,98.7,158.7,9.7,264.8,0.8 C258.2,0.4,251.6,0,245,0C109.6,0,0,109.6,0,244.9s109.6,244.9,244.9,244.9s244.9-109.6,244.9-244.9 C489.8,238.3,489.4,231.7,489.1,225.1z"></path> </g> </g> </g> </g></svg>  
  <span>Laboratory</span>
</div>



<div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/scheduling')}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
  
  <span>Doctor Scheduling</span>
</div>


<div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/appointment')}>
   <svg class="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-8-7a1.5,1.5,0,1,0-1.5-1.5A1.5,1.5,0,0,0,12,12Zm3,2.21a5.35,5.35,0,0,0-6,0V16h6Z"></path></g></svg>      
  <span>Appointment</span>
</div>



<div class="flex justify-start gap-3 text-white hover:bg-[#00000037] p-2 cursor-pointer" on:click={() => navigateTo('/dashboard/report')}>
   <svg class="w-6 h-6" fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>report</title> <path d="M6 11h4v17h-4v-17zM22 16v12h4v-12h-4zM14 28h4v-24h-4v24z"></path> </g></svg>      
  <span>Report</span>
</div>

   
     
      
       
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
  </div>
</aside>