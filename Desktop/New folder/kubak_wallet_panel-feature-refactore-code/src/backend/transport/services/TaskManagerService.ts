/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManageTaskRequest } from '../models/ManageTaskRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskManagerService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static manageTask({
requestId,
requestBody,
}: {
requestId: number,
requestBody?: ManageTaskRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/taskmanager/{requestId}',
            path: {
                'requestId': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
