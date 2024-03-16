/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskReportDefinedProblemTranslationDto } from './TaskReportDefinedProblemTranslationDto';

export type TaskReportDefinedProblemDto = {
    id?: number;
    translations?: Array<TaskReportDefinedProblemTranslationDto> | null;
    role?: RoleType;
};
