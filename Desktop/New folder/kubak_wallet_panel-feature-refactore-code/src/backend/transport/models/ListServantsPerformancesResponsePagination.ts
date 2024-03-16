/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListServantsPerformancesResponse } from './ListServantsPerformancesResponse';

export type ListServantsPerformancesResponsePagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListServantsPerformancesResponse> | null;
};
