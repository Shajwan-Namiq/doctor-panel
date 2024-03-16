/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MobileAppType } from './MobileAppType';

export type CreateSupportNumberRequest = {
    number: string;
    regionId: number;
    mobileAppType: MobileAppType;
};
