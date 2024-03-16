/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HeatMapConfiguration } from '../models/HeatMapConfiguration';
import type { HeatMapDataResult } from '../models/HeatMapDataResult';
import type { UpsertHeatMapConfigRequest } from '../models/UpsertHeatMapConfigRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HeatMapService {

    /**
     * @returns HeatMapConfiguration Success
     * @throws ApiError
     */
    public static getHeatMapConfig(): CancelablePromise<HeatMapConfiguration> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/heatmap',
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
    public static upsertHeatMapConfig({
requestBody,
}: {
requestBody?: UpsertHeatMapConfigRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/heatmap',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns HeatMapDataResult Success
     * @throws ApiError
     */
    public static getHeatMapData(): CancelablePromise<HeatMapDataResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/heatmap',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
