/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrUpdateRegionRequest } from '../models/CreateOrUpdateRegionRequest';
import type { RegionDto } from '../models/RegionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegionService {

    /**
     * @returns RegionDto Success
     * @throws ApiError
     */
    public static getApiV1Region(): CancelablePromise<Array<RegionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/region',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RegionDto Success
     * @throws ApiError
     */
    public static getRegionByIdClient({
id,
}: {
id: number,
}): CancelablePromise<RegionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/region/{id}',
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
     * @returns RegionDto Success
     * @throws ApiError
     */
    public static getRegionById({
id,
}: {
id: number,
}): CancelablePromise<RegionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/region/{id}',
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
    public static updateRegion({
id,
requestBody,
}: {
id: number,
requestBody?: CreateOrUpdateRegionRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/region/{id}',
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

    /**
     * @returns void 
     * @throws ApiError
     */
    public static deleteRegion({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/region/{id}',
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
     * @returns RegionDto Success
     * @throws ApiError
     */
    public static getAllRegions(): CancelablePromise<Array<RegionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/region',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RegionDto Created
     * @throws ApiError
     */
    public static createRegion({
requestBody,
}: {
requestBody?: CreateOrUpdateRegionRequest,
}): CancelablePromise<RegionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/region',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
