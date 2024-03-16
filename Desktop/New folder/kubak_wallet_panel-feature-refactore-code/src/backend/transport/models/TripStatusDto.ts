/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';
import type { LocationPoint } from './LocationPoint';
import type { TripStatusEnum } from './TripStatusEnum';

export type TripStatusDto = {
    requestId?: number;
    tripStatus?: TripStatusEnum;
    clientId?: string | null;
    clientName?: string | null;
    clientPhoneNumber?: string | null;
    clientPhotoUrl?: string | null;
    clientGender?: Gender;
    requestLocation?: LocationPoint;
    requestLocationName?: string | null;
    destinationLocationName?: string | null;
    askForHelp?: boolean;
    createdAt?: string;
    regionId?: number;
};
