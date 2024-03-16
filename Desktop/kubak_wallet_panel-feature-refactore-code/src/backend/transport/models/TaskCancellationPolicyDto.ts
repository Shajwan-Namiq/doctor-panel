/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskCancellationPolicyMeasurementDto } from './TaskCancellationPolicyMeasurementDto';

export type TaskCancellationPolicyDto = {
    id?: number;
    cancellerRole?: RoleType;
    crucialOrder?: number;
    measurements?: Array<TaskCancellationPolicyMeasurementDto> | null;
};
