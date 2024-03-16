/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryTranslation } from './CountryTranslation';

export type CountryDto = {
    id?: number;
    name?: string | null;
    code?: string | null;
    translations?: Array<CountryTranslation> | null;
};
