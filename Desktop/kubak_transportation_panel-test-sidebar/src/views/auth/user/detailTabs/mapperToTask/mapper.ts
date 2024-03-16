import type { RegionDto } from "@/backend/auth";
import type {
  DestinationType,
  ListTaskResult,
  ServantDto,
  ServiceDto,
  TaskStatusEnum,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class UsersListFilterTask {
  id?: number;
  regionId?: number;
  serviceId?: number;
  servantId?: number;
  clientUserId?: string;
  startAt?: string;
  endAt?: string;
  status?: TaskStatusEnum;
  destinationType?: DestinationType;
  page?: number;
  limit?: number;
  randomId?: number;
  belowStatus?: TaskStatusEnum;
}

export class GetUserListTaskDto {
  remainingItems?: number;
  count?: number;
  page?: number;
  limit?: number;
  metadata?: any;
  items?: Array<ListTaskResult> | null;
}

export class UserListFilterTaskDto {
  region?: RegionDto;
  service?: ServiceDto;
  servant?: ServantDto;
  clientUserId?: string;
  startAt?: Date;
  endAt?: Date;
  status?: TaskStatusEnum;
  destinationType?: DestinationType;
  page?: undefined;
  limit?: undefined;
  randomId?: undefined;
  belowStatus?: TaskStatusEnum;
}

createMap(
  mapper,
  UserListFilterTaskDto,
  UsersListFilterTask,
  forMember(
    (d) => d.clientUserId,
    mapFrom((s) => s.clientUserId)
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
    (d) => d.servantId,
    mapFrom((s) => s.servant?.id)
  ),
  forMember(
    (d) => d.status,
    mapFrom((s) => s.status)
  ),
  forMember(
    (d) => d.belowStatus,
    mapFrom((s) => s.belowStatus)
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
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.randomId,
    mapFrom((s) => s.randomId)
  ),
  forMember(
    (d) => d.limit,
    mapFrom((s) => s.limit)
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  )
);

export function CreateMapUserToUserListTaskListDto(
  source: UserListFilterTaskDto
): UsersListFilterTask {
  return mapper.map(source, UserListFilterTaskDto, UsersListFilterTask);
}
