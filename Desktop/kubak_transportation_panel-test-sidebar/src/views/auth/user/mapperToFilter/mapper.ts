import type { UserSearchFieldEnum } from "@/backend/auth";
import type { RegionDto } from "@/backend/city";
import type { RoleDto } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class FilterFromUserList {
  roleId?: number;
  regionId?: number;
  createdFrom?: string;
  createdTo?: string;
  searchField?: UserSearchFieldEnum;
  searchValue?: string;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}

export class FilterFromUserListDto {
  role?: RoleDto;
  region?: RegionDto;
  createdFrom?: Date;
  createdTo?: Date;
  searchField?: UserSearchFieldEnum;
  searchValue?: string;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  FilterFromUserListDto,
  FilterFromUserList,
  forMember(
    (d) => d.roleId,
    mapFrom((s) => s.role?.id)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),

  forMember(
    (d) => d.searchField,
    mapFrom((s) => s.searchField)
  ),
  forMember(
    (d) => d.searchValue,
    mapFrom((s) => s.searchValue)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.sortDescending,
    mapFrom((s) => s.sortDescending)
  ),
  forMember(
    (d) => d.sortField,
    mapFrom((s) => s.sortField)
  ),
  forMember(
    (d) => d.createdFrom,
    mapFrom((s) => (s.createdFrom ? toUtc(s.createdFrom) : undefined))
  ),
  forMember(
    (d) => d.createdTo,
    mapFrom((s) => (s.createdTo ? toUtc(s.createdTo) : undefined))
  )
);

export function createMapForUserListFilterDto(
  source: FilterFromUserListDto
): FilterFromUserList {
  return mapper.map(source, FilterFromUserListDto, FilterFromUserList);
}
