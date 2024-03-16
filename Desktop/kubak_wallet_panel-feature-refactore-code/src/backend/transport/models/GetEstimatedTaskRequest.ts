/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';

export type GetEstimatedTaskRequest = {
    origin: LocationPoint;
    destinations?: Array<LocationPoint> | null;
    discountCodeId?: number | null;
};
