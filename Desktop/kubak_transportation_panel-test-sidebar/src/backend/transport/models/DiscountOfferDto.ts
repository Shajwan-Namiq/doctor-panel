/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountOfferRequirement } from './DiscountOfferRequirement';
import type { DiscountOfferStep } from './DiscountOfferStep';
import type { DiscountPeriodsDto } from './DiscountPeriodsDto';
import type { DiscountStepTimeFrame } from './DiscountStepTimeFrame';
import type { DiscountType } from './DiscountType';
import type { LngLat } from './LngLat';
import type { UserMiniDto } from './UserMiniDto';

export type DiscountOfferDto = {
    id?: number;
    type?: DiscountType;
    value?: number;
    maxDiscountAmount?: number;
    usageLimit?: number | null;
    periods?: Array<DiscountPeriodsDto> | null;
    startFrom?: string;
    validUntil?: string | null;
    users?: Array<UserMiniDto> | null;
    serviceIds?: Array<number> | null;
    requirement?: DiscountOfferRequirement;
    boundary?: Array<LngLat> | null;
    steps?: Array<DiscountOfferStep> | null;
    continueBeyondFinalStep?: boolean;
    stepTimeFrame?: DiscountStepTimeFrame;
};
