/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type ServiceTypeTranslationDto = {
    id?: number;
    title?: string | null;
    description?: string | null;
    language?: Language;
};
