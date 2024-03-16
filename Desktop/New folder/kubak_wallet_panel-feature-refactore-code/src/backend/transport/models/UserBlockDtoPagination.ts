/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBlockDto } from './UserBlockDto';

export type UserBlockDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<UserBlockDto> | null;
};
