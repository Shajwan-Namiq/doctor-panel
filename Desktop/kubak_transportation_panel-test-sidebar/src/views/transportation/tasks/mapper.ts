import type { RegionDto, UserDto } from "@/backend/auth";
import type { BaseRoleDto, RoleType } from "@/backend/transport";
import type {
  DestinationType,
  ServantDto,
  ServiceDto,
  TaskStatusEnum,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class TaskFilterData {
  id?: number;
  randomId?: number;
  regionId?: number;
  serviceId?: number;
  servantId?: number;
  clientUserId?: string;
  startAt!: string;
  endAt!: string;
  status?: TaskStatusEnum;
  page?: number;
  cancellerRole?: RoleType;
  destinationType?: DestinationType;
}

export class TaskFilterDataDto {
  id?: number;
  randomId?: number;
  region?: RegionDto;
  service?: ServiceDto;
  servant?: ServantDto;
  user?: UserDto;
  startAt!: Date;
  endAt!: Date;
  status?: TaskStatusEnum;
  page?: number;
  cancellerRole?: RoleType;
  destinationType?: DestinationType;
  servantId?: number;
}
createMap(
  mapper,
  TaskFilterDataDto,
  TaskFilterData,
  forMember(
    (d) => d.id,
    mapFrom((s) => s.id)
  ),
  forMember(
    (d) => d.randomId,
    mapFrom((s) => s.randomId)
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
    mapFrom((s) => s.servantId ?? s.servant?.id)
  ),
  forMember(
    (d) => d.clientUserId,
    mapFrom((s) => s.user?.uid)
  ),
  forMember(
    (d) => d.startAt,
    mapFrom((s) => (s.randomId || s.id ? undefined : toUtc(s.startAt)))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.randomId || s.id ? undefined : toUtc(s.endAt)))
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
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.cancellerRole,
    mapFrom((s) => s.cancellerRole)
  )
);

export function createMapTaskFilterDtoToTaskFilter(
  data: TaskFilterDataDto
): TaskFilterData {
  const mappedData = mapper.map(data, TaskFilterDataDto, TaskFilterData);

  return mappedData;
}
