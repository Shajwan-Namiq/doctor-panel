/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationRequest } from './TranslationRequest';

export type CreateUpdateTaskReportActionRequest = {
    isCloser: boolean;
    translations?: Array<TranslationRequest> | null;
};
