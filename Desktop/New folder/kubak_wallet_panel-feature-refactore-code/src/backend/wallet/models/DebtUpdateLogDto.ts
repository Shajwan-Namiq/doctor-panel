/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DebtStatus } from './DebtStatus';
import type { DebtUpdateChangeType } from './DebtUpdateChangeType';
import type { UserDto } from './UserDto';

export type DebtUpdateLogDto = {
    id?: string;
    updateDate?: string;
    updateByUserId?: string | null;
    updateByUser?: UserDto;
    changes?: Array<DebtUpdateChangeType> | null;
    oldAmount?: number;
    newAmount?: number;
    oldAutoRecoverFromIncome?: boolean;
    newAutoRecoverFromIncome?: boolean;
    oldDescription?: string | null;
    newDescription?: string | null;
    updateDescription?: string | null;
    oldStatus?: DebtStatus;
    newStatus?: DebtStatus;
    debtId?: string;
};
