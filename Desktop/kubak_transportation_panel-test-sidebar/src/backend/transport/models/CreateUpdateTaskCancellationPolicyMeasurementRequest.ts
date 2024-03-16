/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskCancellationPenaltyType } from './TaskCancellationPenaltyType';
import type { TaskCancellationPolicyMeasurementType } from './TaskCancellationPolicyMeasurementType';

export type CreateUpdateTaskCancellationPolicyMeasurementRequest = {
    measurementType?: TaskCancellationPolicyMeasurementType;
    penaltyType?: TaskCancellationPenaltyType;
    measurementValue?: number;
    penalizeId?: number;
};
