import type { RegionDto } from "@/backend/auth";
import type {
  ServantSearchFieldEnum,
  ServantStatusEnum,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class ServantListFilter {
  searchField?: ServantSearchFieldEnum;
  status?: ServantStatusEnum;
  searchValue?: string;
  incompleteOnly?: boolean;
  regionId?: number;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
  createdFrom?: string;
  createdTo?: string;
}

export class ServantListFilterDto {
  searchField?: ServantSearchFieldEnum;
  status?: ServantStatusEnum;
  searchValue?: string;
  incompleteOnly?: boolean;
  region?: RegionDto;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
  createdFrom?: Date;
  createdTo?: Date;
}

createMap(
  mapper,
  ServantListFilterDto,
  ServantListFilter,
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.searchField,
    mapFrom((s) => s.searchField)
  ),
  forMember(
    (d) => d.status,
    mapFrom((s) => s.status)
  ),
  forMember(
    (d) => d.searchValue,
    mapFrom((s) => s.searchValue)
  ),
  forMember(
    (d) => d.incompleteOnly,
    mapFrom((s) => s.incompleteOnly)
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
    (d) => d.sortField,
    mapFrom((s) => s.sortField)
  ),
  forMember(
    (d) => d.sortDescending,
    mapFrom((s) => s.sortDescending)
  )
);

export function createMapServantListFilterDto(
  source: ServantListFilterDto
): ServantListFilter {
  return mapper.map(source, ServantListFilterDto, ServantListFilter);
}
