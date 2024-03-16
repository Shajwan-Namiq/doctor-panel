/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OtpDto } from './OtpDto';

export type OtpRequestDto = {
    id?: number;
    phoneNumber?: string | null;
    ip?: string | null;
    timestamp?: string;
    isSuccessful?: boolean;
    otp?: OtpDto;
};
