/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantTaskPoint } from './ServantTaskPoint';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type ServantUpdateTaskRequest = {
    status: TaskStatusEnum;
    localStoredRoute?: Array<ServantTaskPoint> | null;
    cancelReasonId?: number | null;
};
