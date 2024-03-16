/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Platform } from './Platform';
import type { UserMiniDto } from './UserMiniDto';

export type UserDeviceDto = {
    id?: number;
    deviceId?: string | null;
    deviceName?: string | null;
    fcmToken?: string | null;
    platform?: Platform;
    userId?: string | null;
    user?: UserMiniDto;
    appVersion?: string | null;
};
