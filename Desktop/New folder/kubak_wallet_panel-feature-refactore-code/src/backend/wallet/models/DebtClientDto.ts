/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtRecoveryClientDto } from './DebtRecoveryClientDto';
import type { DebtStatus } from './DebtStatus';

export type DebtClientDto = {
    id?: string;
    amount?: number;
    creditorWalletId?: number;
    creditorWalletUserDisplayName?: string | null;
    creditorWalletUserPhotoUrl?: string | null;
    debtorWalletId?: number;
    debtorWalletUserDisplayName?: string | null;
    debtorWalletUserPhotoUrl?: string | null;
    status?: DebtStatus;
    dueDate?: string | null;
    autoRecoverFromIncome?: boolean;
    debtRecoveries?: Array<DebtRecoveryClientDto> | null;
    description?: string | null;
};
