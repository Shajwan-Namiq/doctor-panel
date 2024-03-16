/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LngLat } from './LngLat';
import type { RequestAlertStatus } from './RequestAlertStatus';

export type ServantAlertModel = {
    id?: number;
    userid?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    readonly fullName?: string | null;
    avatarUrl?: string | null;
    location?: LngLat;
    status?: RequestAlertStatus;
};
