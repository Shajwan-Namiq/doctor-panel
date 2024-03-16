/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TextTranslationLanguage } from './TextTranslationLanguage';

export type TextTranslation = {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    id?: number;
    key?: string | null;
    translationLanguages?: Array<TextTranslationLanguage> | null;
};
