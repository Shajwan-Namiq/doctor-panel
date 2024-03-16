/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type TaskCancellationPenalizeTranslationDto = {
    id?: number;
    name?: string | null;
    language?: Language;
};
