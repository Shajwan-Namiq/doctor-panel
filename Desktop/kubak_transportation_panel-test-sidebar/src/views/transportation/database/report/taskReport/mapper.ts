import type { RegionDto } from "@/backend/auth";
import type { UserDto } from "@/backend/city";
import type { ServantDto, ServiceDto } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class TaskReportsFilter {
  regionId?: number;
  taskId?: number;
  taskRandomId?: number;
  taskReportActionId?: number;
  serviceId?: number;
  servantId?: number;
  clientUserId?: string;
  closed?: boolean;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}
export class TaskReportsFilterDto {
  region?: RegionDto;
  taskId?: number;
  taskRandomId?: number;
  taskReportActionId?: number;
  service?: ServiceDto;
  servant?: ServantDto;
  user?: UserDto;
  closed?: boolean;
  fromDate?: Date;
  toDate?: Date;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  TaskReportsFilterDto,
  TaskReportsFilter,
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.taskId,
    mapFrom((s) => s.taskId)
  ),
  forMember(
    (d) => d.taskRandomId,
    mapFrom((s) => s.taskRandomId)
  ),
  forMember(
    (d) => d.taskReportActionId,
    mapFrom((s) => s.taskReportActionId)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.servantId,
    mapFrom((s) => s.servant?.id)
  ),
  forMember(
    (d) => d.clientUserId,
    mapFrom((s) => s.user?.uid)
  ),
  forMember(
    (d) => d.closed,
    mapFrom((s) => s.closed)
  ),
  forMember(
    (d) => d.fromDate,
    mapFrom((s) => (s.fromDate ? toUtc(s.fromDate) : undefined))
  ),
  forMember(
    (d) => d.toDate,
    mapFrom((s) => (s.toDate ? toUtc(s.toDate) : undefined))
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

export function createMapTaskReportFilterDtoToTaskFilter(
  source: TaskReportsFilterDto
): TaskReportsFilter {
  return mapper.map(source, TaskReportsFilterDto, TaskReportsFilter);
}
