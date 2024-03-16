/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryDto } from './CountryDto';
import type { LocationPoint } from './LocationPoint';
import type { TranslationDto } from './TranslationDto';

export type RegionDto = {
    id?: number;
    name?: string | null;
    title?: string | null;
    location?: LocationPoint;
    boundary?: Array<LocationPoint> | null;
    country?: CountryDto;
    countryId?: number;
    translations?: Array<TranslationDto> | null;
};
