/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletTransactionHistoryDto } from './WalletTransactionHistoryDto';

export type WalletTransactionHistoryDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<WalletTransactionHistoryDto> | null;
};
