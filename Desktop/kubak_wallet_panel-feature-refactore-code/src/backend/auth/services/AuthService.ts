/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static getAuthCheck(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/check',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
