/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MobileAppType } from './MobileAppType';
import type { RegionDto } from './RegionDto';

export type SupportNumberDto = {
    id?: number;
    number?: string | null;
    regionId?: number;
    region?: RegionDto;
    appType?: MobileAppType;
};
