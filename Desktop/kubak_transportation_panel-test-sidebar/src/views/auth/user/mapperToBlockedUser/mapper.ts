import type { UserMiniDto } from "@/backend/city";
import type { ServiceTypeDto } from "@/backend/transport";
import { toLocaleDateFormat, toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";
import moment from "moment";

const mapper = createMapper({ strategyInitializer: classes() });

export class BlockUserRequest {
  serviceTypeId!: number;
  unblockedAt?: string | null;
  userId!: string;
}
export class BlockUserRequestDto {
  serviceType?: ServiceTypeDto;
  unblockedAt?: Date;
  userIds!: string;
}
export class BlockUserListResponse {
  serviceTypeId!: number;
  userId!: string;
  unblockedAt?: string | null;
  blockedAt?: Date;
  blockedByUser?: UserMiniDto;
}

export class BlockUserListResponseDto {
  id?: number;
  serviceTypeId?: number;
  userId!: string | null;
  user?: UserMiniDto;
  blockedByUserId?: string | null;
  blockedByUser?: UserMiniDto;
  blockedAt?: Date;
  unblockedAt?: Date | null;
}
export class OnlinePeriodFilterRequest {
  startDate?: string;
  endDate?: string;
  excludeStartHour?: number;
  excludeEndHour?: number;
  id!: number;
  page?: number;
}
export class OnlinePeriodFilterRequestDto {
  startDate?: Date;
  endDate?: Date;
  excludeStartHour?: number;
  excludeEndHour?: number;
  id!: number;
  page?: number;
}
export class UserPerformanceFilterRequest {
  startAt?: string;
  endAt?: string;
  id!: number;
}
export class UserPerformanceFilterRequestDto {
  startAt?: Date;
  endAt?: Date;
  id!: number;
}
createMap(
  mapper,
  BlockUserRequestDto,
  BlockUserRequest,
  forMember(
    (d) => d.serviceTypeId,
    mapFrom((s) => s.serviceType?.id)
  ),
  forMember(
    (d) => d.unblockedAt,
    mapFrom((s) => (s.unblockedAt ? toUtc(s.unblockedAt) : undefined))
  ),
  forMember(
    (d) => d.userId,
    mapFrom((s) => s.userIds)
  )
);
createMap(
  mapper,
  BlockUserListResponse,
  BlockUserRequest,
  forMember(
    (d) => d.serviceTypeId,
    mapFrom((s) => s.serviceTypeId)
  ),
  forMember(
    (d) => d.unblockedAt,
    mapFrom((s) => (s.unblockedAt ? toUtc(s.unblockedAt) : undefined))
  ),
  forMember(
    (d) => d.userId,
    mapFrom((s) => s.userId)
  )
);
createMap(
  mapper,
  BlockUserListResponse,
  BlockUserListResponseDto,
  forMember(
    (d) => d.serviceTypeId,
    mapFrom((s) => s.serviceTypeId)
  ),
  forMember(
    (d) => d.userId,
    mapFrom((s) => s.userId)
  ),
  forMember(
    (d) => d.unblockedAt,
    mapFrom((s) =>
      s.unblockedAt ? toLocaleDateFormat(s.unblockedAt) : undefined
    )
  ),
  forMember(
    (d) => d.blockedAt,
    mapFrom((s) => (s.blockedAt ? toLocaleDateFormat(s.blockedAt) : undefined))
  ),
  forMember(
    (d) => d.blockedByUser,
    mapFrom((s) => s.blockedByUser)
  )
);

createMap(
  mapper,
  OnlinePeriodFilterRequestDto,
  OnlinePeriodFilterRequest,
  forMember(
    (d) => d.startDate,
    mapFrom((s) => (s.startDate ? toUtc(s.startDate) : undefined))
  ),
  forMember(
    (d) => d.endDate,
    mapFrom((s) => (s.endDate ? toUtc(s.endDate) : undefined))
  ),
  forMember(
    (d) => d.excludeStartHour,
    mapFrom((s) =>
      s.excludeStartHour
        ? parseInt(moment().hour(s.excludeStartHour)?.utc()?.format("HH"))
        : undefined
    )
  ),
  forMember(
    (d) => d.excludeEndHour,
    mapFrom((s) =>
      s.excludeEndHour
        ? parseInt(moment().hour(s.excludeEndHour)?.utc()?.format("HH"))
        : undefined
    )
  ),
  forMember(
    (d) => d.id,
    mapFrom((s) => s.id)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  )
);

createMap(
  mapper,
  UserPerformanceFilterRequestDto,
  UserPerformanceFilterRequest,
  forMember(
    (d) => d.startAt,
    mapFrom((s) => (s.startAt ? toUtc(s.startAt) : undefined))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  ),
  forMember(
    (d) => d.id,
    mapFrom((s) => s.id)
  )
);

export function createMapBlockUserRequestDtoToBlockUserRequest(
  data: BlockUserRequestDto
): BlockUserRequest {
  return mapper.map(data, BlockUserRequestDto, BlockUserRequest);
}
export function createMapBlockUserListResponseToBlockUserListResponseDto(
  data: BlockUserListResponse[]
): BlockUserListResponseDto[] {
  const mappedData = mapper.mapArray(
    data,
    BlockUserListResponse,
    BlockUserListResponseDto
  );

  return mappedData;
}
export function createMapBlockUserListResponseToBlockUserRequest(
  data: BlockUserListResponse
): BlockUserRequest {
  return mapper.map(data, BlockUserListResponse, BlockUserRequest);
}
export function mapOnlinePeriodRequest(
  data: OnlinePeriodFilterRequestDto
): OnlinePeriodFilterRequest {
  return mapper.map(
    data,
    OnlinePeriodFilterRequestDto,
    OnlinePeriodFilterRequest
  );
}
export function mapUserPerformanceRequest(
  data: UserPerformanceFilterRequestDto
): UserPerformanceFilterRequest {
  return mapper.map(
    data,
    UserPerformanceFilterRequestDto,
    UserPerformanceFilterRequest
  );
}
