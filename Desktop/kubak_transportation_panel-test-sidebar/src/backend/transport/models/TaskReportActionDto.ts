/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskReportActionTranslationDto } from './TaskReportActionTranslationDto';

export type TaskReportActionDto = {
    id?: number;
    isCloser?: boolean;
    order?: number;
    translations?: Array<TaskReportActionTranslationDto> | null;
};
