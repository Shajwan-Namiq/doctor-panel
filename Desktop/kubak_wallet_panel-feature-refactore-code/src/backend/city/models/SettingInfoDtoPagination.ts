/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SettingInfoDto } from './SettingInfoDto';

export type SettingInfoDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<SettingInfoDto> | null;
};
