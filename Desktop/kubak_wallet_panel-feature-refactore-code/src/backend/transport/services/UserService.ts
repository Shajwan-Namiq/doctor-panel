/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUserRolesResponse } from '../models/GetUserRolesResponse';
import type { GetUsersAdminOptions } from '../models/GetUsersAdminOptions';
import type { GetUsersByIdsResponse } from '../models/GetUsersByIdsResponse';
import type { PutUserRolesRequest } from '../models/PutUserRolesRequest';
import type { UserBlockDto } from '../models/UserBlockDto';
import type { UserDto } from '../models/UserDto';
import type { UserMiniDtoPagination } from '../models/UserMiniDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static getCurrentUserRoles(): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserBlockDto Success
     * @throws ApiError
     */
    public static getOnlineUsers({
regionIds,
}: {
regionIds?: Array<number>,
}): CancelablePromise<UserBlockDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/online',
            query: {
                'regionIds': regionIds,
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
            url: '/admin/api/v1/user/{id}',
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
userId,
}: {
id: string,
userId?: string,
}): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/{id}/roles',
            path: {
                'id': id,
            },
            query: {
                'userId': userId,
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
requestBody?: PutUserRolesRequest,
}): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/user/{id}/roles',
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
     * @returns UserMiniDtoPagination Success
     * @throws ApiError
     */
    public static getUsers({
requestBody,
}: {
requestBody?: GetUsersAdminOptions,
}): CancelablePromise<UserMiniDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user',
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
            url: '/admin/api/v1/user/by-ids',
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
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/current',
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
            url: '/api/v1/user/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
