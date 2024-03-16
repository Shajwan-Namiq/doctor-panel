import type { RegionDto } from "@/backend/auth";
import type { ServantDto } from "@/backend/transport";
import { toUtc, toUtcTimeOnly } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class OnlineHistoryFilterData {
  startDate!: string;
  endDate!: string;
  servantIds?: number[];
  includeStartHour?: string;
  includeEndHour?: string;
  calculateInTaskDuration?: boolean;
  regionId?: number;
  minHours?: number;
  page?: number;
  paginated?: boolean;
}

export class OnlineHistoryFilterDataDto {
  startDate!: Date;
  endDate!: Date;
  servants?: ServantDto[];
  includeStartHour?: string;
  includeEndHour?: string;
  region?: RegionDto;
  minHours?: number;
  page?: number;
  calculateInTaskDuration?: boolean;
  paginated?: boolean;
}
createMap(
  mapper,
  OnlineHistoryFilterDataDto,
  OnlineHistoryFilterData,
  forMember(
    (d) => d.startDate,
    mapFrom((s) => toUtc(s.startDate))
  ),
  forMember(
    (d) => d.endDate,
    mapFrom((s) => toUtc(s.endDate))
  ),
  forMember(
    (d) => d.servantIds,
    mapFrom((s) => s.servants?.map((servant) => servant.id))
  ),
  forMember(
    (d) => d.includeStartHour,
    mapFrom((s) =>
      s.includeStartHour ? toUtcTimeOnly(s.includeStartHour) : " "
    )
  ),
  forMember(
    (d) => d.includeEndHour,
    mapFrom((s) => (s.includeEndHour ? toUtcTimeOnly(s.includeEndHour) : ""))
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.minHours,
    mapFrom((s) => s.minHours)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.calculateInTaskDuration,
    mapFrom((s) => s.calculateInTaskDuration)
  ),
  forMember(
    (d) => d.paginated,
    mapFrom((s) => s.paginated)
  )
);

export function mapOnlineFilterDataDtoToOnlineFilterData(
  data: OnlineHistoryFilterDataDto
): OnlineHistoryFilterData {
  return mapper.map(data, OnlineHistoryFilterDataDto, OnlineHistoryFilterData);
}
