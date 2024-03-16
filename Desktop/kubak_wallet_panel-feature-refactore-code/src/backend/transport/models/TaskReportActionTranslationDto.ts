/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type TaskReportActionTranslationDto = {
    id?: number;
    taskReportActionsTakenId?: number;
    name?: string | null;
    language?: Language;
};
