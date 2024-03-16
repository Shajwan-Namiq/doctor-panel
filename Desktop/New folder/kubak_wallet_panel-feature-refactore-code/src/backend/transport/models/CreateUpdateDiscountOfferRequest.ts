/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountOfferRequirementRequest } from './DiscountOfferRequirementRequest';
import type { DiscountOfferStepRequest } from './DiscountOfferStepRequest';
import type { DiscountType } from './DiscountType';
import type { LngLat } from './LngLat';
import type { PeriodRequest } from './PeriodRequest';

export type CreateUpdateDiscountOfferRequest = {
    type: DiscountType;
    usageLimit?: number | null;
    periods?: Array<PeriodRequest> | null;
    startFrom: string;
    validUntil?: string | null;
    userIds?: Array<string> | null;
    serviceIds?: Array<number> | null;
    requirement?: DiscountOfferRequirementRequest;
    boundary?: Array<LngLat> | null;
    steps: Array<DiscountOfferStepRequest>;
    continueBeyondFinalStep?: boolean;
};
