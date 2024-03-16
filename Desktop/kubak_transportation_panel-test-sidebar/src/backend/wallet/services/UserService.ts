/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientInfoDto } from '../models/ClientInfoDto';
import type { GetUserRolesResponse } from '../models/GetUserRolesResponse';
import type { GetUsersAdminOptions } from '../models/GetUsersAdminOptions';
import type { GetUsersByIdsResponse } from '../models/GetUsersByIdsResponse';
import type { UserDto } from '../models/UserDto';
import type { UserMiniDtoPagination } from '../models/UserMiniDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

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
            url: '/admin/api/v1/User',
            body: requestBody,
            mediaType: 'application/json',
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
    public static getUsersByIds({
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
     * @returns GetUsersByIdsResponse Success
     * @throws ApiError
     */
    public static getUsersByIds1({
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
            url: '/admin/api/v1/User/self/roles',
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

}
