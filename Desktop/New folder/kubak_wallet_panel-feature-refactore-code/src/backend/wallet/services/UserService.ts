/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientInfoDto } from '../models/ClientInfoDto';
import type { GetUserRolesResponse } from '../models/GetUserRolesResponse';
import type { GetUsersByIdsResponse } from '../models/GetUsersByIdsResponse';
import type { PutUserRoles } from '../models/PutUserRoles';
import type { UserDto } from '../models/UserDto';
import type { UserMiniDtoPagination } from '../models/UserMiniDtoPagination';
import type { UserSearchFieldEnum } from '../models/UserSearchFieldEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @returns UserMiniDtoPagination Success
     * @throws ApiError
     */
    public static getUsers({
regionId,
roleId,
baseRoleId,
searchField,
searchValue,
page,
limit,
sortField,
sortDescending,
}: {
regionId?: number,
roleId?: number,
baseRoleId?: number,
searchField?: UserSearchFieldEnum,
searchValue?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UserMiniDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/User',
            query: {
                'regionId': regionId,
                'roleId': roleId,
                'baseRoleId': baseRoleId,
                'searchField': searchField,
                'searchValue': searchValue,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getUser({
id,
}: {
id: string,
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/User/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static getUserRoles({
id,
}: {
id: string,
}): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/User/{id}/roles',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static putUserRoles({
id,
requestBody,
}: {
id: string,
requestBody?: PutUserRoles,
}): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/User/{id}/roles',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUsersByIdsResponse Success
     * @throws ApiError
     */
    public static getUsersByIds({
userIds,
}: {
userIds?: Array<string>,
}): CancelablePromise<GetUsersByIdsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/User/by-ids',
            query: {
                'userIds': userIds,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static getCurrentUserRoles(): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/User/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ClientInfoDto Success
     * @throws ApiError
     */
    public static getClientInfo({
clientPhoneNumber,
}: {
clientPhoneNumber?: string,
}): CancelablePromise<ClientInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/User',
            query: {
                'clientPhoneNumber': clientPhoneNumber,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/User/current',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static getCurrentUserRoles1(): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/User/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
