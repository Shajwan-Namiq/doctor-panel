/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RankedServantByTaskReport } from './RankedServantByTaskReport';

export type RankedServantByTaskReportPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<RankedServantByTaskReport> | null;
};
