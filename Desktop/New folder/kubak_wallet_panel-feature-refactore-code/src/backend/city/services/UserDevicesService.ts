/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from '../models/Platform';
import type { UserDeviceDtoPagination } from '../models/UserDeviceDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserDevicesService {

    /**
     * @returns UserDeviceDtoPagination Success
     * @throws ApiError
     */
    public static getUserDevices({
appVersionFrom,
appVersionTo,
userIds,
deviceName,
platform,
createdFrom,
createdTo,
page,
limit,
sortField,
sortDescending,
}: {
appVersionFrom?: string,
appVersionTo?: string,
userIds?: Array<string>,
deviceName?: string,
platform?: Platform,
createdFrom?: string,
createdTo?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UserDeviceDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/userdevices',
            query: {
                'appVersionFrom': appVersionFrom,
                'appVersionTo': appVersionTo,
                'userIds': userIds,
                'deviceName': deviceName,
                'platform': platform,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
