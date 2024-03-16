/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type TaskRatingAspectTranslationDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    language?: Language;
    taskRatingAspectId?: number;
};
