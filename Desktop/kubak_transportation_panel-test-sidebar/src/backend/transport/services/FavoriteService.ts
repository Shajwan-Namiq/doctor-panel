/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFavoriteRequest } from '../models/CreateFavoriteRequest';
import type { FavoriteDto } from '../models/FavoriteDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FavoriteService {

    /**
     * @returns FavoriteDto Created
     * @throws ApiError
     */
    public static create({
requestBody,
}: {
requestBody?: CreateFavoriteRequest,
}): CancelablePromise<FavoriteDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/favorite',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns FavoriteDto Success
     * @throws ApiError
     */
    public static listFavorite(): CancelablePromise<Array<FavoriteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/favorite',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
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
            url: '/api/v1/favorite/{id}',
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
