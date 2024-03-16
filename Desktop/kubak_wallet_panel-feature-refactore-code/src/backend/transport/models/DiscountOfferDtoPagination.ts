/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountOfferDto } from './DiscountOfferDto';

export type DiscountOfferDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<DiscountOfferDto> | null;
};
