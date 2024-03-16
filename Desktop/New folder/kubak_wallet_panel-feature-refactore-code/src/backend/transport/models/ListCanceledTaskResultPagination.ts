/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListCanceledTaskResult } from './ListCanceledTaskResult';

export type ListCanceledTaskResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListCanceledTaskResult> | null;
};
