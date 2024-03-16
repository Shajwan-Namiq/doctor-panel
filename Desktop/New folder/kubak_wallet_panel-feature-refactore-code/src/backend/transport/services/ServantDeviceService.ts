/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServantDeviceDto } from '../models/ServantDeviceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServantDeviceService {

    /**
     * @returns ServantDeviceDto Success
     * @throws ApiError
     */
    public static getServantDevices({
servantId,
}: {
servantId?: number,
}): CancelablePromise<Array<ServantDeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servantdevice',
            query: {
                'servantId': servantId,
            },
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
    public static makeServantDevicePrimaryClient({
deviceId,
servantId,
}: {
deviceId: string,
servantId?: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servantdevice/{deviceId}/make-primary',
            path: {
                'deviceId': deviceId,
            },
            query: {
                'servantId': servantId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServantDeviceDto Success
     * @throws ApiError
     */
    public static getServantDevicesClient(): CancelablePromise<Array<ServantDeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servantdevice',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static isServantDevicePrimaryClient({
deviceId,
}: {
deviceId: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servantdevice/{deviceId}/is-primary',
            path: {
                'deviceId': deviceId,
            },
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
    public static makeServantDevicePrimaryClient1({
deviceId,
}: {
deviceId: string,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/servantdevice/{deviceId}/make-primary',
            path: {
                'deviceId': deviceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
