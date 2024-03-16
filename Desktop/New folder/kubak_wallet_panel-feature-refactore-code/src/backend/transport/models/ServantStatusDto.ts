/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { ServantStatusEnum } from './ServantStatusEnum';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type ServantStatusDto = {
    servantId?: number | null;
    servantUserId?: string | null;
    status?: ServantStatusEnum;
    inTripStatus?: TaskStatusEnum;
    address?: string | null;
    fullName?: string | null;
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    regionId?: number;
    currentLocation?: LocationPoint;
    vehicleSpeed?: number;
};
