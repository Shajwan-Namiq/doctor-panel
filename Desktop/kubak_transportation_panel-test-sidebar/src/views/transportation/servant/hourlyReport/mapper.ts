import type { RegionDto } from "@/backend/auth";
import type { ServiceDto } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class ServantHourlyReportFilter {
  serviceId!: number;
  regionId?: number;
  startDateTime!: string;
  endDateTime!: string;
  page?: number;
}
export class ServantHourlyReportFilterDto {
  service!: ServiceDto;
  region?: RegionDto;
  startDateTime!: Date;
  endDateTime!: Date;
  page?: number;
}
createMap(
  mapper,
  ServantHourlyReportFilterDto,
  ServantHourlyReportFilter,
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service.id)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.startDateTime,
    mapFrom((s) => (s.startDateTime ? toUtc(s.startDateTime) : undefined))
  ),
  forMember(
    (d) => d.endDateTime,
    mapFrom((s) => (s.endDateTime ? toUtc(s.endDateTime) : undefined))
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  )
);
export function mapServantHourlyReportFilter(
  filterData: ServantHourlyReportFilterDto
): ServantHourlyReportFilter {
  return mapper.map(
    filterData,
    ServantHourlyReportFilterDto,
    ServantHourlyReportFilter
  );
}
