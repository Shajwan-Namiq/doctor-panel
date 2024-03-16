/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TaskInvoice = {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    id?: number;
    rawTaskPrice?: number;
    discountAmount?: number;
    stopCompensation?: number;
    commission?: number;
    tip?: number;
    loan?: number;
    readonly totalTaskPrice?: number;
    paidWithCash?: number;
    paidWithBalance?: number;
    taskId?: number;
};
