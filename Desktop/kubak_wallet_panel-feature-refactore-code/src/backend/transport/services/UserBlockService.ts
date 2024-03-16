/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockUserRequest } from '../models/BlockUserRequest';
import type { GetAllUserBlockHistoryType } from '../models/GetAllUserBlockHistoryType';
import type { UserBlockDto } from '../models/UserBlockDto';
import type { UserBlockDtoPagination } from '../models/UserBlockDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserBlockService {

    /**
     * @returns UserBlockDto Success
     * @throws ApiError
     */
    public static postUserBlock({
requestBody,
}: {
requestBody?: BlockUserRequest,
}): CancelablePromise<UserBlockDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/userblock',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns UserBlockDtoPagination Success
     * @throws ApiError
     */
    public static getAllUserBlocks({
userIds,
blockedFromDate,
blockedToDate,
unblockedAtFromDate,
unblockedAtToDate,
type,
serviceTypeId,
regionId,
blockedByUserId,
page,
limit,
sortField,
sortDescending,
}: {
userIds?: Array<string>,
blockedFromDate?: string,
blockedToDate?: string,
unblockedAtFromDate?: string,
unblockedAtToDate?: string,
type?: GetAllUserBlockHistoryType,
serviceTypeId?: number,
regionId?: number,
blockedByUserId?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UserBlockDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/userblock',
            query: {
                'userIds': userIds,
                'blockedFromDate': blockedFromDate,
                'blockedToDate': blockedToDate,
                'unblockedAtFromDate': unblockedAtFromDate,
                'unblockedAtToDate': unblockedAtToDate,
                'type': type,
                'serviceTypeId': serviceTypeId,
                'regionId': regionId,
                'blockedByUserId': blockedByUserId,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserBlockDto Success
     * @throws ApiError
     */
    public static updateUserBlockFromService({
requestBody,
}: {
requestBody?: BlockUserRequest,
}): CancelablePromise<UserBlockDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/userblock',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
