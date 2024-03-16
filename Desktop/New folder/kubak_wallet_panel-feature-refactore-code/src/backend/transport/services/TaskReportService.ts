/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListTaskReportClientResult } from '../models/ListTaskReportClientResult';
import type { ListTaskReportResultPagination } from '../models/ListTaskReportResultPagination';
import type { ReportTaskRequest } from '../models/ReportTaskRequest';
import type { TaskReportDetail } from '../models/TaskReportDetail';
import type { UpdateTaskReportRequest } from '../models/UpdateTaskReportRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskReportService {

    /**
     * @returns TaskReportDetail Success
     * @throws ApiError
     */
    public static getTaskReportDetail({
id,
}: {
id: number,
}): CancelablePromise<TaskReportDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreport/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateTaskReport({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateTaskReportRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskreport/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ListTaskReportResultPagination Success
     * @throws ApiError
     */
    public static listTaskReports({
regionId,
taskId,
taskRandomId,
taskReportActionId,
serviceId,
servantId,
clientUserId,
closed,
fromDate,
toDate,
page,
limit,
sortField,
sortDescending,
}: {
regionId?: number,
taskId?: number,
taskRandomId?: number,
taskReportActionId?: number,
serviceId?: number,
servantId?: number,
clientUserId?: string,
closed?: boolean,
fromDate?: string,
toDate?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListTaskReportResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreport',
            query: {
                'regionId': regionId,
                'taskId': taskId,
                'taskRandomId': taskRandomId,
                'taskReportActionId': taskReportActionId,
                'serviceId': serviceId,
                'servantId': servantId,
                'clientUserId': clientUserId,
                'closed': closed,
                'fromDate': fromDate,
                'toDate': toDate,
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
     * @returns void 
     * @throws ApiError
     */
    public static reportTask({
requestBody,
}: {
requestBody?: ReportTaskRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/taskreport/report-task',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ListTaskReportClientResult Success
     * @throws ApiError
     */
    public static listTaskReportsClient({
closed,
page,
limit,
}: {
closed?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<Array<ListTaskReportClientResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/taskreport',
            query: {
                'closed': closed,
                'page': page,
                'limit': limit,
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
