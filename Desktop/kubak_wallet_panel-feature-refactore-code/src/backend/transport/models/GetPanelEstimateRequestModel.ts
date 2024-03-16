/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';

export type GetPanelEstimateRequestModel = {
    userId: string;
    source: LngLat;
    destinations?: Array<LngLat> | null;
    discountCodeId?: number | null;
    serviceId: number;
};
