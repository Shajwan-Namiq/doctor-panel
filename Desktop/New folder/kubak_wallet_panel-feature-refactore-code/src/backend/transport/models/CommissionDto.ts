/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommissionPeriodDto } from './CommissionPeriodDto';

export type CommissionDto = {
    id?: number;
    defaultValue?: number;
    serviceId?: number;
    periods?: Array<CommissionPeriodDto> | null;
};
