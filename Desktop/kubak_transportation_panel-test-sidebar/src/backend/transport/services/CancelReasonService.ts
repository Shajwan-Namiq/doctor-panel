/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelReasonDto } from '../models/CancelReasonDto';
import type { ClientGetCancelReasonResponse } from '../models/ClientGetCancelReasonResponse';
import type { CreateUpdateCancelReasonRequest } from '../models/CreateUpdateCancelReasonRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CancelReasonService {

    /**
     * @returns CancelReasonDto Created
     * @throws ApiError
     */
    public static createCancelReason({
requestBody,
}: {
requestBody?: CreateUpdateCancelReasonRequest,
}): CancelablePromise<CancelReasonDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/cancelreason',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns CancelReasonDto Success
     * @throws ApiError
     */
    public static listCancelReason({
roleId,
page,
limit,
}: {
roleId?: number,
page?: number,
limit?: number,
}): CancelablePromise<Array<CancelReasonDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/cancelreason',
            query: {
                'roleId': roleId,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns CancelReasonDto Success
     * @throws ApiError
     */
    public static getCancelReason({
id,
}: {
id: number,
}): CancelablePromise<Array<CancelReasonDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/cancelreason/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateCancelReason({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateCancelReasonRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/cancelreason/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static delete({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/cancelreason/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ClientGetCancelReasonResponse Success
     * @throws ApiError
     */
    public static getClientCancelReason({
roleId,
}: {
roleId: number,
}): CancelablePromise<ClientGetCancelReasonResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cancelreason/{roleId}',
            path: {
                'roleId': roleId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
