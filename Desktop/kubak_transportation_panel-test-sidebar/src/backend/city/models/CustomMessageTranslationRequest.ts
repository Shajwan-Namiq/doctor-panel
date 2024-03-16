/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type CustomMessageTranslationRequest = {
    title: string;
    description?: string | null;
    language: Language;
};
