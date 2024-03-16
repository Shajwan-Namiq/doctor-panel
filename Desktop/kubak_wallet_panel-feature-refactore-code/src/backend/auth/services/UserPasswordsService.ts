/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PutUserPasswordRequest } from '../models/PutUserPasswordRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserPasswordsService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static putUserPassword({
requestBody,
}: {
requestBody?: PutUserPasswordRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/userpasswords/user-password',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiV1Userpasswords({
userId,
}: {
userId?: string,
}): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/userpasswords',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
