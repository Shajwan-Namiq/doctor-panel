/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimeSpan } from './TimeSpan';

export type GetServantSessionItem = {
    startAt?: string;
    endAt?: string;
    diffInTime?: TimeSpan;
    totalPeriodInSeconds?: number;
};
