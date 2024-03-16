import type { LocationPoint } from "@/backend/auth";
import type { PaymentType } from "@/backend/transport";

export type CreateRequestModel = {
  userId?: string;
  origin?: LocationPoint;
  destinations?: Array<LocationPoint> | null;
  currentLocation?: LocationPoint;
  discountCodeId?: number | null;
  serviceId?: number;
  paymentType: PaymentType;
};
