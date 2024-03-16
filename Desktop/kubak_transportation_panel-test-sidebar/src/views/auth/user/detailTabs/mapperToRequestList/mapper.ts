import type { RegionDto } from "@/backend/auth";
import type {
  DestinationType,
  RequestStatusEnum,
  ServiceDto,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class requestListFilterTask {
  userIds?: Array<string>;
  startAt?: string;
  endAt?: string;
  regionId?: number;
  serviceId?: number;
  status?: RequestStatusEnum;
  destinationType?: DestinationType;
  page?: number;
  limit?: number;
}

export class UserListFilterRequestTaskDto {
  userIds?: Array<string>;
  region?: RegionDto;
  service?: ServiceDto;
  startAt?: Date;
  endAt?: Date;
  status?: RequestStatusEnum;
  destinationType?: DestinationType;
  page?: undefined;
  limit?: undefined;
}

createMap(
  mapper,
  UserListFilterRequestTaskDto,
  requestListFilterTask,
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.userIds)
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
    (d) => d.destinationType,
    mapFrom((s) => s.destinationType)
  ),
  forMember(
    (d) => d.startAt,
    mapFrom((s) => (s.startAt ? toUtc(s.startAt) : undefined))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.limit,
    mapFrom((s) => s.limit)
  )
);

export function CreateMapUserToUserRequestListTaskListDto(
  source: UserListFilterRequestTaskDto
): requestListFilterTask {
  return mapper.map(
    source,
    UserListFilterRequestTaskDto,
    requestListFilterTask
  );
}
