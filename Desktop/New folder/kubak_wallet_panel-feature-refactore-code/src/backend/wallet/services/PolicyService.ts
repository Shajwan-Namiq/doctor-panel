/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetPoliciesResponse } from '../models/GetPoliciesResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PolicyService {

    /**
     * @returns GetPoliciesResponse Success
     * @throws ApiError
     */
    public static getPolicies(): CancelablePromise<GetPoliciesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Policy',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
