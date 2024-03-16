/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateCustomMessageRequest } from '../models/CreateUpdateCustomMessageRequest';
import type { CustomMessageDto } from '../models/CustomMessageDto';
import type { Language } from '../models/Language';
import type { MobileAppType } from '../models/MobileAppType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomMessagesService {

    /**
     * @returns CustomMessageDto Success
     * @throws ApiError
     */
    public static getAdminCustomMessage({
id,
}: {
id: number,
}): CancelablePromise<CustomMessageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/custommessages/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateCustomMessage({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateCustomMessageRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/custommessages/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static deleteCustomMessage({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/custommessages/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns CustomMessageDto Success
     * @throws ApiError
     */
    public static listAdminCustomMessages({
regionId,
baseRoleId,
userIds,
language,
mobileAppType,
startAt,
endAt,
page,
limit,
}: {
regionId?: number,
baseRoleId?: number,
userIds?: Array<string>,
language?: Language,
mobileAppType?: MobileAppType,
startAt?: string,
endAt?: string,
page?: number,
limit?: number,
}): CancelablePromise<Array<CustomMessageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/custommessages',
            query: {
                'regionId': regionId,
                'baseRoleId': baseRoleId,
                'userIds': userIds,
                'language': language,
                'mobileAppType': mobileAppType,
                'startAt': startAt,
                'endAt': endAt,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createCustomMessage({
requestBody,
}: {
requestBody?: CreateUpdateCustomMessageRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/custommessages',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
