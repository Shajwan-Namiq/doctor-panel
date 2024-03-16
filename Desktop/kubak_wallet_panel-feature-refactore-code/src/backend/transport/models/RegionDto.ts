/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryDto } from './CountryDto';
import type { LocationPoint } from './LocationPoint';
import type { RegionTranslation } from './RegionTranslation';

export type RegionDto = {
    id?: number;
    name?: string | null;
    location?: LocationPoint;
    boundary?: Array<LocationPoint> | null;
    country?: CountryDto;
    translations?: Array<RegionTranslation> | null;
};
