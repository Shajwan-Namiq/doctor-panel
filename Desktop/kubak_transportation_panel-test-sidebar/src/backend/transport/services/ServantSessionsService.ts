/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetServantSessionSummery } from '../models/GetServantSessionSummery';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServantSessionsService {

    /**
     * @returns GetServantSessionSummery Success
     * @throws ApiError
     */
    public static getServantSessionSummary({
startDate,
endDate,
servantIds,
includeStartHour,
includeEndHour,
regionId,
minHours,
calculateInTaskDuration,
paginated,
page,
limit,
}: {
startDate: string,
endDate: string,
servantIds?: Array<number>,
includeStartHour?: string,
includeEndHour?: string,
regionId?: number,
minHours?: number,
calculateInTaskDuration?: boolean,
paginated?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<Array<GetServantSessionSummery>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servantsessions/summary',
            query: {
                'servantIds': servantIds,
                'startDate': startDate,
                'endDate': endDate,
                'includeStartHour': includeStartHour,
                'includeEndHour': includeEndHour,
                'regionId': regionId,
                'minHours': minHours,
                'calculateInTaskDuration': calculateInTaskDuration,
                'paginated': paginated,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
