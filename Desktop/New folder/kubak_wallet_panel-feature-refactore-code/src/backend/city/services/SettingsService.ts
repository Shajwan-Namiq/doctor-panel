/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateSettingRequest } from '../models/CreateUpdateSettingRequest';
import type { SettingInfoDto } from '../models/SettingInfoDto';
import type { SettingInfoDtoPagination } from '../models/SettingInfoDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SettingsService {

    /**
     * @returns SettingInfoDtoPagination Success
     * @throws ApiError
     */
    public static getAllSettingsAdmin({
page,
limit,
sortField,
sortDescending,
}: {
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<SettingInfoDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/settings',
            query: {
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns SettingInfoDto Created
     * @throws ApiError
     */
    public static postSetting({
requestBody,
}: {
requestBody?: CreateUpdateSettingRequest,
}): CancelablePromise<SettingInfoDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/settings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns SettingInfoDto Success
     * @throws ApiError
     */
    public static getSettingByIdAdmin({
id,
}: {
id: number,
}): CancelablePromise<SettingInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/settings/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateSetting({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateSettingRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/settings/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static deleteSetting({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/settings/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

}
