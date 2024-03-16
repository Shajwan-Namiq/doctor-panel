/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { Gender } from './Gender';
import type { Language } from './Language';
import type { RegionDto } from './RegionDto';

export type UserDto = {
    uid?: string | null;
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    photoUrl?: string | null;
    emailVerified?: boolean;
    disabled?: boolean;
    baseRoles?: Array<BaseRoleDto> | null;
    gender?: Gender;
    language?: Language;
    regionId?: number | null;
    region?: RegionDto;
};
