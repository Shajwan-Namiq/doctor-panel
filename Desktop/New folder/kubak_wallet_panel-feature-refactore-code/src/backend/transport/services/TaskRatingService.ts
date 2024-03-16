/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RateTaskRequest } from '../models/RateTaskRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskRatingService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static taskRates({
taskId,
}: {
taskId: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/taskrating/task/{taskId}',
            path: {
                'taskId': taskId,
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
     * @returns void 
     * @throws ApiError
     */
    public static rateTask({
requestBody,
}: {
requestBody?: RateTaskRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/taskrating',
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

}
