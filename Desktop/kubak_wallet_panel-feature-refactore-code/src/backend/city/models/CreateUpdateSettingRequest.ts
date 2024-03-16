/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MobileAppType } from './MobileAppType';
import type { Platform } from './Platform';

export type CreateUpdateSettingRequest = {
    storeLink: string;
    platform: Platform;
    mobileAppType: MobileAppType;
    currentAppVersion: string;
    minimumVersion: string;
};
