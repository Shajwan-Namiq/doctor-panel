/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostServicePanel } from '../models/PostServicePanel';
import type { PutServicePanel } from '../models/PutServicePanel';
import type { ServicePanelDto } from '../models/ServicePanelDto';
import type { ServicePanelDtoPagination } from '../models/ServicePanelDtoPagination';
import type { ServicePanelType } from '../models/ServicePanelType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServicePanelsService {

    /**
     * @returns ServicePanelDto Created
     * @throws ApiError
     */
    public static postServicePanel({
requestBody,
}: {
requestBody?: PostServicePanel,
}): CancelablePromise<ServicePanelDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/servicepanels',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServicePanelDtoPagination Success
     * @throws ApiError
     */
    public static getServicePanels({
type,
page,
limit,
sortField,
sortDescending,
}: {
type?: ServicePanelType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ServicePanelDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servicepanels',
            query: {
                'type': type,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServicePanelDto Success
     * @throws ApiError
     */
    public static putServicePanel({
id,
requestBody,
}: {
id?: number,
requestBody?: PutServicePanel,
}): CancelablePromise<ServicePanelDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servicepanels',
            query: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServicePanelDto Success
     * @throws ApiError
     */
    public static getServicePanel({
id,
}: {
id: number,
}): CancelablePromise<ServicePanelDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servicepanels/{id}',
            path: {
                'id': id,
            },
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
    public static deleteServicePanel({
id,
}: {
id: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/servicepanels/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
