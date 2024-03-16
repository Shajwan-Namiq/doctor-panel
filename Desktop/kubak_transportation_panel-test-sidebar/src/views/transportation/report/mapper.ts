import type { RegionDto } from "@/backend/auth";
import type {
  RequestStatusEnum,
  ServiceDto,
  StaticTypeEnum,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class RequestReportsFilterData {
  regionId?: number;
  serviceId?: number;
  fromDate?: string;
  toDate?: string;
  statuses?: Array<RequestStatusEnum>;
}
export class RequestReportsFilterDataDto {
  region?: RegionDto;
  service?: ServiceDto;
  fromDate?: Date;
  toDate?: Date;
  statuses?: Array<RequestStatusEnum>;
}

createMap(
  mapper,
  RequestReportsFilterDataDto,
  RequestReportsFilterData,
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.fromDate,
    mapFrom((s) => toUtc(s.fromDate))
  ),
  forMember(
    (d) => d.toDate,
    mapFrom((s) => toUtc(s.toDate))
  ),
  forMember(
    (d) => d.statuses,
    mapFrom((s) => s.statuses)
  )
);
export function mapRequestFilterDtoToRequestFilter(
  data: RequestReportsFilterDataDto
): RequestReportsFilterData {
  return mapper.map(
    data,
    RequestReportsFilterDataDto,
    RequestReportsFilterData
  );
}
///// Chat Mapper /////

export class ChartFilterData {
  serviceId!: number;
  startDate!: string;
  endDate!: string;
  type!: StaticTypeEnum;
}
export class ChartFilterDataDto {
  service?: ServiceDto;
  startDate?: Date;
  endDate?: Date;
  type?: StaticTypeEnum;
}
createMap(
  mapper,
  ChartFilterDataDto,
  ChartFilterData,
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id ?? 0)
  ),
  forMember(
    (d) => d.startDate,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.endDate,
    mapFrom((s) => toUtc(s.endDate))
  ),
  forMember(
    (d) => d.type,
    mapFrom((s) => s.type)
  )
);
export function mapChartFilterDtoToChatFilter(
  data: ChartFilterDataDto
): ChartFilterData {
  return mapper.map(data, ChartFilterDataDto, ChartFilterData);
}
