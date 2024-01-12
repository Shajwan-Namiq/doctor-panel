import { writable } from "svelte/store";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { HomeModel } from "../models/homeModel";

export const homeStore = writable<HomeModel>();

//Get all data
export const getData = async (supabase: SupabaseClient) => {
  const { data } = await supabase.from("home_page").select("*").single();
  homeStore.set(data as HomeModel);
};

// Update data
export const updateData = async (
  updatedPageData: HomeModel,
  supabase: SupabaseClient
) => {
  try {
    const { data, error } = await supabase
      .from("home_page")
      .update(updatedPageData)
      .eq("id", updatedPageData.id);

    if (data) {
      homeStore.update((currentData) => {
        const updatedIndex = currentData.findIndex(
          (item) => item.id === updatedPageData.id
        );
        if (updatedIndex !== -1) {
          const newData = [...currentData];
          newData[updatedIndex] = updatedPageData;
          return newData;
        }
        return currentData || [];
      });
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
