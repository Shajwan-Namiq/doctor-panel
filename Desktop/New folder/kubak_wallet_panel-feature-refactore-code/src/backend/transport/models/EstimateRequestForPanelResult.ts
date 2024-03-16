/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { DiscountType } from './DiscountType';

export type EstimateRequestForPanelResult = {
    directions?: Array<Direction> | null;
    serviceId?: number;
    estimatedPrice?: number;
    discountedPrice?: number | null;
    discountValue?: number | null;
    discountCodeType?: DiscountType;
    loan?: number;
};
