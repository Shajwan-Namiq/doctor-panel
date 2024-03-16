/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChangeDestinationRequestDto } from './ChangeDestinationRequestDto';
import type { DestinationClientDto } from './DestinationClientDto';
import type { Direction } from './Direction';
import type { DiscountType } from './DiscountType';
import type { LocationPoint } from './LocationPoint';
import type { PaymentType } from './PaymentType';
import type { RequestType } from './RequestType';
import type { TripStatusEnum } from './TripStatusEnum';

export type ActiveTripDataResponse = {
    servantCurrentLocation?: LocationPoint;
    servantUserId?: string | null;
    servantAvatarUrl?: string | null;
    servantFullName?: string | null;
    servantPhoneNumber?: string | null;
    vehicleName?: string | null;
    vehicleModel?: number;
    vehicleColor?: string | null;
    vehiclePlaqueNumber?: string | null;
    vehiclePlaqueCity?: string | null;
    vehiclePlaqueCountry?: string | null;
    clientUserId?: string | null;
    clientPhoneNumber?: string | null;
    clientName?: string | null;
    clientPhotoUrl?: string | null;
    requestId?: number;
    rawPrice?: number;
    stopCompensation?: number;
    loan?: number;
    userPrice?: number;
    paymentType?: PaymentType;
    discountedAmount?: number | null;
    discountValue?: number | null;
    discountType?: DiscountType;
    tripStatus?: TripStatusEnum;
    sourceLocation?: LocationPoint;
    sourceLocationName?: string | null;
    requestType?: RequestType;
    destinations?: Array<DestinationClientDto> | null;
    dynamicRoute?: Direction;
    taskId?: number | null;
    routeToClient?: Direction;
    distance?: number;
    duration?: number;
    changeDestinationRequest?: ChangeDestinationRequestDto;
};
