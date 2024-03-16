/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdateTaskCancellationPolicyMeasurementRequest } from './CreateUpdateTaskCancellationPolicyMeasurementRequest';
import type { RoleType } from './RoleType';

export type CreateUpdateTaskCancellationPolicyRequest = {
    cancellerRole: RoleType;
    measurements: Array<CreateUpdateTaskCancellationPolicyMeasurementRequest>;
};
