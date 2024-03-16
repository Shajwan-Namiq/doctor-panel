/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountType } from './DiscountType';

export type CheckDiscountCodeResponse = {
    discountId?: number;
    value?: number;
    discountType?: DiscountType;
};
