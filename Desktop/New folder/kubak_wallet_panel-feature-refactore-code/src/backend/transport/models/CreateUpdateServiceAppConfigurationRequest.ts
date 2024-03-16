/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationRequest } from './TranslationRequest';

export type CreateUpdateServiceAppConfigurationRequest = {
    servantLocationUpdateInterval?: number;
    helpTranslation?: Array<TranslationRequest> | null;
};
