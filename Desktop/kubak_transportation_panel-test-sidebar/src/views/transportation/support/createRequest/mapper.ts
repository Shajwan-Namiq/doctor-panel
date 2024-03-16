import type { UserDto } from "@/backend/auth";
import {
  PaymentType,
  type DiscountCodeDto,
  type LngLat,
  type ServiceDto,
} from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateRequest {
  userId!: string;
  origin!: LngLat;
  destinations?: Array<LngLat> | null;
  currentLocation?: LngLat;
  discountCodeId?: number | null;
  serviceId!: number;
  paymentType!: PaymentType;
}
export class CreateRequestDto {
  user?: UserDto;
  origin?: LngLat;
  destinations?: Array<LngLat> | null;
  currentLocation?: LngLat;
  discountCode?: DiscountCodeDto;
  service?: ServiceDto;
  paymentType?: PaymentType;
}
createMap(
  mapper,
  CreateRequestDto,
  CreateRequest,
  forMember(
    (d) => d.userId,
    mapFrom((s) => s.user?.uid)
  ),
  forMember(
    (d) => d.discountCodeId,
    mapFrom((s) => s.discountCode?.id)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  ),
  forMember(
    (d) => d.paymentType,
    mapFrom((s) => s.paymentType ?? PaymentType.BALANCE)
  ),
  forMember(
    (d) => d.origin,
    mapFrom((s) => s.origin)
  ),
  forMember(
    (d) => d.destinations,
    mapFrom((s) => s.destinations)
  ),
  forMember(
    (d) => d.currentLocation,
    mapFrom((s) => s.currentLocation)
  )
);

export function mapCreateRequestToDto(
  request: CreateRequestDto
): CreateRequest {
  return mapper.map(request, CreateRequestDto, CreateRequest);
}
