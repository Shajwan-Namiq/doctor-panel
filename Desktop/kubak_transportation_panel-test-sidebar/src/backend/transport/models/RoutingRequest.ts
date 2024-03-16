/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';

export type RoutingRequest = {
    origin: LngLat;
    destination: Array<LngLat>;
    direction?: number | null;
};
