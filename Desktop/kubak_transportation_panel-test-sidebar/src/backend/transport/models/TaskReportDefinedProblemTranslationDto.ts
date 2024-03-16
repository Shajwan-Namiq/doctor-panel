/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type TaskReportDefinedProblemTranslationDto = {
    id?: number;
    taskReportDefinedProblemId?: number;
    name?: string | null;
    description?: string | null;
    language?: Language;
};
