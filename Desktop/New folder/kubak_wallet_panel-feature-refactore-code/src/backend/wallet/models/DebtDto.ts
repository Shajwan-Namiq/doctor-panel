/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtRecoveryDto } from './DebtRecoveryDto';
import type { DebtStatus } from './DebtStatus';
import type { DebtUpdateLogDto } from './DebtUpdateLogDto';
import type { UserDto } from './UserDto';
import type { WalletDto } from './WalletDto';

export type DebtDto = {
    createdAt?: string;
    updatedAt?: string;
    id?: string;
    amount?: number;
    creditorWalletId?: number;
    creditorWallet?: WalletDto;
    debtorWalletId?: number;
    debtorWallet?: WalletDto;
    status?: DebtStatus;
    updateLogs?: Array<DebtUpdateLogDto> | null;
    dueDate?: string | null;
    autoRecoverFromIncome?: boolean;
    debtRecoveries?: Array<DebtRecoveryDto> | null;
    description?: string | null;
    addedByUser?: UserDto;
};
