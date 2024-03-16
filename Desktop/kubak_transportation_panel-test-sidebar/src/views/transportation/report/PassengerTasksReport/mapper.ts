import type { RegionDto, UserDto } from "@/backend/auth";
import type { ServiceDto, TaskStatusEnum } from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class PassengerTasksFilterData {
  regionId?: number;
  serviceId?: number;
  taskStatuses?: TaskStatusEnum[];
  fromDate?: string;
  toDate?: string;
  passengerUserIds?: Array<string>;
  paginated?: boolean;
  page?: number;
}
export class PassengerTasksFilterDataDto {
  region?: RegionDto;
  service?: ServiceDto;
  taskStatuses?: TaskStatusEnum[];
  fromDate!: Date;
  toDate!: Date;
  passengerUsers?: Array<UserDto>;
  paginated?: boolean;
  page?: number;
}
createMap(
  mapper,
  PassengerTasksFilterDataDto,
  PassengerTasksFilterData,
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
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.taskStatuses,
    mapFrom((s) => s.taskStatuses)
  ),
  forMember(
    (d) => d.paginated,
    mapFrom((s) => s.paginated)
  ),
  forMember(
    (d) => d.passengerUserIds,
    mapFrom((s) => s.passengerUsers?.map((u) => u.uid))
  )
);
export function createMapPassengerFilterDtoToPassengerFilter(
  data: PassengerTasksFilterDataDto
): PassengerTasksFilterData {
  return mapper.map(
    data,
    PassengerTasksFilterDataDto,
    PassengerTasksFilterData
  );
}
