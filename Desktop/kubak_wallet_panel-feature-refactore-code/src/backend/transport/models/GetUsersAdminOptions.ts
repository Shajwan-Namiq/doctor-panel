/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSearchFieldEnum } from './UserSearchFieldEnum';

export type GetUsersAdminOptions = {
    page?: number | null;
    limit?: number | null;
    sortField?: string | null;
    sortDescending?: boolean | null;
    regionId?: number | null;
    roleId?: number | null;
    baseRoleId?: number | null;
    searchField?: UserSearchFieldEnum;
    searchValue?: string | null;
};
