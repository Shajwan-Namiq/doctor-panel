/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LngLat } from '../models/LngLat';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AaService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static test({
serviceId,
calculatedPrice,
requestBody,
}: {
serviceId?: number,
calculatedPrice?: number,
requestBody?: LngLat,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/playground/api/v1/aa',
            query: {
                'serviceId': serviceId,
                'calculatedPrice': calculatedPrice,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
