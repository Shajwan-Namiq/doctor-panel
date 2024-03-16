/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListRequestResult } from './ListRequestResult';

export type ListRequestResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListRequestResult> | null;
};
