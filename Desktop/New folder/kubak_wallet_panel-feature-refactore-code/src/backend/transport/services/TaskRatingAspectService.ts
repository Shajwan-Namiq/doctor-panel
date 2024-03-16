/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateTaskRatingAspectRequest } from '../models/CreateUpdateTaskRatingAspectRequest';
import type { RoleType } from '../models/RoleType';
import type { TaskRatingAspectDto } from '../models/TaskRatingAspectDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskRatingAspectService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createTaskRatingAspect({
requestBody,
}: {
requestBody?: CreateUpdateTaskRatingAspectRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/taskratingaspect',
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
     * @returns TaskRatingAspectDto Success
     * @throws ApiError
     */
    public static getTaskRatingAspects({
raterRole,
ratedRole,
}: {
raterRole?: RoleType,
ratedRole?: RoleType,
}): CancelablePromise<Array<TaskRatingAspectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskratingaspect',
            query: {
                'raterRole': raterRole,
                'ratedRole': ratedRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TaskRatingAspectDto Success
     * @throws ApiError
     */
    public static getTaskRatingAspect({
id,
}: {
id: number,
}): CancelablePromise<Array<TaskRatingAspectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskratingaspect/{id}',
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
    public static updateTaskRatingAspect({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateTaskRatingAspectRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskratingaspect/{id}',
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
    public static deleteTaskRatingAspect({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/taskratingaspect/{id}',
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
     * @returns TaskRatingAspectDto Success
     * @throws ApiError
     */
    public static getTaskRatingAspectsClient({
serviceId,
roleId,
}: {
serviceId: number,
roleId: number,
}): CancelablePromise<Array<TaskRatingAspectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/taskratingaspect/{serviceId}',
            path: {
                'serviceId': serviceId,
            },
            query: {
                'roleId': roleId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
