/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type ManageTaskRequest = {
    status: TaskStatusEnum;
    specifiedRoute?: Array<LngLat> | null;
    cancelReasonId?: number | null;
};
