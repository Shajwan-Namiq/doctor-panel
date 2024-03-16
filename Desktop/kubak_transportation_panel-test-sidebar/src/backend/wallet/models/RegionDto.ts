/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { TranslationDto } from './TranslationDto';

export type RegionDto = {
    id?: number;
    name?: string | null;
    title?: string | null;
    location?: LocationPoint;
    boundary?: Array<LocationPoint> | null;
    translations?: Array<TranslationDto> | null;
};
