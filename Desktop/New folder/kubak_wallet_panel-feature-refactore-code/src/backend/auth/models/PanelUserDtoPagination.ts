/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PanelUserDto } from './PanelUserDto';

export type PanelUserDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<PanelUserDto> | null;
};
