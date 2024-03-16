/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletDto } from './WalletDto';

export type WalletDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<WalletDto> | null;
};
