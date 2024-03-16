/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OtpConfiguration } from '../models/OtpConfiguration';
import type { UpsertOtpConfigurationRequest } from '../models/UpsertOtpConfigurationRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OtpConfigurationService {

    /**
     * @returns OtpConfiguration Success
     * @throws ApiError
     */
    public static getOtpConfiguration(): CancelablePromise<OtpConfiguration> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/otpconfiguration',
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
    public static postOtpConfiguration({
requestBody,
}: {
requestBody?: UpsertOtpConfigurationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/otpconfiguration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
