/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { TripStatusEnum } from './TripStatusEnum';

export type TaskDetailLog = {
    status?: TripStatusEnum;
    location?: LngLat;
    date?: string;
};
