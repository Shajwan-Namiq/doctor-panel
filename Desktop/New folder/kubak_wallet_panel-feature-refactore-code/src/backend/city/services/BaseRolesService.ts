/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseRoleDto } from '../models/BaseRoleDto';
import type { GetBaseRoleResponse } from '../models/GetBaseRoleResponse';
import type { PutBaseRole } from '../models/PutBaseRole';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BaseRolesService {

    /**
     * @returns GetBaseRoleResponse Success
     * @throws ApiError
     */
    public static getBaseRoles(): CancelablePromise<GetBaseRoleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/baseroles',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns BaseRoleDto Success
     * @throws ApiError
     */
    public static getBaseRole({
id,
}: {
id: number,
}): CancelablePromise<BaseRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/baseroles/{id}',
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
     * @returns BaseRoleDto Success
     * @throws ApiError
     */
    public static putBaseRole({
id,
requestBody,
}: {
id: number,
requestBody?: PutBaseRole,
}): CancelablePromise<BaseRoleDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/baseroles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
