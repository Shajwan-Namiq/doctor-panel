/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonthlyChartResponse } from '../models/MonthlyChartResponse';
import type { StaticTypeEnum } from '../models/StaticTypeEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChartService {

    /**
     * @returns MonthlyChartResponse Success
     * @throws ApiError
     */
    public static getTaskStatus({
startDate,
endDate,
type,
serviceId,
regionId,
}: {
startDate: string,
endDate: string,
type: StaticTypeEnum,
serviceId?: number,
regionId?: number,
}): CancelablePromise<Array<MonthlyChartResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/chart',
            query: {
                'serviceId': serviceId,
                'regionId': regionId,
                'startDate': startDate,
                'endDate': endDate,
                'type': type,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
