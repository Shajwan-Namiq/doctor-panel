/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateServiceAppConfigurationRequest } from '../models/CreateUpdateServiceAppConfigurationRequest';
import type { ServiceAppConfigurationDto } from '../models/ServiceAppConfigurationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceAppConfigurationService {

    /**
     * @returns ServiceAppConfigurationDto Success
     * @throws ApiError
     */
    public static getServiceAppConfiguration(): CancelablePromise<ServiceAppConfigurationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/serviceappconfiguration',
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
    public static updateServiceAppConfiguration({
requestBody,
}: {
requestBody?: CreateUpdateServiceAppConfigurationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/serviceappconfiguration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServiceAppConfigurationDto Success
     * @throws ApiError
     */
    public static getServiceAppConfigurationClient(): CancelablePromise<ServiceAppConfigurationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/serviceappconfiguration',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
