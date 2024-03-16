/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NightPeriod } from './NightPeriod';

export type UpdateServiceParamsRequest = {
    basePrice: number;
    priceRatePerDistanceWithDestination: number;
    priceRatePerDurationWithDestination: number;
    priceRatePerDistanceWithoutDestination: number;
    priceRatePerDurationWithoutDestination: number;
    pricePerEachStop: number;
    priceRateDuringStopTime: number;
    nightPriceRiseRate: number;
    minPrice: number;
    tipPrice: number;
    minTip: number;
    maxTip: number;
    nightPeriods?: Array<NightPeriod> | null;
};
