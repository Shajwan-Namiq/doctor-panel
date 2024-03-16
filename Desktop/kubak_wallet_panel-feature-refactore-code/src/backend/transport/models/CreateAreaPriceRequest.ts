/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaPriceDestinationType } from './AreaPriceDestinationType';
import type { LngLat } from './LngLat';

export type CreateAreaPriceRequest = {
    serviceId: number;
    destinationTypes: Array<AreaPriceDestinationType>;
    boundary: Array<LngLat>;
};
