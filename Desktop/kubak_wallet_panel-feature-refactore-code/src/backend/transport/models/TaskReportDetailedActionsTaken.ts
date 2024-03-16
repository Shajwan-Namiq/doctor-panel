/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskReportActionDto } from './TaskReportActionDto';

export type TaskReportDetailedActionsTaken = {
    id?: number;
    taskReportId?: number;
    actionId?: number;
    action?: TaskReportActionDto;
    panelUserId?: string | null;
    panelUserName?: string | null;
    panelUserPhoneNumber?: string | null;
    comment?: string | null;
    createdAt?: string;
};
