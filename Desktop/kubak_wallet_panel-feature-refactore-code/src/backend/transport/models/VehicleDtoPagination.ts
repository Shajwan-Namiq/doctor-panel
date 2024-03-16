/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehicleDto } from './VehicleDto';

export type VehicleDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<VehicleDto> | null;
};
