/* eslint-disable prettier/prettier */
import type { RegionDto } from "@/backend/auth";
import type { UserDto } from "@/backend/city";
import type {
  DiscountCodeSearchFieldEnum,
  DiscountCodeStepRequest,
  DiscountStepTimeFrame,
  DiscountType,
  ListDiscountUsageDiscountType,
  LngLat,
  ServiceDto,
} from "@/backend/transport";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateAndUpdateDiscountCode {
  code!: string;
  type!: DiscountType;
  steps!: Array<DiscountCodeStepRequest>;
  usageLimit?: number | null;
  startAt!: string;
  expireAt!: string;
  disabled!: boolean;
  isHidden!: boolean;
  serviceIds?: Array<number> | null;
  redeemBoundary?: Array<LngLat> | null;
  userIds?: Array<string> | null;
  stepTimeFrame?: DiscountStepTimeFrame;
}

export class CreateAndUpdateDiscountCodeDto {
  code!: string;
  type!: DiscountType;
  steps!: Array<DiscountCodeStepRequest>;
  usageLimit?: number | null;
  startAt!: Date;
  expireAt!: Date;
  disabled?: boolean;
  isHidden?: boolean;
  services?: Array<ServiceDto> | null;
  redeemBoundary?: Array<{ lat: number; lng: number }> | null;
  users?: Array<UserDto> | null;
  stepTimeFrame?: DiscountStepTimeFrame;
}

export class DiscountUsageFilterRequest {
  searchField?: DiscountCodeSearchFieldEnum;
  searchValue?: string;
  discountType?: ListDiscountUsageDiscountType;
  activeOnly?: boolean;
  regionId?: number;
  serviceId?: number;
  userId?: string;
  discountAmountLessThan?: number;
  discountAmountGreaterThan?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
}
export class DiscountUsageFilterRequestDto {
  searchField?: DiscountCodeSearchFieldEnum;
  searchValue?: string;
  discountType?: ListDiscountUsageDiscountType;
  activeOnly?: boolean;
  region?: RegionDto;
  service?: ServiceDto;
  user?: UserDto;
  discountAmountLessThan?: number;
  discountAmountGreaterThan?: number;
  startDate?: Date;
  endDate?: Date;
  page?: number;
}

createMap(
  mapper,
  CreateAndUpdateDiscountCodeDto,
  CreateAndUpdateDiscountCode,
  forMember(
    (s) => s.startAt,
    mapFrom((d) => toUtc(d.startAt))
  ),
  forMember(
    (s) => s.expireAt,
    mapFrom((d) => toUtc(d.expireAt))
  ),
  forMember(
    (s) => s.serviceIds,
    mapFrom((d) => d.services?.map((service) => service.id))
  ),
  forMember(
    (s) => s.redeemBoundary,
    mapFrom((d) => d.redeemBoundary)
  ),
  forMember(
    (s) => s.steps,
    mapFrom((d) => d.steps)
  ),
  forMember(
    (s) => s.code,
    mapFrom((d) => d.code)
  ),
  forMember(
    (s) => s.type,
    mapFrom((d) => d.type)
  ),
  forMember(
    (s) => s.type,
    mapFrom((d) => d.type)
  ),
  forMember(
    (s) => s.usageLimit,
    mapFrom((d) => d.usageLimit)
  ),
  forMember(
    (s) => s.disabled,
    mapFrom((d) => d.disabled)
  ),
  forMember(
    (s) => s.isHidden,
    mapFrom((d) => d.isHidden)
  ),
  forMember(
    (s) => s.stepTimeFrame,
    mapFrom((d) => d.stepTimeFrame)
  ),
  forMember(
    (s) => s.userIds,
    mapFrom((d) => d.users?.map((user) => user.uid))
  )
);

createMap(
  mapper,
  DiscountUsageFilterRequestDto,
  DiscountUsageFilterRequest,
  forMember(
    (s) => s.regionId,
    mapFrom((d) => d.region?.id)
  ),
  forMember(
    (s) => s.serviceId,
    mapFrom((d) => d.service?.id)
  ),
  forMember(
    (s) => s.userId,
    mapFrom((d) => d.user?.uid)
  ),
  forMember(
    (s) => s.startDate,
    mapFrom((d) => (d.startDate ? toUtc(d.startDate) : undefined))
  ),
  forMember(
    (s) => s.endDate,
    mapFrom((d) => (d.endDate ? toUtc(d.endDate) : undefined))
  ),
  forMember(
    (s) => s.page,
    mapFrom((d) => d.page)
  ),
  forMember(
    (s) => s.searchField,
    mapFrom((d) => d.searchField)
  ),
  forMember(
    (s) => s.searchValue,
    mapFrom((d) => d.searchValue)
  ),
  forMember(
    (s) => s.discountType,
    mapFrom((d) => d.discountType)
  ),
  forMember(
    (s) => s.activeOnly,
    mapFrom((d) => d.activeOnly)
  ),
  forMember(
    (s) => s.discountAmountLessThan,
    mapFrom((d) => d.discountAmountLessThan)
  ),
  forMember(
    (s) => s.discountAmountGreaterThan,
    mapFrom((d) => d.discountAmountGreaterThan)
  )
);

export function createMapperForCreateAndUpdateDiscountCode(
  data: CreateAndUpdateDiscountCodeDto
): CreateAndUpdateDiscountCode {
  return mapper.map(
    data,
    CreateAndUpdateDiscountCodeDto,
    CreateAndUpdateDiscountCode
  );
}
export function createMapperForDiscountUsageFilterRequest(
  data: DiscountUsageFilterRequestDto
): DiscountUsageFilterRequest {
  return mapper.map(
    data,
    DiscountUsageFilterRequestDto,
    DiscountUsageFilterRequest
  );
}
