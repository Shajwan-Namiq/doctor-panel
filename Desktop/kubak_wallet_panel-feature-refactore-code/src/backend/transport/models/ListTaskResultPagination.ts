/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListTaskResult } from './ListTaskResult';

export type ListTaskResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListTaskResult> | null;
};
