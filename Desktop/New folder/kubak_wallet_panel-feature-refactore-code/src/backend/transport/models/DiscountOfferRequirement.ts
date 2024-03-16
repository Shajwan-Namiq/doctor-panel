/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimeFrame } from './TimeFrame';

export type DiscountOfferRequirement = {
    id?: number;
    discountOfferId?: number;
    minTaskCount?: number;
    taskCompletionTimeFrame?: TimeFrame;
    maxRedemptions?: number | null;
};
