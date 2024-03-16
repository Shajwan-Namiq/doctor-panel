/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardClientDto } from '../models/CardClientDto';
import type { CardDto } from '../models/CardDto';
import type { CreateCardRequest } from '../models/CreateCardRequest';
import type { MobileAppType } from '../models/MobileAppType';
import type { UpdateCardOrderRequest } from '../models/UpdateCardOrderRequest';
import type { UpdateCardRequest } from '../models/UpdateCardRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CardsService {

    /**
     * @deprecated
     * @returns CardClientDto Success
     * @throws ApiError
     */
    public static getClientCards(): CancelablePromise<Array<CardClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cards',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns CardClientDto Success
     * @throws ApiError
     */
    public static listClientCards({
cachedCards,
mobileAppType,
}: {
cachedCards?: Array<string>,
mobileAppType?: MobileAppType,
}): CancelablePromise<Array<CardClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cards/list',
            query: {
                'cachedCards': cachedCards,
                'mobileAppType': mobileAppType,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns CardDto Success
     * @throws ApiError
     */
    public static getAdminCard({
id,
}: {
id: number,
}): CancelablePromise<CardDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/cards/{id}',
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
    public static updateCard({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateCardRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/cards/{id}',
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
    public static deleteCard({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/cards/{id}',
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
     * @returns CardDto Success
     * @throws ApiError
     */
    public static getAdminCards(): CancelablePromise<Array<CardDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/cards',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns CardDto Created
     * @throws ApiError
     */
    public static createCard({
requestBody,
}: {
requestBody?: CreateCardRequest,
}): CancelablePromise<CardDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/cards',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateAdminCardOrder({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateCardOrderRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/cards/order/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

}
