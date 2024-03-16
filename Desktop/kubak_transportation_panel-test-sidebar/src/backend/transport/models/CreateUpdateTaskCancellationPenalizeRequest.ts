/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskCancellationPenalizeType } from './TaskCancellationPenalizeType';
import type { TranslationRequest } from './TranslationRequest';

export type CreateUpdateTaskCancellationPenalizeRequest = {
    penalizeType: TaskCancellationPenalizeType;
    value: number;
    translations?: Array<TranslationRequest> | null;
};
