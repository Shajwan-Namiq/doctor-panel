/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletDto } from './WalletDto';
import type { WalletTransactionType } from './WalletTransactionType';

export type WalletTransactionDto = {
    id?: number;
    amount?: number;
    date?: string;
    description?: string | null;
    sourceWallet?: WalletDto;
    sourceWalletBalanceAfterChange?: number;
    destinationWallet?: WalletDto;
    destinationWalletBalanceAfterChange?: number;
    walletTransactionType?: WalletTransactionType;
};
