/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateOrUpdateTestPhonesRequest = {
    phone: string;
    otpCode: string;
    available?: boolean;
    validUntil?: string | null;
};
