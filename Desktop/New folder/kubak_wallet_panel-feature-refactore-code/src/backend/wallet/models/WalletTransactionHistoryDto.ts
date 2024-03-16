/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransactionHistoryType } from './TransactionHistoryType';
import type { WalletDto } from './WalletDto';
import type { WalletTransactionDto } from './WalletTransactionDto';

export type WalletTransactionHistoryDto = {
    id?: number;
    amount?: number;
    date?: string;
    wallet?: WalletDto;
    walletTransaction?: WalletTransactionDto;
    walletTransactionType?: TransactionHistoryType;
};
