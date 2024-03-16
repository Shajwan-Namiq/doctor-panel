/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { PaymentType } from './PaymentType';

export type PostNewRequest = {
    source: LngLat;
    destinations?: Array<LngLat> | null;
    initiationLocation: LngLat;
    discountCodeId?: number | null;
    serviceId: number;
    paymentType: PaymentType;
};
