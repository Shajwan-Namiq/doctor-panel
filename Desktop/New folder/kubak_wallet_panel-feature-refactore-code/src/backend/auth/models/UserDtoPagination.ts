/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type UserDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<UserDto> | null;
};
