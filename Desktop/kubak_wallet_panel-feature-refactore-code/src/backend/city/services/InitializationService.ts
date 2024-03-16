/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetInitializationResponse } from '../models/GetInitializationResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InitializationService {

    /**
     * @returns GetInitializationResponse Success
     * @throws ApiError
     */
    public static getAppRoutes(): CancelablePromise<GetInitializationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/initialization',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
