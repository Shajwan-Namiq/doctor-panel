import { RegionStore } from "@/stores/common/region";

export async function getAllRegions() {
  const regionStore = RegionStore();
  if (!regionStore.regions || regionStore.regions.length === 0) {
    await regionStore.getAllRegion();
  }
  return regionStore.regions;
}
export async function getRegionById(id?: number) {
  if (!id) return null;
  const regions = await getAllRegions();
  return regions.find((region) => region.id === id);
}
export async function getRegionsByIds(ids?: number[]) {
  if (!ids || ids.length < 0) return [];
  const regions = await getAllRegions();
  if (!regions || regions.length < 0) return [];
  return regions.filter((region) => ids.includes(region.id!));
}
export function getExistingRegionsByIds(ids?: number[]) {
  if (!ids || ids.length < 0) return [];
  const regionStore = RegionStore();

  return regionStore.regions?.filter((region) => ids.includes(region.id!));
}
