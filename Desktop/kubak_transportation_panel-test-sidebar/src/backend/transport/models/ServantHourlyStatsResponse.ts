/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantStats } from './ServantStats';

export type ServantHourlyStatsResponse = {
    day?: string;
    items?: Array<ServantStats> | null;
};
