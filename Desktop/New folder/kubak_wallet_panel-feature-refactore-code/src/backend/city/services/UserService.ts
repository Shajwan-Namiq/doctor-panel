/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUserRoles } from '../models/GetUserRoles';
import type { GetUsersPhotoUrlResponse } from '../models/GetUsersPhotoUrlResponse';
import type { LookupUserByPhoneResponse } from '../models/LookupUserByPhoneResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @returns LookupUserByPhoneResponse Success
     * @throws ApiError
     */
    public static lookupUserByPhone({
requestBody,
}: {
requestBody?: Array<string>,
}): CancelablePromise<Array<LookupUserByPhoneResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/lookup-by-phone',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GetUsersPhotoUrlResponse Success
     * @throws ApiError
     */
    public static getUsersPhotoUrl({
userIds,
}: {
userIds?: Array<string>,
}): CancelablePromise<GetUsersPhotoUrlResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/photo-url',
            query: {
                'userIds': userIds,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static delete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/user/delete',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GetUserRoles Success
     * @throws ApiError
     */
    public static getUserRoles({
id,
}: {
id: string,
}): CancelablePromise<GetUserRoles> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/{id}/roles',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GetUserRoles Success
     * @throws ApiError
     */
    public static getUserRoles1(): CancelablePromise<GetUserRoles> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/current/roles',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
