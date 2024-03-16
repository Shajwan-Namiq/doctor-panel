/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleDto } from './RoleDto';

export type RoleDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<RoleDto> | null;
};
