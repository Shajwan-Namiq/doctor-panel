/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskCancellationPenalizeDto } from './TaskCancellationPenalizeDto';
import type { TaskCancellationPenaltyType } from './TaskCancellationPenaltyType';
import type { TaskCancellationPolicyMeasurementType } from './TaskCancellationPolicyMeasurementType';

export type TaskCancellationPolicyMeasurementDto = {
    id?: number;
    measurementType?: TaskCancellationPolicyMeasurementType;
    penaltyType?: TaskCancellationPenaltyType;
    measurementValue?: number;
    taskCancellationPolicyId?: number;
    penalizeId?: number;
    penalize?: TaskCancellationPenalizeDto;
};
