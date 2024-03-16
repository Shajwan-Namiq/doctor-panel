/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { TranslationsRequest } from './TranslationsRequest';

export type CreateOrUpdateRegionRequest = {
    name: string;
    countryId: number;
    location: LocationPoint;
    translations: Array<TranslationsRequest>;
    boundary: Array<LocationPoint>;
};
