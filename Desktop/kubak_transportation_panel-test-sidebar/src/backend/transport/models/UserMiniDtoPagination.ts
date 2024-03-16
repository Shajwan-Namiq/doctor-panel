/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserMiniDto } from './UserMiniDto';

export type UserMiniDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<UserMiniDto> | null;
};
