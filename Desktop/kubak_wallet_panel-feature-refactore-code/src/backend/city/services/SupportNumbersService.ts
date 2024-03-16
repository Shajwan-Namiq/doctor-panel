/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSupportNumberRequest } from '../models/CreateSupportNumberRequest';
import type { SupportNumberDto } from '../models/SupportNumberDto';
import type { UpdateSupportNumberRequest } from '../models/UpdateSupportNumberRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SupportNumbersService {

    /**
     * @returns SupportNumberDto Success
     * @throws ApiError
     */
    public static getAllSupportNumberAdmin({
regionId,
}: {
regionId?: number,
}): CancelablePromise<Array<SupportNumberDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/supportnumbers',
            query: {
                'regionId': regionId,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns SupportNumberDto Created
     * @throws ApiError
     */
    public static postSupportNumber({
requestBody,
}: {
requestBody?: CreateSupportNumberRequest,
}): CancelablePromise<SupportNumberDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/supportnumbers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns SupportNumberDto Success
     * @throws ApiError
     */
    public static getSupportNumberAdmin({
id,
}: {
id: number,
}): CancelablePromise<SupportNumberDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/supportnumbers/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateSupportNumber({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateSupportNumberRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/supportnumbers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
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
    public static deleteSupportNumber({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/supportnumbers/{id}',
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

}
