/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { PostLoginRequest } from '../models/PostLoginRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static postLogin({
requestBody,
}: {
requestBody?: PostLoginRequest,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public/authentication/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
