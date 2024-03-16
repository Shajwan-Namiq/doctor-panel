/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { RequestType } from './RequestType';
import type { TripStatusEnum } from './TripStatusEnum';

export type AggregatedRequest = {
    id?: number;
    taskId?: number | null;
    rawPrice?: number;
    userPrice?: number;
    sourceLocationName?: string | null;
    sourceLocation?: LngLat;
    type?: RequestType;
    statusEnum?: TripStatusEnum;
    createdAt?: string;
};
