/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';

export type ReportTaskRequest = {
    taskId: number;
    role: RoleType;
    definedProblemsId?: Array<number> | null;
    comment?: string | null;
};
