/* eslint-disable prettier/prettier */
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";
import type { DiscountOfferDto } from "@/backend/transport";
import { getServicesByIds } from "../services/getAllService";

export async function createMapperForDiscountOffersResponse(
  response: DiscountOfferDto
) {
  const mappedResponse = {
    type: response.type!,
    value: response.value ?? undefined,
    maxDiscountAmount: response.maxDiscountAmount ?? undefined,
    usageLimit: response.usageLimit ?? undefined,
    periods: response.periods ?? undefined,
    startFrom: toLocaleDateFormat(response.startFrom)!,
    validUntil: response.validUntil
      ? toLocaleDateFormat(response.validUntil)
      : null,
    users: response.users ?? undefined,
    service:
      response.serviceIds && response.serviceIds.length > 0
        ? await getServicesByIds(response.serviceIds).then((res) => res)
        : undefined,
    requirement: response.requirement ?? undefined,
    boundary:
      (response.boundary as Array<{ lat: number; lng: number }> | null) ??
      undefined,
    steps: response.steps!,
    continueBeyondFinalStep: response.continueBeyondFinalStep ?? undefined,
    stepTimeFrame: response.stepTimeFrame ?? undefined,
  };

  return mappedResponse;
}
