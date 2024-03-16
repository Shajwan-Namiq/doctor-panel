/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateTaskReportDefinedProblemRequest } from '../models/CreateUpdateTaskReportDefinedProblemRequest';
import type { RoleType } from '../models/RoleType';
import type { TaskReportDefinedProblemDto } from '../models/TaskReportDefinedProblemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskReportDefinedProblemService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createTaskReportDefiledProblem({
requestBody,
}: {
requestBody?: CreateUpdateTaskReportDefinedProblemRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/taskreportdefinedproblem',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TaskReportDefinedProblemDto Success
     * @throws ApiError
     */
    public static getTaskReportDefiledProblems({
role,
}: {
role?: RoleType,
}): CancelablePromise<Array<TaskReportDefinedProblemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreportdefinedproblem',
            query: {
                'role': role,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TaskReportDefinedProblemDto Success
     * @throws ApiError
     */
    public static getTaskReportDefiledProblem({
id,
}: {
id: number,
}): CancelablePromise<TaskReportDefinedProblemDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskreportdefinedproblem/{id}',
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
    public static updateTaskReportDefiledProblem({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateTaskReportDefinedProblemRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskreportdefinedproblem/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static deleteTaskReportDefiledProblem({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/taskreportdefinedproblem/{id}',
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
     * @returns TaskReportDefinedProblemDto Success
     * @throws ApiError
     */
    public static getTaskReportDefinedProblemClient({
role,
}: {
role?: number,
}): CancelablePromise<Array<TaskReportDefinedProblemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/taskreportdefinedproblem',
            query: {
                'role': role,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
