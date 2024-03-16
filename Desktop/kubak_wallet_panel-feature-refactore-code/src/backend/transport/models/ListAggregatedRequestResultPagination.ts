/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListAggregatedRequestResult } from './ListAggregatedRequestResult';

export type ListAggregatedRequestResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListAggregatedRequestResult> | null;
};
