/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskStatusLogDto } from './TaskStatusLogDto';

export type TaskStopLogDetail = {
    logs?: Array<TaskStatusLogDto> | null;
    numberOfStops?: number;
    totalStopTimeInSecond?: number;
    stopCompensation?: number;
};
