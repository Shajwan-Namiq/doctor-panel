/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { PaymentType } from './PaymentType';

export type PanelCreateRequestForClientModel = {
    userId: string;
    origin: LngLat;
    destinations?: Array<LngLat> | null;
    currentLocation?: LngLat;
    discountCodeId?: number | null;
    serviceId: number;
    paymentType: PaymentType;
};
