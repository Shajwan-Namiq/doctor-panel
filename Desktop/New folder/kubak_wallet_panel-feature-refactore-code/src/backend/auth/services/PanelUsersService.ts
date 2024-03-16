/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PanelUserDto } from '../models/PanelUserDto';
import type { PanelUserDtoPagination } from '../models/PanelUserDtoPagination';
import type { PostPanelUser } from '../models/PostPanelUser';
import type { PutPanelUser } from '../models/PutPanelUser';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PanelUsersService {

    /**
     * @returns PanelUserDto Created
     * @throws ApiError
     */
    public static postPanelUser({
requestBody,
}: {
requestBody?: PostPanelUser,
}): CancelablePromise<PanelUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/panelusers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns PanelUserDtoPagination Success
     * @throws ApiError
     */
    public static getPanelUsers({
userId,
servicePanelId,
page,
limit,
}: {
userId?: string,
servicePanelId?: number,
page?: number,
limit?: number,
}): CancelablePromise<PanelUserDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/panelusers',
            query: {
                'userId': userId,
                'servicePanelId': servicePanelId,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns PanelUserDto Success
     * @throws ApiError
     */
    public static getPanelUserById({
id,
}: {
id: number,
}): CancelablePromise<PanelUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/panelusers/{id}',
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
     * @returns PanelUserDto Success
     * @throws ApiError
     */
    public static putPanelUser({
id,
requestBody,
}: {
id: number,
requestBody?: PutPanelUser,
}): CancelablePromise<PanelUserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/panelusers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deletePanelUser({
id,
}: {
id: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/panelusers/{id}',
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
     * @returns PanelUserDto Success
     * @throws ApiError
     */
    public static getCurrentPanelUser(): CancelablePromise<PanelUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/panelusers/current',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns PanelUserDto Success
     * @throws ApiError
     */
    public static getPanelUserByUserId({
id,
}: {
id: string,
}): CancelablePromise<PanelUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/panelusers/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
