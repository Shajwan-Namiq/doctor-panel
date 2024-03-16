import type { Gender } from "@/backend/auth";
import type { Location } from "./location";

export interface Request {
  clientId: string;
  clientName: string;
  clientPhoneNumber: string;
  clientPhotoUrl: string;
  gender: Gender;
  requestLocation: Location;
  tripStatus: number;
  requestId: number;
}
