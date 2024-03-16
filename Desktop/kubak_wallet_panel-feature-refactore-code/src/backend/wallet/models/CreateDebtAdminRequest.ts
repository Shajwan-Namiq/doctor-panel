/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateDebtAdminRequest = {
    creditorWalletId: number;
    debtorWalletId: number;
    amount: number;
    autoRecoverFromIncome: boolean;
    dueDate?: string | null;
    description?: string | null;
};
