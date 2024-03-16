// import httpTrans from "@/plugins/httpTrans";
// import { ref } from "vue";
// import { createTableDataStore } from "@/stores/DataTable/trans/TableDataStore";

// export const passengerProfileData = ref()
// export function getPassengerData(phoneNumber: string) {
//   httpTrans.get(`user/${phoneNumber}/exists`).then((Response) => {
//     passengerProfileData.value = Response.data
//     passengerTasks.addDetail({ endPoint: `task/client/${passengerProfileData.value.User.Id}`, isPagination: true });
//   })
// }


// export const passengerTasks = createTableDataStore<{}, {}>("passengerTasksStore")();


// export async function fetchPassengerTasks() {
//   await passengerTasks.fetchListData();

// }
// export async function filterPassengerTasks(filter) {
//   await passengerTasks.filterParameter(filter)

// }
