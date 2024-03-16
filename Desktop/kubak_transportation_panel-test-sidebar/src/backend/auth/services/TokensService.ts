/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { PostRenewAccessTokenRequest } from '../models/PostRenewAccessTokenRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokensService {

    /**
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static postRenewAccessToken({
requestBody,
}: {
requestBody?: PostRenewAccessTokenRequest,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public/tokens/renew-access-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static postApiV1PublicTokensShiftToken(): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public/tokens/shift-token',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
