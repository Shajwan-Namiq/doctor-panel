/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LngLat } from '../models/LngLat';
import type { RoutingRequest } from '../models/RoutingRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MapService {

    /**
     * @returns Direction Success
     * @throws ApiError
     */
    public static mapMatching({
requestBody,
}: {
requestBody?: Array<LngLat>,
}): CancelablePromise<Direction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playground/api/v1/map/map-matching',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns Direction Success
     * @throws ApiError
     */
    public static routing({
requestBody,
}: {
requestBody?: RoutingRequest,
}): CancelablePromise<Direction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playground/api/v1/map/routing',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
