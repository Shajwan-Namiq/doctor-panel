/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OtpSmsStatus } from './OtpSmsStatus';

export type OtpDto = {
    code?: string | null;
    codeMessage?: string | null;
    status?: OtpSmsStatus;
    validUntil?: string;
    invalidUntil?: string;
};
