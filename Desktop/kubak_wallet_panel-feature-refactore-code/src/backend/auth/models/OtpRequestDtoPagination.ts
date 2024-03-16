/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OtpRequestDto } from './OtpRequestDto';

export type OtpRequestDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<OtpRequestDto> | null;
};
