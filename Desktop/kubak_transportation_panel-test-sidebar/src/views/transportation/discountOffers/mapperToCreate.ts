/* eslint-disable prettier/prettier */

import type { UserDto } from "@/backend/city";
import type {
  DiscountOfferRequirementRequest,
  DiscountOfferStepRequest,
  DiscountType,
  LngLat,
  PeriodRequest,
  ServiceDto,
} from "@/backend/transport";
import {
  toLocaleTimeOnly,
  toUtc,
  toUtcTimeOnly,
} from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateAndUpdateDiscountOffers {
  type!: DiscountType;
  steps!: Array<DiscountOfferStepRequest>;
  periods?: Array<PeriodRequest> | null;
  usageLimit?: number | null;
  startFrom!: string;
  validUntil?: string | null;
  serviceIds?: Array<number> | null;
  userIds?: Array<string> | null;
  boundary?: Array<LngLat> | null;
  requirement?: DiscountOfferRequirementRequest;
  continueBeyondFinalStep?: boolean;
}

export class CreateAndUpdateDiscountOffersDto {
  type!: DiscountType;
  steps!: Array<DiscountOfferStepRequest>;
  periods?: Array<PeriodRequest> | null;
  usageLimit?: number | null;
  startFrom!: Date;
  validUntil?: Date | null;
  services?: Array<ServiceDto>;
  users?: Array<UserDto> | null;
  boundary?: Array<LngLat> | null;
  requirement?: DiscountOfferRequirementRequest;
  continueBeyondFinalStep?: boolean;
}

createMap(
  mapper,
  CreateAndUpdateDiscountOffersDto,
  CreateAndUpdateDiscountOffers,
  forMember(
    (s) => s.startFrom,
    mapFrom((d) => toUtc(d.startFrom))
  ),
  forMember(
    (s) => s.validUntil,
    mapFrom((d) => (d.validUntil ? toUtc(d.validUntil) : undefined))
  ),
  forMember(
    (s) => s.serviceIds,
    mapFrom((d) =>
      d.services
        ?.filter((service) => service.id != null)
        .map((service) => service.id)
    )
  ),
  forMember(
    (s) => s.boundary,
    mapFrom((d) => d.boundary)
  ),
  forMember(
    (s) => s.steps,
    mapFrom((d) => d.steps)
  ),
  forMember(
    (s) => s.type,
    mapFrom((d) => d.type)
  ),
  forMember(
    (s) => s.requirement,
    mapFrom((d) => {
      if (!d.requirement) {
        return undefined;
      }
      const { minTaskCount, maxRedemptions, taskCompletionTimeFrame } =
        d.requirement;

      // Return undefined if minTaskCount does not exist
      if (minTaskCount === undefined || minTaskCount === null) {
        return undefined;
      }

      // Map other fields if they exist
      return {
        minTaskCount: minTaskCount,
        maxRedemptions: maxRedemptions,
        taskCompletionTimeFrame: taskCompletionTimeFrame,
      };
    })
  ),

  forMember(
    (s) => s.periods,
    mapFrom((d) =>
      d.periods?.map((period) => {
        return {
          startTime: toUtcTimeOnly(period.startTime),
          endTime: toUtcTimeOnly(period.endTime),
        };
      })
    )
  ),
  
  forMember(
    (s) => s.usageLimit,
    mapFrom((d) => d.usageLimit)
  ),
  forMember(
    (s) => s.continueBeyondFinalStep,
    mapFrom((d) => d.continueBeyondFinalStep)
  ),
  forMember(
    (s) => s.userIds,
    mapFrom((d) => d.users?.map((user) => user.uid))
  )
);

export function createMapperForCreateAndUpdateDiscountOffers(
  data: CreateAndUpdateDiscountOffersDto
): CreateAndUpdateDiscountOffers {
  return mapper.map(
    data,
    CreateAndUpdateDiscountOffersDto,
    CreateAndUpdateDiscountOffers
  );
}
