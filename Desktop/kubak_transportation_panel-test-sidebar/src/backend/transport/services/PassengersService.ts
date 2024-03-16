/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PassengersReport } from '../models/PassengersReport';
import type { TaskStatusEnum } from '../models/TaskStatusEnum';
import type { UserDtoPagination } from '../models/UserDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PassengersService {

    /**
     * @returns UserDtoPagination Success
     * @throws ApiError
     */
    public static getPassengers({
regionId,
page,
limit,
sortField,
sortDescending,
}: {
regionId?: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UserDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/passengers',
            query: {
                'regionId': regionId,
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
     * @returns PassengersReport Success
     * @throws ApiError
     */
    public static getPassengersReport({
serviceId,
taskStatuses,
fromDate,
toDate,
passengerUserIds,
paginated,
page,
limit,
}: {
serviceId?: number,
taskStatuses?: Array<TaskStatusEnum>,
fromDate?: string,
toDate?: string,
passengerUserIds?: Array<string>,
paginated?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<Array<PassengersReport>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/passengers/report',
            query: {
                'serviceId': serviceId,
                'taskStatuses': taskStatuses,
                'fromDate': fromDate,
                'toDate': toDate,
                'passengerUserIds': passengerUserIds,
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
