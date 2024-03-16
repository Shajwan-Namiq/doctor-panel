/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListServantsResult } from './ListServantsResult';

export type ListServantsResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListServantsResult> | null;
};
