/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskReportDefinedProblemDto } from './TaskReportDefinedProblemDto';
import type { TaskReportDetailedActionsTaken } from './TaskReportDetailedActionsTaken';

export type TaskReportDetail = {
    id?: number;
    taskId?: number;
    taskRandomId?: number;
    clientName?: string | null;
    clientPhoneNumber?: string | null;
    servantId?: number;
    servantName?: string | null;
    servantNumber?: string | null;
    role?: RoleType;
    problems?: Array<TaskReportDefinedProblemDto> | null;
    comment?: string | null;
    actionsTaken?: Array<TaskReportDetailedActionsTaken> | null;
    isClosed?: boolean;
};
