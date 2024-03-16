/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type LessonTranslationDto = {
    id?: number;
    language?: Language;
    title?: string | null;
    description?: string | null;
    videoUrl?: string | null;
};
