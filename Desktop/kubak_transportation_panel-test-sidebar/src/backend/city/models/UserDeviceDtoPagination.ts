/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDeviceDto } from './UserDeviceDto';

export type UserDeviceDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<UserDeviceDto> | null;
};