/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type CustomMessageButtonTranslationDto = {
    id?: number;
    title?: string | null;
    language?: Language;
    customMessageButtonId?: number;
};
