/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';
import type { TextTranslation } from './TextTranslation';

export type TextTranslationLanguage = {
    id?: number;
    language?: Language;
    value?: string | null;
    textTranslation?: TextTranslation;
};
