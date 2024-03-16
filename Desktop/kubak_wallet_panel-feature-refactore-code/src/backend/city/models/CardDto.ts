/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { CardTranslationDto } from './CardTranslationDto';
import type { CardType } from './CardType';
import type { Language } from './Language';
import type { MobileAppType } from './MobileAppType';
import type { RegionDto } from './RegionDto';

export type CardDto = {
    id?: number;
    name?: string | null;
    type?: CardType;
    order?: number;
    isEnabled?: boolean;
    regions?: Array<RegionDto> | null;
    baseRoles?: Array<BaseRoleDto> | null;
    languages?: Array<Language> | null;
    startDate?: string;
    expireDate?: string | null;
    translations?: Array<CardTranslationDto> | null;
    mobileAppType?: MobileAppType;
};
