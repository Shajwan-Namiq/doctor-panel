/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserTaskInvoice = {
    taskId?: number;
    serviceId?: number;
    servantFullName?: string | null;
    clientName?: string | null;
    servantAvatarUrl?: string | null;
    clientPhotoUrl?: string | null;
    rawTaskPrice?: number;
    discountAmount?: number;
    tip?: number;
    clientLoan?: number;
    totalPrice?: number;
    cashPay?: number;
    balancePay?: number;
    commission?: number;
    compensation?: number;
    message?: string | null;
    profit?: number;
};
