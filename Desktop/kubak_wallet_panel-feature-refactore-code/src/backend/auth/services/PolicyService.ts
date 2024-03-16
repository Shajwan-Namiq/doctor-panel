/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PolicyDto } from '../models/PolicyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PolicyService {

    /**
     * @returns PolicyDto Success
     * @throws ApiError
     */
    public static getPolicyById({
id,
}: {
id: number,
}): CancelablePromise<PolicyDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/policy/{id}',
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
     * @returns PolicyDto Success
     * @throws ApiError
     */
    public static getAllPolicies(): CancelablePromise<Array<PolicyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/policy',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
