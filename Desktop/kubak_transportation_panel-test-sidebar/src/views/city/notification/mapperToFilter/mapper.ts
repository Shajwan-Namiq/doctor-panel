import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class FilterNotification {
  startAt?: string;
  endAt?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

export class FilterNotificationDto {
  startAt?: Date;
  endAt?: Date;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  FilterNotificationDto,
  FilterNotification,
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
    (d) => d.startAt,
    mapFrom((s) => (s.startAt ? toUtc(s.startAt) : undefined))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  )
);

export function createMapToFilterNotificationDto(
  data: FilterNotificationDto
): FilterNotification {
  return mapper.map(data, FilterNotificationDto, FilterNotification);
}
