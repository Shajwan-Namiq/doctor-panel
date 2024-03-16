/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type TaskStatusLogDto = {
    id?: number;
    status?: TaskStatusEnum;
    location?: LngLat;
    locationTitle?: string | null;
    date?: string;
};
