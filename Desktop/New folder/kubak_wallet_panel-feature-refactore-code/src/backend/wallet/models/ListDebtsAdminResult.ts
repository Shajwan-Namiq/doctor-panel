/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtStatus } from './DebtStatus';

export type ListDebtsAdminResult = {
    debtId?: string | null;
    amount?: number;
    recoveredAmount?: number;
    creditorWalletId?: number;
    creditorWalletUserDisplayName?: string | null;
    debtorWalletId?: number;
    debtorWalletUserDisplayName?: string | null;
    status?: DebtStatus;
    dueDate?: string | null;
    autoRecoverFromIncome?: boolean;
    description?: string | null;
    addedByUserDisplayName?: string | null;
};
