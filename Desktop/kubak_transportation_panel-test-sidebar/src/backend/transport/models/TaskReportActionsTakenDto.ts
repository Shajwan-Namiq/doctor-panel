/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskReportActionDto } from './TaskReportActionDto';
import type { UserDto } from './UserDto';

export type TaskReportActionsTakenDto = {
    id?: number;
    taskReportId?: number;
    actionId?: number;
    action?: TaskReportActionDto;
    panelUser?: UserDto;
    comment?: string | null;
    createdAt?: string;
};
