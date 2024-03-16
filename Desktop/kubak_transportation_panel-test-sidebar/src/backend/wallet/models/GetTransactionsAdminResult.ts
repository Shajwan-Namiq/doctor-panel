/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletTransactionType } from './WalletTransactionType';

export type GetTransactionsAdminResult = {
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    amount?: number;
    description?: string | null;
    sourceWalletId?: number;
    sourceWalletUserId?: string | null;
    sourceWalletUserDisplayName?: string | null;
    sourceWalletUserPhotoUrl?: string | null;
    sourceWalletUserPhoneNumber?: string | null;
    destinationWalletId?: number;
    destinationWalletUserId?: string | null;
    destinationWalletUserDisplayName?: string | null;
    destinationWalletUserPhotoUrl?: string | null;
    destinationWalletUserPhoneNumber?: string | null;
    sourceWalletBalanceAfterChange?: number;
    destinationWalletBalanceAfterChange?: number;
    walletTransactionType?: WalletTransactionType;
};
