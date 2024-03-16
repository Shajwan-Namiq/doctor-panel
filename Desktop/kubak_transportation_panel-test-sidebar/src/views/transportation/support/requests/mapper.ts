import type {
  RegionDto,
  RequestStatusEnum,
  ServiceDto,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class RequestListFilter {
  startAt?: string;
  endAt?: string;
  regionId?: number;
  serviceId?: number;
  status?: RequestStatusEnum;
  page?: number;
}
export class RequestListFilterDto {
  startAt!: Date;
  endAt!: Date;
  region?: RegionDto;
  service?: ServiceDto;
  status?: RequestStatusEnum;
  page?: number;
}
createMap(
  mapper,
  RequestListFilterDto,
  RequestListFilter,
  forMember(
    (d) => d.startAt,
    mapFrom((s) => (s.startAt ? toUtc(s.startAt) : undefined))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.status,
    mapFrom((s) => s.status)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  )
);
export function createMapRequestListFilterDtoToRequestListFilter(
  data: RequestListFilterDto
): RequestListFilter {
  return mapper.map(data, RequestListFilterDto, RequestListFilter);
}
