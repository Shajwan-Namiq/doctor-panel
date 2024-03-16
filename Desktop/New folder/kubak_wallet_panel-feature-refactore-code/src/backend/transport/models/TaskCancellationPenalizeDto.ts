/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskCancellationPenalizeTranslationDto } from './TaskCancellationPenalizeTranslationDto';
import type { TaskCancellationPenalizeType } from './TaskCancellationPenalizeType';

export type TaskCancellationPenalizeDto = {
    id?: number;
    penalizeType?: TaskCancellationPenalizeType;
    value?: number;
    translations?: Array<TaskCancellationPenalizeTranslationDto> | null;
};
