import type { UserDto } from "@/backend/auth";
import type { DiscountType, PeriodRequest } from "@/backend/transport";
import {
  toLocaleDateFormat,
  toLocaleTimeOnly,
  toUtc,
  toUtcTimeOnly,
} from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class UpdateDiscountRequest {
  type!: DiscountType;
  value!: number;
  maxDiscountAmount!: number;
  usageLimit?: number | null;
  periods?: Array<PeriodRequest> | null;
  startFrom!: string;
  validUntil?: string | null;
  userIds?: Array<string> | null;
}
export class UpdateDiscountRequestDto {
  type?: DiscountType;
  value?: number;
  maxDiscountAmount?: number;
  usageLimit?: number | null;
  periods?: Array<PeriodRequest> | null;
  startFrom?: Date;
  validUntil?: Date | null;
  users?: Array<UserDto> | null;
}

createMap(
  mapper,
  UpdateDiscountRequestDto,
  UpdateDiscountRequest,
  forMember(
    (d) => d.maxDiscountAmount,
    mapFrom((s) => s.maxDiscountAmount)
  ),
  forMember(
    (d) => d.periods,
    mapFrom((s) =>
      s.periods?.map((period) => {
        return {
          startTime: toUtcTimeOnly(period.startTime),
          endTime: toUtcTimeOnly(period.endTime),
        };
      })
    )
  ),
  forMember(
    (d) => d.startFrom,
    mapFrom((s) => (s.startFrom ? toUtc(s.startFrom) : undefined))
  ),
  forMember(
    (d) => d.type,
    mapFrom((s) => s.type)
  ),
  forMember(
    (d) => d.usageLimit,
    mapFrom((s) => s.usageLimit)
  ),
  forMember(
    (d) => d.validUntil,
    mapFrom((s) => (s.validUntil ? toUtc(s.validUntil) : undefined))
  ),
  forMember(
    (d) => d.value,
    mapFrom((s) => s.value)
  ),
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.users?.map((user) => user.uid))
  )
);
createMap(
  mapper,
  UpdateDiscountRequest,
  UpdateDiscountRequestDto,
  forMember(
    (d) => d.maxDiscountAmount,
    mapFrom((s) => s.maxDiscountAmount)
  ),
  forMember(
    (d) => d.periods,
    mapFrom((s) =>
      s.periods?.map((period) => {
        return {
          startTime: toLocaleTimeOnly(period.startTime),
          endTime: toLocaleTimeOnly(period.endTime),
        };
      })
    )
  ),
  forMember(
    (d) => d.startFrom,
    mapFrom((s) => (s.startFrom ? toLocaleDateFormat(s.startFrom) : undefined))
  ),
  forMember(
    (d) => d.type,
    mapFrom((s) => s.type)
  ),
  forMember(
    (d) => d.usageLimit,
    mapFrom((s) => s.usageLimit)
  ),
  forMember(
    (d) => d.validUntil,
    mapFrom((s) =>
      s.validUntil ? toLocaleDateFormat(s.validUntil) : undefined
    )
  ),
  forMember(
    (d) => d.value,
    mapFrom((s) => s.value)
  )
);
export function createMapperUpdateDiscountRequestDtoToRequest(
  source: UpdateDiscountRequestDto
): UpdateDiscountRequest {
  return mapper.map(source, UpdateDiscountRequestDto, UpdateDiscountRequest);
}

export function createMapperUpdateDiscountRequestToDto(
  source: UpdateDiscountRequest
): UpdateDiscountRequestDto {
  return mapper.map(source, UpdateDiscountRequest, UpdateDiscountRequestDto);
}
