/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListWalletResult } from './ListWalletResult';

export type ListWalletResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListWalletResult> | null;
};
