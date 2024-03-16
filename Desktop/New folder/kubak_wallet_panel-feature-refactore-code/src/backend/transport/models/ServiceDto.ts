/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommissionDto } from './CommissionDto';
import type { NotifyServantPreferenceDto } from './NotifyServantPreferenceDto';
import type { RegionDto } from './RegionDto';
import type { ServiceParamsDto } from './ServiceParamsDto';
import type { ServiceSettingsDto } from './ServiceSettingsDto';
import type { ServiceTypeDto } from './ServiceTypeDto';

export type ServiceDto = {
    id?: number;
    isActive?: boolean;
    title?: string | null;
    region?: RegionDto;
    serviceType?: ServiceTypeDto;
    params?: ServiceParamsDto;
    commission?: CommissionDto;
    notifyServantPreference?: NotifyServantPreferenceDto;
    serviceSettings?: ServiceSettingsDto;
};
