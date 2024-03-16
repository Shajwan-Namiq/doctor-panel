/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegionDto } from './RegionDto';
import type { ServantScoreDto } from './ServantScoreDto';
import type { ServantStatusLogDto } from './ServantStatusLogDto';
import type { UserDto } from './UserDto';
import type { VehicleDto } from './VehicleDto';

export type ServantDto = {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    nationalId?: string | null;
    certificateId?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    certificateUrl?: string | null;
    certificateBackUrl?: string | null;
    nationalCardUrl?: string | null;
    nationalCardBackUrl?: string | null;
    regionId?: number;
    region?: RegionDto;
    userId?: string | null;
    user?: UserDto;
    servantScores?: Array<ServantScoreDto> | null;
    servantStatus?: ServantStatusLogDto;
    vehicle?: VehicleDto;
    serviceId?: number;
    hasActiveServantBlock?: boolean;
    createdAt?: string;
};
