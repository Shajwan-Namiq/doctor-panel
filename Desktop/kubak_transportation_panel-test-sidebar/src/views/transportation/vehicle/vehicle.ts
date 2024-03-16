import { createTableDataStore } from "@/stores/DataTable/trans/TableDataStore";
export const vehicle = createTableDataStore("vehicleStore")();

vehicle.addDetail({ endPoint: "vehicle", isPagination: true })


export async function fetchVehicle() {
  await vehicle.fetchListData();
}

export async function filterVehicle(filter) {
  vehicle.filterParameter(filter);
}
fetchVehicle();
