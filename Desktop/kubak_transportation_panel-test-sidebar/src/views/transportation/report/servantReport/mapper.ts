import type { RegionDto } from "@/backend/auth";
import type { ServantDto, ServiceDto } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class ServantReportFilter {
  regionId?: number;
  serviceId?: number;
  createdFromDate?: string;
  createdTillDate?: string;
  tasksFromDate?: string;
  tasksTillDate?: string;
  minTask?: number;
  maxTask?: number;
  limit?: number;
  servantIds?: number[];
  paginated?: boolean;
  page?: number;
}
export class ServantReportFilterDto {
  region?: RegionDto;
  service?: ServiceDto;
  createdFromDate?: Date;
  createdTillDate?: Date;
  tasksFromDate?: Date;
  tasksTillDate?: Date;
  minTask?: number;
  maxTask?: number;
  limit?: number;
  servants?: ServantDto[];
  paginated?: boolean;
  page?: number;
}
createMap(
  mapper,
  ServantReportFilterDto,
  ServantReportFilter,
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.createdFromDate,
    mapFrom((s) => (s.createdFromDate ? toUtc(s.createdFromDate) : undefined))
  ),
  forMember(
    (d) => d.createdTillDate,
    mapFrom((s) => (s.createdTillDate ? toUtc(s.createdTillDate) : undefined))
  ),
  forMember(
    (d) => d.tasksFromDate,
    mapFrom((s) => (s.tasksFromDate ? toUtc(s.tasksFromDate) : undefined))
  ),
  forMember(
    (d) => d.tasksTillDate,
    mapFrom((s) => (s.tasksTillDate ? toUtc(s.tasksTillDate) : undefined))
  ),
  forMember(
    (d) => d.servantIds,
    mapFrom((s) => s.servants?.map((servant) => servant.id))
  ),
  forMember(
    (d) => d.minTask,
    mapFrom((s) => s.minTask)
  ),
  forMember(
    (d) => d.maxTask,
    mapFrom((s) => s.maxTask)
  ),
  forMember(
    (d) => d.limit,
    mapFrom((s) => s.limit)
  ),
  forMember(
    (d) => d.paginated,
    mapFrom((s) => s.paginated)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  )
);
export function mapServantReportFilterToServantReportFilterDto(
  source: ServantReportFilterDto
): ServantReportFilter {
  return mapper.map(source, ServantReportFilterDto, ServantReportFilter);
}
