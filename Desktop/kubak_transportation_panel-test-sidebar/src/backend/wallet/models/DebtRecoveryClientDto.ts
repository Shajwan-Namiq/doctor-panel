/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtRecoveryType } from './DebtRecoveryType';

export type DebtRecoveryClientDto = {
    id?: string;
    recoveredAmount?: number;
    recoveryDate?: string;
    debtId?: string;
    type?: DebtRecoveryType;
    paidFromWalletId?: number | null;
    paidFromWalletUserDisplayName?: string | null;
    paidFromWalletUserPhotoUrl?: string | null;
    recoveredByUserId?: string | null;
    recoveredByUserDisplayName?: string | null;
    recoveredByUserPhotoUrl?: string | null;
    description?: string | null;
};
