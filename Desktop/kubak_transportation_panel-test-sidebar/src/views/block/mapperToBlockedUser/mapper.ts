import type { UserDto } from "@/backend/auth";
import type { UserMiniDto } from "@/backend/city";
import type { ServiceTypeDto } from "@/backend/transport";
import { toLocaleDateFormat, toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";
import moment from "moment";

const mapper = createMapper({ strategyInitializer: classes() });

export class BlockServantRequest {
  serviceTypeId!: number;
  userId!: string;
  unblockedAt?: string | null;
}
export class BlockServantRequestDto {
  serviceType!: ServiceTypeDto;
  users!: UserDto;
  unblockedAt?: Date;
}
export class BlockServantListResponse {
  serviceTypeId!: number;
  userId!: string;
  unblockedAt?: string | null;
  blockedAt?: Date;
  blockedByUser?: UserMiniDto;
}

export class BlockServantListResponseDto {
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
export class ServantPerformanceFilterRequest {
  startAt?: string;
  endAt?: string;
  id!: number;
}
export class ServantPerformanceFilterRequestDto {
  startAt?: Date;
  endAt?: Date;
  id!: number;
}
createMap(
  mapper,
  BlockServantRequestDto,
  BlockServantRequest,
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
    mapFrom((s) => s.users?.uid)
  )
);
createMap(
  mapper,
  BlockServantListResponse,
  BlockServantRequest,
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
  BlockServantListResponse,
  BlockServantListResponseDto,
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
  ServantPerformanceFilterRequestDto,
  ServantPerformanceFilterRequest,
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

export function createMapBlockServantRequestDtoToBlockServantRequest(
  data: BlockServantRequestDto
): BlockServantRequest {
  return mapper.map(data, BlockServantRequestDto, BlockServantRequest);
}
export function createMapBlockServantListResponseToBlockServantListResponseDto(
  data: BlockServantListResponse[]
): BlockServantListResponseDto[] {
 
  const mappedData = mapper.mapArray(
    data,
    BlockServantListResponse,
    BlockServantListResponseDto
  );
 
  return mappedData;
}
export function createMapBlockServantListResponseToBlockServantRequest(
  data: BlockServantListResponse
): BlockServantRequest {
  return mapper.map(data, BlockServantListResponse, BlockServantRequest);
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
export function mapServantPerformanceRequest(
  data: ServantPerformanceFilterRequestDto
): ServantPerformanceFilterRequest {
  return mapper.map(
    data,
    ServantPerformanceFilterRequestDto,
    ServantPerformanceFilterRequest
  );
}
