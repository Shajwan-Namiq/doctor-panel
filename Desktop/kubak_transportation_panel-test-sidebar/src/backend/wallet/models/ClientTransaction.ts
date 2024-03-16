/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WalletTransactionType } from './WalletTransactionType';

export type ClientTransaction = {
    id?: number;
    amount?: number;
    date?: string;
    description?: string | null;
    walletTransactionType?: WalletTransactionType;
    walletBalanceAfterChange?: number;
    isOutgoing?: boolean;
    counterPartyUserId?: string | null;
    counterPartyUserDisplayName?: string | null;
};
