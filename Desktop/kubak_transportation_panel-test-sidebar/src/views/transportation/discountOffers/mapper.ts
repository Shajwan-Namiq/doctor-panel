/* eslint-disable prettier/prettier */
import type { UserDto } from "@/backend/auth";
import type { ServiceDto } from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class ListDiscountOffers {
  page?: number;
  limit?: number;
  serviceIds?: Array<number>;
  userIds?: Array<string>;
  locationLng?: number;
  locationLat?: number;
  isActive?: boolean;
}

export class FilterDiscountOffersFilterRequestDto {
  page?: number | null;
  limit?: number | null;
  service?: Array<ServiceDto> | null;
  users?: UserDto[];
  locationLng?: number;
  locationLat?: number;
  isActive?: boolean | null;
}

createMap(
  mapper,
  FilterDiscountOffersFilterRequestDto,
  ListDiscountOffers,

  forMember(
    (s) => s.page,
    mapFrom((d) => d.page)
  ),
  forMember(
    (s) => s.limit,
    mapFrom((d) => d.limit)
  ),
  forMember(
    (s) => s.locationLng,
    mapFrom((d) => d.locationLng)
  ),
  forMember(
    (s) => s.locationLat,
    mapFrom((d) => d.locationLat)
  ),
  forMember(
    (s) => s.serviceIds,
    mapFrom((d) => d.service?.map((type) => type.id))
  ),
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.users?.map((x) => x.uid))
  ),
  forMember(
    (s) => s.isActive,
    mapFrom((d) => d.isActive)
  )
);

export function createMapperForListDiscountOffers(
  data: FilterDiscountOffersFilterRequestDto
): ListDiscountOffers {
  return mapper.map(
    data,
    FilterDiscountOffersFilterRequestDto,
    ListDiscountOffers
  );
}
