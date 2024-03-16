/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountCodeStepRequest } from './DiscountCodeStepRequest';
import type { DiscountStepTimeFrame } from './DiscountStepTimeFrame';
import type { DiscountType } from './DiscountType';
import type { LngLat } from './LngLat';

export type CreateUpdateDiscountCodeRequest = {
    code: string;
    type: DiscountType;
    steps: Array<DiscountCodeStepRequest>;
    startAt: string;
    expireAt: string;
    disabled: boolean;
    isHidden: boolean;
    userIds?: Array<string> | null;
    serviceIds?: Array<number> | null;
    redeemBoundary?: Array<LngLat> | null;
    usageLimit?: number | null;
    stepTimeFrame?: DiscountStepTimeFrame;
};
