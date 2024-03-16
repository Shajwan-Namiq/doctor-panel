/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';

export type GetUserRolesResponse = {
    userId?: string | null;
    baseRoles?: Array<BaseRoleDto> | null;
};
