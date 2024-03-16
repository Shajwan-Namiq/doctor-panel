/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateTaskReportActionRequest } from '../models/CreateUpdateTaskReportActionRequest';
import type { TaskReportActionDto } from '../models/TaskReportActionDto';
import type { UpdateTaskReportActionOrderRequest } from '../models/UpdateTaskReportActionOrderRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskReportActionService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createTaskReportAction({
requestBody,
}: {
requestBody?: CreateUpdateTaskReportActionRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/taskreportaction',
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
     * @returns TaskReportActionDto Success
     * @throws ApiError
     */
    public static getTaskActions(): CancelablePromise<Array<TaskReportActionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreportaction',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TaskReportActionDto Success
     * @throws ApiError
     */
    public static getTaskAction({
id,
}: {
id: number,
}): CancelablePromise<Array<TaskReportActionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreportaction/{id}',
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
    public static updateTaskReportAction({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateTaskReportActionRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskreportaction/{id}',
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
    public static deleteTaskAction({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/taskreportaction/{id}',
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
    public static updateTaskReportActionOrder({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateTaskReportActionOrderRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskreportaction/{id}/order',
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
