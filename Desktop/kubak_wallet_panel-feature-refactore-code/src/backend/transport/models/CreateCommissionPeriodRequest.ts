/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DayOfWeek } from './DayOfWeek';

export type CreateCommissionPeriodRequest = {
    value: number;
    start: string;
    end: string;
    dayOfWeeks?: Array<DayOfWeek> | null;
};
