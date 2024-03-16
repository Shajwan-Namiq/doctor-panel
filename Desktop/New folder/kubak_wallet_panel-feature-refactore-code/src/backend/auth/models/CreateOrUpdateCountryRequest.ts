/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationsRequest } from './TranslationsRequest';

export type CreateOrUpdateCountryRequest = {
    name: string;
    code: string;
    translations: Array<TranslationsRequest>;
};
