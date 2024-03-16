import { defineStore } from "pinia";
import { RegionService } from "@/backend/auth/services/RegionService";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import { toastStore } from "./toastStore";

export type RootState = {
  regions: RegionDto[];
  currentRegionToEdit: object;
  currentCountry: { id: number; code: string };
  currentRegion: RegionDto;
  regionBoundaries: { lat: number; lng: number }[];
};

export const RegionStore = defineStore("region", {
  state: () => {
    return {
      currentRegionToEdit: {},
      currentCountry: { id: 0, code: "" },
      currentRegion: {} as RegionDto,
      regionBoundaries: [],
      regions: [],
    } as RootState;
  },

  actions: {
    async getAllRegion() {
      await RegionService.getAllRegions().then((Response) => {
        this.regions = Response;
      });

      return this.regions;
    },
    addNewRegionBoundaries(boundaries) {
      this.regionBoundaries = boundaries;
    },
    async addRegion(
      region,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      const newRegion = {
        boundary: this.regionBoundaries,
        countryId: region.countryId,
        name: region.name,
        location: region.location,
        translations: region.translations,
      };
      await RegionService.createRegion({ requestBody: newRegion }).then(() => {
        const toast = toastStore();
        toast.changeToastState({
          severity: message?.severity || "success",
          summary: message?.summary || "Success",
          type: "success",
        });
      });

      this.getAllRegion();
    },
    addCurrentCountry(country) {
      this.currentCountry = country;
    },
    deleteRegion(id: number) {
      RegionService.deleteRegion({ id: id }).then(() => {
        this.getAllRegion();
      });
    },
    async updateRegion(
      id: number,
      requestBody,
      message?: {
        severity: string;
        summary: string;
      }
    ) {
      await RegionService.updateRegion({
        id: id,
        requestBody: requestBody,
      }).then(() => {
        const toast = toastStore();
        toast.changeToastState({
          severity: message?.severity || "success",
          summary: message?.summary || "Success",
          type: "success",
        });
        this.getAllRegion();
      });
    },
    addCurrentRegion(region) {
      this.currentRegion = region;
    },
  },
});
