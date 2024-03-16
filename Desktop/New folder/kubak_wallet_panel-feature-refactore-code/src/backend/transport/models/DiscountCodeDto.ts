/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountCodeStepDto } from './DiscountCodeStepDto';
import type { DiscountStepTimeFrame } from './DiscountStepTimeFrame';
import type { DiscountType } from './DiscountType';
import type { LngLat } from './LngLat';
import type { UserMiniDto } from './UserMiniDto';

export type DiscountCodeDto = {
    id?: number;
    code?: string | null;
    type?: DiscountType;
    usageLimit?: number | null;
    isHidden?: boolean;
    isActive?: boolean;
    startAt?: string;
    expireAt?: string | null;
    disabled?: boolean;
    steps?: Array<DiscountCodeStepDto> | null;
    serviceIds?: Array<number> | null;
    users?: Array<UserMiniDto> | null;
    redeemBoundary?: Array<LngLat> | null;
    stepTimeFrame?: DiscountStepTimeFrame;
};
