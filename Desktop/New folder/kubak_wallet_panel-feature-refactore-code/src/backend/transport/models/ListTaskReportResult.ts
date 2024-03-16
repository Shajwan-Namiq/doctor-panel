/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskReportActionsTakenDto } from './TaskReportActionsTakenDto';
import type { TaskReportDefinedProblemDto } from './TaskReportDefinedProblemDto';

export type ListTaskReportResult = {
    id?: number;
    taskId?: number;
    taskRandomId?: number;
    role?: RoleType;
    reporterName?: string | null;
    problems?: Array<TaskReportDefinedProblemDto> | null;
    comment?: string | null;
    actionsTaken?: Array<TaskReportActionsTakenDto> | null;
    isClosed?: boolean;
    taskReportDate?: string;
};
