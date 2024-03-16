/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListDebtsAdminResult } from './ListDebtsAdminResult';

export type ListDebtsAdminResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListDebtsAdminResult> | null;
};
