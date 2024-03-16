/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppRouteDto } from '../models/AppRouteDto';
import type { CreateUpdateAppRouteRequest } from '../models/CreateUpdateAppRouteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppRoutesService {

    /**
     * @returns AppRouteDto Success
     * @throws ApiError
     */
    public static getAppRoutes(): CancelablePromise<Array<AppRouteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/approutes',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createAppRoute({
requestBody,
}: {
requestBody?: CreateUpdateAppRouteRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/approutes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns AppRouteDto Success
     * @throws ApiError
     */
    public static getAppRoute({
id,
}: {
id: number,
}): CancelablePromise<AppRouteDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/approutes/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateAppRoute({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateAppRouteRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/approutes/{id}',
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

    /**
     * @returns void 
     * @throws ApiError
     */
    public static deleteAppRoute({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/approutes/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
