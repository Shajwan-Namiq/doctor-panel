/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { Language } from '../models/Language';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OldOtpService {

    /**
     * @deprecated
     * @returns any Success
     * @throws ApiError
     */
    public static oldRequestOtp({
phoneNumber,
language,
}: {
phoneNumber?: string,
language?: Language,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request-otp',
            headers: {
                'phone-number': phoneNumber,
            },
            query: {
                'language': language,
            },
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
    public static oldValidateOtp({
phoneNumber,
otp,
}: {
phoneNumber?: string,
otp?: string,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validate-otp',
            headers: {
                'phone-number': phoneNumber,
                'otp': otp,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
