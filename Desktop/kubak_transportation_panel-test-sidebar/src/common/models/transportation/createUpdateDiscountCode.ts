import type {
  DiscountCodeStepRequest,
  DiscountType,
  LngLat,
} from "@/backend/transport";

export type CreateUpdateDiscountCodeRequest = {
  code: string;
  type: DiscountType;
  steps: Array<DiscountCodeStepRequest>;
  regionId?: number | undefined;
  usageLimit?: number | null;
  startAt: string;
  expireAt: string;
  disabled: boolean | undefined;
  isHidden: boolean | undefined;
  applicableZonePoint?: LngLat;
  applicableZoneRadius?: number | null;
};
