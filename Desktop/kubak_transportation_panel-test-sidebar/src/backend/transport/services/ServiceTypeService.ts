/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServiceTypeRequest } from '../models/CreateServiceTypeRequest';
import type { ServiceTypeDto } from '../models/ServiceTypeDto';
import type { UpdateServiceTypeRequest } from '../models/UpdateServiceTypeRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceTypeService {

    /**
     * @returns ServiceTypeDto Created
     * @throws ApiError
     */
    public static createServiceType({
requestBody,
}: {
requestBody?: CreateServiceTypeRequest,
}): CancelablePromise<ServiceTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/servicetype',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ServiceTypeDto Success
     * @throws ApiError
     */
    public static listServiceTypes(): CancelablePromise<Array<ServiceTypeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servicetype',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServiceTypeDto Success
     * @throws ApiError
     */
    public static getServiceType({
id,
}: {
id: number,
}): CancelablePromise<ServiceTypeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servicetype/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateServiceType({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServiceTypeRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servicetype/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
