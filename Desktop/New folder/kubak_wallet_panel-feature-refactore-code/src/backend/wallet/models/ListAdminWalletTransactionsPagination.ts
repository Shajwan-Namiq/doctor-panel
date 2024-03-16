/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListAdminWalletTransactions } from './ListAdminWalletTransactions';

export type ListAdminWalletTransactionsPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListAdminWalletTransactions> | null;
};
