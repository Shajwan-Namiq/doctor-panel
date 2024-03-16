/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SmsCountryService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiSmscountryNotify(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/smscountry/notify',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
