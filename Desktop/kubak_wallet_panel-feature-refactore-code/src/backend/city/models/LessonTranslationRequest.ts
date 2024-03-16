/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type LessonTranslationRequest = {
    language: Language;
    title: string;
    description: string;
    videoUrl: string;
};
