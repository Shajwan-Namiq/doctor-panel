<script lang="ts">
  import type { PatientModel } from "../../../models/patientModel";
  import { onMount } from 'svelte';
  import { patientDataStore, getAllPatientData } from '../../../stores/patientStore';

  export let data: any;
let patientData:any=[];
  onMount(async () => {
    await getAllPatientData(data.supabase);
 patientData = $patientDataStore 
 
});
 
  const handleDetail = (patientId:number) => {
    console.log(`Detail patient with ID: ${patientId}`);
  };

  const handleDelete = (patientId:number) => {
    console.log(`Delete patient with ID: ${patientId}`);
  };
</script>

<style>
  @media (max-width: 640px) {
    .responsive-table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
</style>

<div class="responsive-table mx-4">
  <table class="min-w-full table-auto border-collapse ">
    <thead>
      <tr class="bg-gray-200 text-left">
          <th class="p-2 border">User Image</th>
          <th class="p-2 border">Card ID</th>
        <th class="p-2 border">Date Of Birth</th>
        <th class="p-2 border">Full Name</th>
        <th class="p-2 border">Gender</th>
        <th class="p-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each patientData as patient}
        <tr class="hover:bg-gray-100">
           <td class="p-2 border">
            <img src={patient.userImage} alt="User Image" class="w-8 h-8 rounded-full" />
          </td>
          <td class="p-2 border">{patient.cardId}</td>
           <td class="p-2 border">{patient.dateOfBirth}</td>
          <td class="p-2 border">{patient.fullName}</td>
          <td class="p-2 border">{patient.gender}</td>
        
    <td class="p-2 border">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    on:click={() => handleDetail(patient.id)}>
              Detail
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    on:click={() => handleDelete(patient.id)}>
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
