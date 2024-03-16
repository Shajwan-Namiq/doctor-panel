/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AreaPriceDto } from '../models/AreaPriceDto';
import type { CreateAreaPriceRequest } from '../models/CreateAreaPriceRequest';
import type { UpdateAreaPriceOrderRequest } from '../models/UpdateAreaPriceOrderRequest';
import type { UpdateAreaPriceRequest } from '../models/UpdateAreaPriceRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceAreaPriceService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createServiceAreaPrice({
requestBody,
}: {
requestBody?: CreateAreaPriceRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/serviceareaprice',
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
     * @returns AreaPriceDto Success
     * @throws ApiError
     */
    public static getServiceAreaPrices({
serviceId,
}: {
serviceId: number,
}): CancelablePromise<Array<AreaPriceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/serviceareaprice/{serviceId}',
            path: {
                'serviceId': serviceId,
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
    public static updateServiceAreaPrice({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateAreaPriceRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/serviceareaprice/{id}',
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
    public static deleteServiceAreaPrice({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/serviceareaprice/{id}',
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
    public static updateServiceAreaPriceOrder({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateAreaPriceOrderRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/serviceareaprice/{id}/order',
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

}
