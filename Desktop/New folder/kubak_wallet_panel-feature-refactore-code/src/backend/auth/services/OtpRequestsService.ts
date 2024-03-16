/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OtpRequestDtoPagination } from '../models/OtpRequestDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OtpRequestsService {

    /**
     * @returns OtpRequestDtoPagination Success
     * @throws ApiError
     */
    public static getOtpRequests({
fromDate,
toDate,
phoneNumber,
isSuccessful,
page,
limit,
}: {
fromDate: string,
toDate: string,
phoneNumber?: string,
isSuccessful?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<OtpRequestDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/otprequests',
            query: {
                'phoneNumber': phoneNumber,
                'isSuccessful': isSuccessful,
                'fromDate': fromDate,
                'toDate': toDate,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
