/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TextTranslationLanguage } from './TextTranslationLanguage';

export type TextTranslationAdminDto = {
    id?: number;
    key?: string | null;
    translationLanguages?: Array<TextTranslationLanguage> | null;
    createdAt?: string;
};
