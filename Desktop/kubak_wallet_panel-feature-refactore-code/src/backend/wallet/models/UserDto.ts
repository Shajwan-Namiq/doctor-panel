/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';
import type { Language } from './Language';
import type { RegionDto } from './RegionDto';
import type { RoleDto } from './RoleDto';

export type UserDto = {
    uid?: string | null;
    displayName?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    photoUrl?: string | null;
    roles?: Array<RoleDto> | null;
    regionId?: number | null;
    region?: RegionDto;
    language?: Language;
    gender?: Gender;
    emailVerified?: boolean;
    disabled?: boolean;
};
