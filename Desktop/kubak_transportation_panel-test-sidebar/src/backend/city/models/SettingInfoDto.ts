/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MobileAppType } from './MobileAppType';
import type { Platform } from './Platform';

export type SettingInfoDto = {
    id?: number;
    storeLink?: string | null;
    platform?: Platform;
    currentAppVersion?: string | null;
    minimumAppVersion?: string | null;
    mobileAppType?: MobileAppType;
};
