/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseNightPeriodsDto } from './BaseNightPeriodsDto';

export type ServiceParamsDto = {
    id?: number;
    basePrice?: number;
    priceRatePerDistanceWithDestination?: number;
    priceRatePerDurationWithDestination?: number;
    priceRatePerDistanceWithoutDestination?: number;
    priceRatePerDurationWithoutDestination?: number;
    pricePerEachStop?: number;
    priceRateDuringStopTime?: number;
    nightPriceRiseRate?: number;
    minPrice?: number;
    tipPrice?: number;
    minTip?: number;
    maxTip?: number;
    nightPeriods?: Array<BaseNightPeriodsDto> | null;
};
