/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateDebtAdminRequest = {
    amount: number;
    autoRecoverFromIncome: boolean;
    dueDate?: string | null;
    description?: string | null;
    updateDescription: string;
};
