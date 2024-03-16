/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type HelpTranslationDto = {
    id?: number;
    language?: Language;
    text?: string | null;
    serviceAppConfigurationId?: number;
};
