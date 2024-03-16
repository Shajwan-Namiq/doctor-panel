/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDeviceDto } from '../models/UserDeviceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestControllersService {

    /**
     * @returns UserDeviceDto Success
     * @throws ApiError
     */
    public static getById({
uid,
}: {
uid?: string,
}): CancelablePromise<Array<UserDeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/playground/api/v1/testcontrollers',
            query: {
                'uid': uid,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
