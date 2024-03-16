import type { Platform } from "@/backend/city";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class FilterToBlockUserList {
  appVersionFrom?: string;
  appVersionTo?: string;
  userIds?: Array<string>;
  deviceName?: string;
  platform?: Platform;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

export class FilterToBlockUserListDto {
  appVersionFrom?: string;
  appVersionTo?: string;
  userIds?: Array<string>;
  deviceName?: string;
  platform?: Platform;
  createdFrom?: Date;
  createdTo?: Date;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  FilterToBlockUserListDto,
  FilterToBlockUserList,
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.userIds)
  ),
  forMember(
    (d) => d.appVersionFrom,
    mapFrom((s) => s.appVersionFrom)
  ),
  forMember(
    (d) => d.appVersionTo,
    mapFrom((s) => s.appVersionTo)
  ),
  forMember(
    (d) => d.deviceName,
    mapFrom((s) => s.deviceName)
  ),
  forMember(
    (d) => d.platform,
    mapFrom((s) => s.platform)
  ),
  forMember(
    (d) => d.createdFrom,
    mapFrom((s) => (s.createdFrom ? toUtc(s.createdFrom) : undefined))
  ),
  forMember(
    (d) => d.createdTo,
    mapFrom((s) => (s.createdTo ? toUtc(s.createdTo) : undefined))
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

export function CreateMapToUserBlockListDto(
  source: FilterToBlockUserListDto
): FilterToBlockUserList {
  return mapper.map(source, FilterToBlockUserListDto, FilterToBlockUserList);
}
