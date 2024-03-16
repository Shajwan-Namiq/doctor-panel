import { ServiceStore } from "@/stores/common/service";

export async function getAllServices() {
  const serviceStore = ServiceStore();
  if (!serviceStore.services || serviceStore.services.length === 0) {
    await serviceStore.getAllServices();
  }
  return serviceStore.services;
}
export async function getServiceById(id?: number) {
  if (!id) return null;
  const services = await getAllServices();
  return services ? services.find((service) => service.id === id) : undefined;
}
export async function getServicesByIds(ids?: number[]) {
  if (!ids || ids.length < 0) return [];
  const services = await getAllServices();
  if (!services || services.length < 0) return [];
  return services.filter((service) => ids.includes(service.id!));
}
