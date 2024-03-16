/* eslint-disable prettier/prettier */
import { CountryService, type CreateOrUpdateCountryRequest } from "@/backend/auth";
import type { CountryDto } from "@/backend/transport";
import { defineStore } from "pinia";
import { toastStore } from "./toastStore";
import { ref } from "vue";

export const CountryStore = defineStore('country', () => {
  const countries = ref<CountryDto[]>([]);

  async function getAllCountries() {
    if (countries.value.length > 0) return countries.value
    await CountryService.getAdminCountries().then((Response) => {
      countries.value = Response;
    });
    return countries.value
  }
  async function addCountry(country: CreateOrUpdateCountryRequest, message?: {
    severity: string;
    summary: string;
  }) {
    await CountryService.createCountry({ requestBody: country }).then(() => {
      const toast = toastStore();
      toast.changeToastState({
        severity: message?.severity || "success",
        summary: message?.summary || "Success",
        type: "success",

      });
      countries.value = []
      getAllCountries()
    })
  }
  function deleteCountry(Id: number) {
    countries.value = []

    CountryService.deleteCountry({ id: Id }).then(() => {
      getAllCountries()
    })
  }
  async function editCountry(country, message?: {
    severity: string,
    summary: string,
  }) {
    await CountryService.updateCountry({ id: country.id, requestBody: country }).then(() => {
      countries.value = []

      getAllCountries()
      const toast = toastStore();
      toast.changeToastState({
        severity: message?.severity || "success",
        summary: message?.summary || "Success",
        type: "success",

      });
    })
  }
  return {
    countries,
    getAllCountries,
    addCountry,
    deleteCountry,
    editCountry
  }
})