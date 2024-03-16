import type { Location } from "./location";

export interface Request {
  ServantUserId: string;
  CurrentLocation: Location;
  Status: number;
}
