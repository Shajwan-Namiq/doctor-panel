/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtRecoveryType } from './DebtRecoveryType';
import type { WalletDto } from './WalletDto';

export type DebtRecoveryDto = {
    id?: string;
    recoveredAmount?: number;
    recoveryDate?: string;
    debtId?: string;
    type?: DebtRecoveryType;
    paidFromWalletId?: number;
    paidFromWallet?: WalletDto;
    description?: string | null;
};
