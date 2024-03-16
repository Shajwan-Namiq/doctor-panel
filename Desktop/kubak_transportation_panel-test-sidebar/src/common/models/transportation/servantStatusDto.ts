import type { Location } from "./location";

export interface Request {
  Address: string;
  AvatarUrl: string;
  Firstname: string;
  Lastname: string;
  PhoneNumber: string;
  ServantUserId: string;
  UpdatedAt: string;
  CurrentLocation: Location;
  Status: number;
  RegionId: number;
  ServantId: number;
}
