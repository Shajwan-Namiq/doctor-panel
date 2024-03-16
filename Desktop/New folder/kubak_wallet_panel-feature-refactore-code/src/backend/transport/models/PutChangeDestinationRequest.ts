/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { ServantTaskPoint } from './ServantTaskPoint';

export type PutChangeDestinationRequest = {
    id?: string;
    isApproved?: boolean;
    location?: LngLat;
    localPoints?: Array<ServantTaskPoint> | null;
};
