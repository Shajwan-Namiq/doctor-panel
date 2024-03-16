/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HelpTranslationDto } from './HelpTranslationDto';

export type ServiceAppConfigurationDto = {
    id?: number;
    servantLocationUpdateInterval?: number;
    helpTranslation?: Array<HelpTranslationDto> | null;
};
