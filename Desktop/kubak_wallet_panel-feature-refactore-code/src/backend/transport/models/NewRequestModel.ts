/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { PaymentType } from './PaymentType';

export type NewRequestModel = {
    origin: LocationPoint;
    destinations?: Array<LocationPoint> | null;
    currentLocation: LocationPoint;
    discountCodeId?: number | null;
    serviceId: number;
    paymentType: PaymentType;
};
