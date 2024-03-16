/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import {
  type ServiceDto,
  ServiceService,
  ServiceTypeService,
  type ServiceTypeDto,
  type CreateServiceTypeRequest,
  type UpdateServiceSettingsRequest,
} from "@/backend/transport";

export type RootState = {
  services: ServiceDto[] | undefined;
  serviceAreaTypes: [];
  serviceBaseType: [] | undefined;
  currentBaseTypeToEdit: object;
  serviceTypes: ServiceTypeDto[];
};

export const ServiceStore = defineStore("serviceStore", {
  state: () =>
    ({
      services: undefined,
      serviceAreaTypes: [],
      serviceBaseType: undefined,
      currentBaseTypeToEdit: {},
      serviceTypes: [],
    } as RootState),

  actions: {
    async getAllServices(newRequest?: boolean) {
      if (this.services && !newRequest) return this.services;

      await ServiceService.getServices({}).then((Response) => {
        this.services = Response as ServiceDto[];
      });
      return this.services;
    },

    async updateService(data) {
      await ServiceService.updateService({ id: data.id, requestBody: data });
      this.getAllServices(true);
    },
    async updateServiceSettings(
      id: number,
      data: UpdateServiceSettingsRequest
    ) {
      await ServiceService.updateServiceSettings({
        id: id,
        requestBody: data,
      }).then(() => {
        this.getAllServices(true);
      });
    },
    async updateServiceType(id, data) {
      await ServiceTypeService.updateServiceType({ id: id, requestBody: data });
      this.getAllServiceType();
    },
    async getAllServiceType() {
      await ServiceTypeService.listServiceTypes().then((Response) => {
        this.serviceTypes = Response;
      });
      return this.serviceTypes;
    },
    async createServiceType(data: CreateServiceTypeRequest) {
      await ServiceTypeService.createServiceType({
        requestBody: data,
      }).then(() => {
        this.getAllServiceType();
      });
    },

    addCurrentBaseType(service) {
      this.currentBaseTypeToEdit = service;
    },
  },
});
