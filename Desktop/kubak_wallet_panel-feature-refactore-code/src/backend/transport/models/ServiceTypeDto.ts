/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceDto } from './ServiceDto';
import type { ServiceTypeTranslationDto } from './ServiceTypeTranslationDto';

export type ServiceTypeDto = {
    id?: number;
    iconUrl?: string | null;
    translations?: Array<ServiceTypeTranslationDto> | null;
    services?: Array<ServiceDto> | null;
};
