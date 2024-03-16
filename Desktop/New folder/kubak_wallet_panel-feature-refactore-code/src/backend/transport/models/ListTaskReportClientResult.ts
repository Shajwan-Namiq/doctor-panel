/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskReportActionsTakenDto } from './TaskReportActionsTakenDto';
import type { TaskReportDefinedProblemDto } from './TaskReportDefinedProblemDto';

export type ListTaskReportClientResult = {
    taskId?: number;
    role?: RoleType;
    comment?: string | null;
    problems?: Array<TaskReportDefinedProblemDto> | null;
    actionsTaken?: Array<TaskReportActionsTakenDto> | null;
    isClosed?: boolean;
    createdAt?: string;
};
