/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TimeFrame } from './TimeFrame';

export type DiscountOfferRequirementRequest = {
    minTaskCount: number;
    taskCompletionTimeFrame: TimeFrame;
    maxRedemptions?: number | null;
};
