/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { CustomMessageButtonDto } from './CustomMessageButtonDto';
import type { CustomMessageShowType } from './CustomMessageShowType';
import type { CustomMessageTranslationDto } from './CustomMessageTranslationDto';
import type { Language } from './Language';
import type { MobileAppType } from './MobileAppType';
import type { RegionDto } from './RegionDto';
import type { UserDto } from './UserDto';

export type CustomMessageDto = {
    id?: number;
    isBlocker?: boolean;
    showType?: CustomMessageShowType;
    spot?: string | null;
    imageUrl?: string | null;
    buttons?: Array<CustomMessageButtonDto> | null;
    translations?: Array<CustomMessageTranslationDto> | null;
    isEnabled?: boolean;
    startDate?: string;
    expirationDate?: string | null;
    isForDisabledUser?: boolean | null;
    regions?: Array<RegionDto> | null;
    baseRoles?: Array<BaseRoleDto> | null;
    users?: Array<UserDto> | null;
    languages?: Array<Language> | null;
    mobileAppType?: MobileAppType;
};
