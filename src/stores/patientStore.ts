import { writable } from "svelte/store";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PatientModel } from "../models/patientModel";

export const patientDataStore = writable<PatientModel[]>();

//Get all data
export const getAllPatientData = async (supabase: SupabaseClient) => {
  const { data } = await supabase
    .from("personInformation")
    .select("*")
    .order("id");

  // console.log(data);
  patientDataStore.set(data as PatientModel[]);
};
