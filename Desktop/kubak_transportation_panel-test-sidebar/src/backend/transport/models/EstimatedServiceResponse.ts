/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountType } from './DiscountType';

export type EstimatedServiceResponse = {
    serviceId?: number;
    title?: string | null;
    description?: string | null;
    iconUrl?: string | null;
    price?: number;
    discountedPrice?: number | null;
    discountValue?: number | null;
    discountCodeType?: DiscountType;
};
