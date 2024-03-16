/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListServiceHourlyStatisticResult } from './ListServiceHourlyStatisticResult';

export type ListServiceHourlyStatisticResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListServiceHourlyStatisticResult> | null;
};
