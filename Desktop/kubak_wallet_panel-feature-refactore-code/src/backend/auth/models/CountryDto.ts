/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationDto } from './TranslationDto';

export type CountryDto = {
    id?: number;
    code?: string | null;
    name?: string | null;
    title?: string | null;
    translations?: Array<TranslationDto> | null;
};
