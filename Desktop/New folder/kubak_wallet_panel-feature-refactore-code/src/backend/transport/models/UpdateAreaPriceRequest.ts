/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaPriceDestinationType } from './AreaPriceDestinationType';
import type { LngLat } from './LngLat';

export type UpdateAreaPriceRequest = {
    destinationTypes: Array<AreaPriceDestinationType>;
    boundary: Array<LngLat>;
};
