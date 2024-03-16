/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostRole } from '../models/PostRole';
import type { PutRole } from '../models/PutRole';
import type { RoleDto } from '../models/RoleDto';
import type { RoleDtoPagination } from '../models/RoleDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RolesService {

    /**
     * @returns RoleDto Success
     * @throws ApiError
     */
    public static postRole({
requestBody,
}: {
requestBody?: PostRole,
}): CancelablePromise<RoleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/roles',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RoleDtoPagination Success
     * @throws ApiError
     */
    public static getRoles({
page,
limit,
}: {
page?: number,
limit?: number,
}): CancelablePromise<RoleDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/roles',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RoleDtoPagination Success
     * @throws ApiError
     */
    public static getRole({
id,
}: {
id: number,
}): CancelablePromise<RoleDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/roles/{id}',
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
     * @returns RoleDto Success
     * @throws ApiError
     */
    public static putRole({
id,
requestBody,
}: {
id: number,
requestBody?: PutRole,
}): CancelablePromise<RoleDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/roles/{id}',
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
     * @returns RoleDto Success
     * @throws ApiError
     */
    public static deleteRole({
id,
}: {
id: number,
}): CancelablePromise<RoleDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
