/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { Gender } from './Gender';
import type { Language } from './Language';
import type { RegionDto } from './RegionDto';
import type { UserDeviceDto } from './UserDeviceDto';

export type UserDto = {
    uid?: string | null;
    displayName?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    photoUrl?: string | null;
    disabled?: boolean;
    baseRoles?: Array<BaseRoleDto> | null;
    language?: Language;
    gender?: Gender;
    devices?: Array<UserDeviceDto> | null;
    regionId?: number | null;
    region?: RegionDto;
};
