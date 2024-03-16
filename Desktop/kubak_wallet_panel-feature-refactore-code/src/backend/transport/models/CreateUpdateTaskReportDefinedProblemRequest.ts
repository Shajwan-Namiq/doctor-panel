/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdateTaskReportDefinedProblemTranslationRequest } from './CreateUpdateTaskReportDefinedProblemTranslationRequest';
import type { RoleType } from './RoleType';

export type CreateUpdateTaskReportDefinedProblemRequest = {
    translations?: Array<CreateUpdateTaskReportDefinedProblemTranslationRequest> | null;
    role: RoleType;
};
