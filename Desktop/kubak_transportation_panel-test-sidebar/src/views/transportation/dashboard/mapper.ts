import type { ServiceDto, StaticTypeEnum } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class dashboardFilterDto {
  startDate?: Date;
  endDate?: Date;
  service?: ServiceDto;
  type?: StaticTypeEnum;
}

export class rankedServantsFilter {
  tasksFromDate?: string;
  tasksTillDate?: string;
  serviceId?: number;
  limit?: number;
}
export class ChartDataFilter {
  serviceId!: number;
  startDate!: string;
  endDate!: string;
  type!: StaticTypeEnum;
}
export class cardCountsFilter {
  startAt?: string;
  endAt?: string;
}
export class passengersTasksFilter {
  fromDate?: string;
  toDate?: string;
  limit?: number;
}
createMap(
  mapper,
  dashboardFilterDto,
  rankedServantsFilter,
  forMember(
    (d) => d.tasksFromDate,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.tasksTillDate,
    mapFrom((s) => toUtc(s.endDate))
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.limit,
    mapFrom(() => 10)
  )
);
createMap(
  mapper,
  dashboardFilterDto,
  ChartDataFilter,
  forMember(
    (d) => d.startDate,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.endDate,
    mapFrom((s) => toUtc(s.endDate))
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.type,
    mapFrom((s) => s.type)
  )
);
createMap(
  mapper,
  dashboardFilterDto,
  cardCountsFilter,
  forMember(
    (d) => d.startAt,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => toUtc(s.endDate))
  )
);
createMap(
  mapper,
  dashboardFilterDto,
  passengersTasksFilter,
  forMember(
    (d) => d.fromDate,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.toDate,
    mapFrom((s) => toUtc(s.endDate))
  ),
  forMember(
    (d) => d.limit,
    mapFrom(() => 5)
  )
);

export function createMapForDashboardFilterToRankedServantsFilter(
  data: dashboardFilterDto
): rankedServantsFilter {
  return mapper.map(data, dashboardFilterDto, rankedServantsFilter);
}

export function createMapForDashboardFilterToChartDataFilter(
  data: dashboardFilterDto
): ChartDataFilter {
  return mapper.map(data, dashboardFilterDto, ChartDataFilter);
}
export function createMapForDashboardFilterToCardCountsFilter(
  data: dashboardFilterDto
): cardCountsFilter {
  return mapper.map(data, dashboardFilterDto, cardCountsFilter);
}
export function createMapForDashboardFilterToPassengersTasksFilter(
  data: dashboardFilterDto
): passengersTasksFilter {
  return mapper.map(data, dashboardFilterDto, passengersTasksFilter);
}
