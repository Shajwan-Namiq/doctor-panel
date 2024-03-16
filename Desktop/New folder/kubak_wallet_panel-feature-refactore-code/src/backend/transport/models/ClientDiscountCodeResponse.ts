/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountCodeStepResponse } from './DiscountCodeStepResponse';
import type { DiscountType } from './DiscountType';

export type ClientDiscountCodeResponse = {
    discountCodeId?: number;
    code?: string | null;
    totalValue?: number;
    totalMax?: number;
    type?: DiscountType;
    expireAt?: string;
    usageLimit?: number | null;
    steps?: Array<DiscountCodeStepResponse> | null;
    serviceTypesName?: Array<string> | null;
};
