/* eslint-disable prettier/prettier */
import type { DiscountCodeDto } from "@/backend/transport";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";
import { getServicesByIds } from "../../services/getAllService";
import type { RegionDto } from "@/backend/auth";

export async function createMapperForDiscountCodeResponse(
  response: DiscountCodeDto
) {
  return {
    code: response.code!,
    type: response.type!,
    stepTimeFrame: response.stepTimeFrame ?? undefined,
    usageLimit: response.usageLimit,
    isHidden: response.isHidden,
    isActive: response.isActive,
    startAt: toLocaleDateFormat(response.startAt)!,
    expireAt: toLocaleDateFormat(response.expireAt)!,
    disabled: response.disabled,
    steps: response.steps!,
    service:
      response.serviceIds && response.serviceIds.length > 0
        ? await getServicesByIds(response.serviceIds).then((res) => res)
        : undefined,
    users: response.users ?? undefined,
    redeemBoundary:
      (response.redeemBoundary as Array<{ lat: number; lng: number }> | null) ??
      undefined,
  };
}
export function getRegionId(region: RegionDto) {
  return region.id;
}
