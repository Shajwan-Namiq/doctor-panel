/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { Language } from '../models/Language';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OtpService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static requestOtp({
phoneNumber,
language,
}: {
phoneNumber?: string,
language?: Language,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/otp/request-otp',
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
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static validateOtp({
phoneNumber,
otp,
deviceId,
}: {
phoneNumber?: string,
otp?: string,
deviceId?: string,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/otp/validate-otp',
            headers: {
                'phone-number': phoneNumber,
                'otp': otp,
            },
            query: {
                'deviceId': deviceId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
