/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateTaskCancellationPolicyRequest } from '../models/CreateUpdateTaskCancellationPolicyRequest';
import type { RoleType } from '../models/RoleType';
import type { TaskCancellationPolicyDto } from '../models/TaskCancellationPolicyDto';
import type { UpdateTaskCancellationPolicyOrderRequest } from '../models/UpdateTaskCancellationPolicyOrderRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskCancellationPolicyService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createPolicy({
requestBody,
}: {
requestBody?: CreateUpdateTaskCancellationPolicyRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/taskcancellationpolicy',
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
     * @returns TaskCancellationPolicyDto Success
     * @throws ApiError
     */
    public static getPolicies({
role,
}: {
role?: RoleType,
}): CancelablePromise<Array<TaskCancellationPolicyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskcancellationpolicy',
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
     * @returns TaskCancellationPolicyDto Success
     * @throws ApiError
     */
    public static getPolicy({
id,
}: {
id: number,
}): CancelablePromise<TaskCancellationPolicyDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskcancellationpolicy/{id}',
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
    public static updatePolicy({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateTaskCancellationPolicyRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskcancellationpolicy/{id}',
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
    public static deletePolicy({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/taskcancellationpolicy/{id}',
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
    public static updatePolicyOrder({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateTaskCancellationPolicyOrderRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskcancellationpolicy/{id}/order',
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
