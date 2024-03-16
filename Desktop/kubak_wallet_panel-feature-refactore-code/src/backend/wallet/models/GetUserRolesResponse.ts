/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { RoleDto } from './RoleDto';

export type GetUserRolesResponse = {
    userId?: string | null;
    baseRoles?: Array<BaseRoleDto> | null;
    roles?: Array<RoleDto> | null;
};
