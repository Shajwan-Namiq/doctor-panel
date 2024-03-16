/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletTransactionType } from './WalletTransactionType';

export type ListAdminWalletTransactions = {
    id?: number;
    amount?: number;
    createdAt?: string;
    description?: string | null;
    walletId?: number;
    walletUserName?: string | null;
    walletTransactionType?: WalletTransactionType;
    byUserId?: string | null;
    byUserName?: string | null;
};
