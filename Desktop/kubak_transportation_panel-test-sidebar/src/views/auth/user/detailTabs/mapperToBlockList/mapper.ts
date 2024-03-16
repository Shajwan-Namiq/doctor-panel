import type { RegionDto } from "@/backend/auth";
import type { ServiceDto } from "@/backend/transport";
import type { UserDto } from "@/backend/wallet";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class FilterToBlockUsersList {
  userIds?: Array<string>;
  blockedFromDate?: string;
  blockedToDate?: string;
  unblockedAtFromDate?: string;
  unblockedAtToDate?: string;
  includeInactiveBlocks?: boolean;
  serviceTypeId?: number;
  regionId?: number;
  blockedByUserId?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

export class FilterToBlockUsersListDto {
  userIds?: Array<string>;
  blockedFromDate?: Date;
  blockedToDate?: Date;
  unblockedAtFromDate?: Date;
  unblockedAtToDate?: Date;
  includeInactiveBlocks?: boolean;
  service?: ServiceDto;
  region?: RegionDto;
  blockedByUser?: UserDto;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  FilterToBlockUsersListDto,
  FilterToBlockUsersList,
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.userIds)
  ),
  forMember(
    (d) => d.blockedByUserId,
    mapFrom((s) => s.blockedByUser?.uid)
  ),
  forMember(
    (d) => d.includeInactiveBlocks,
    mapFrom((s) => s.includeInactiveBlocks)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.serviceTypeId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.blockedFromDate,
    mapFrom((s) => (s.blockedFromDate ? toUtc(s.blockedFromDate) : undefined))
  ),
  forMember(
    (d) => d.blockedToDate,
    mapFrom((s) => (s.blockedToDate ? toUtc(s.blockedToDate) : undefined))
  ),
  forMember(
    (d) => d.unblockedAtFromDate,
    mapFrom((s) =>
      s.unblockedAtFromDate ? toUtc(s.unblockedAtFromDate) : undefined
    )
  ),
  forMember(
    (d) => d.unblockedAtToDate,
    mapFrom((s) =>
      s.unblockedAtToDate ? toUtc(s.unblockedAtToDate) : undefined
    )
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.limit,
    mapFrom((s) => s.limit)
  ),
  forMember(
    (d) => d.sortField,
    mapFrom((s) => s.sortField)
  ),
  forMember(
    (d) => d.sortDescending,
    mapFrom((s) => s.sortDescending)
  )
);

export function CreateMapToUsersBlockListDto(
  source: FilterToBlockUsersListDto
): FilterToBlockUsersList {
  return mapper.map(source, FilterToBlockUsersListDto, FilterToBlockUsersList);
}
