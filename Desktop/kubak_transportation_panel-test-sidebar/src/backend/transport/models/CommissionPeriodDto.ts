/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DayOfWeek } from './DayOfWeek';

export type CommissionPeriodDto = {
    id?: number;
    commissionId?: number;
    start?: string;
    end?: string;
    value?: number;
    dayOfWeeks?: Array<DayOfWeek> | null;
};
