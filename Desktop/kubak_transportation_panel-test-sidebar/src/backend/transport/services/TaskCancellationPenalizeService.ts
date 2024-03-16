/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateTaskCancellationPenalizeRequest } from '../models/CreateUpdateTaskCancellationPenalizeRequest';
import type { TaskCancellationPenalizeDto } from '../models/TaskCancellationPenalizeDto';
import type { TaskCancellationPenalizeType } from '../models/TaskCancellationPenalizeType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskCancellationPenalizeService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createPenalize({
requestBody,
}: {
requestBody?: CreateUpdateTaskCancellationPenalizeRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/taskcancellationpenalize',
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
     * @returns TaskCancellationPenalizeDto Success
     * @throws ApiError
     */
    public static getPenalizes({
penalizeType,
}: {
penalizeType?: TaskCancellationPenalizeType,
}): CancelablePromise<Array<TaskCancellationPenalizeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskcancellationpenalize',
            query: {
                'penalizeType': penalizeType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TaskCancellationPenalizeDto Success
     * @throws ApiError
     */
    public static getPenalize({
id,
}: {
id: number,
}): CancelablePromise<TaskCancellationPenalizeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskcancellationpenalize/{id}',
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
    public static updatePenalize({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateTaskCancellationPenalizeRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskcancellationpenalize/{id}',
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
    public static deletePenalize({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/taskcancellationpenalize/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static isPenalizeInUse({
id,
}: {
id: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskcancellationpenalize/{id}/in-use',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
