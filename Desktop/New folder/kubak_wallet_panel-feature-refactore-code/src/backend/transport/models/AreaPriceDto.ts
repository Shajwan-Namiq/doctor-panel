/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaPriceRequestTypeDto } from './AreaPriceRequestTypeDto';
import type { LngLat } from './LngLat';

export type AreaPriceDto = {
    id?: number;
    order?: number;
    destinationTypes?: Array<AreaPriceRequestTypeDto> | null;
    boundary?: Array<LngLat> | null;
    serviceId?: number;
};
