/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountCodeDto } from './DiscountCodeDto';

export type DiscountCodeDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<DiscountCodeDto> | null;
};
