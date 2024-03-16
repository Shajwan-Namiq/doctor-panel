/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetMemberCountResponse } from '../models/GetMemberCountResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MemberService {

    /**
     * @returns GetMemberCountResponse Success
     * @throws ApiError
     */
    public static getMemberCount({
regionId,
}: {
regionId?: number,
}): CancelablePromise<GetMemberCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/member/count',
            query: {
                'regionId': regionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
