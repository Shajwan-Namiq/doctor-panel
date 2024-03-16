/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServicePanelDto } from './ServicePanelDto';

export type ServicePanelDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ServicePanelDto> | null;
};
