/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetTransactionsAdminResult } from './GetTransactionsAdminResult';

export type GetTransactionsAdminResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<GetTransactionsAdminResult> | null;
};
