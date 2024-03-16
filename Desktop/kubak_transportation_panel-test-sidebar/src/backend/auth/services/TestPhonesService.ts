/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrUpdateTestPhonesRequest } from '../models/CreateOrUpdateTestPhonesRequest';
import type { TestPhonesDto } from '../models/TestPhonesDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestPhonesService {

    /**
     * @returns TestPhonesDto Success
     * @throws ApiError
     */
    public static getAdminApiV1Testphones(): CancelablePromise<Array<TestPhonesDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/testphones',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns any Created
     * @throws ApiError
     */
    public static createTestPhone({
requestBody,
}: {
requestBody?: CreateOrUpdateTestPhonesRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/testphones',
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
     * @returns TestPhonesDto Success
     * @throws ApiError
     */
    public static getTestPhoneById({
id,
}: {
id: number,
}): CancelablePromise<TestPhonesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/testphones/{id}',
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
     * @returns any Created
     * @throws ApiError
     */
    public static updateTestPhone({
id,
requestBody,
}: {
id: number,
requestBody?: CreateOrUpdateTestPhonesRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/testphones/{id}',
            path: {
                'id': id,
            },
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
     * @returns any Created
     * @throws ApiError
     */
    public static deleteTestPhone({
id,
}: {
id: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/testphones/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
