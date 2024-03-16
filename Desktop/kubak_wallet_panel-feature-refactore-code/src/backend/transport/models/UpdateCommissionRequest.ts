/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateCommissionPeriodRequest } from './CreateCommissionPeriodRequest';

export type UpdateCommissionRequest = {
    defaultValue: number;
    periods?: Array<CreateCommissionPeriodRequest> | null;
};
