/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockedServantDto } from '../models/BlockedServantDto';
import type { PostServantBlockRequest } from '../models/PostServantBlockRequest';
import type { PutServantBlockRequest } from '../models/PutServantBlockRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServantBlockService {

    /**
     * @returns BlockedServantDto Success
     * @throws ApiError
     */
    public static postServantBlock({
requestBody,
}: {
requestBody?: PostServantBlockRequest,
}): CancelablePromise<BlockedServantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/servantblock',
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
     * @returns BlockedServantDto Success
     * @throws ApiError
     */
    public static getServantBlocks({
servantId,
}: {
servantId?: number,
}): CancelablePromise<Array<BlockedServantDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servantblock',
            query: {
                'servantId': servantId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns BlockedServantDto Success
     * @throws ApiError
     */
    public static updateServantBlock({
requestBody,
}: {
requestBody?: PutServantBlockRequest,
}): CancelablePromise<BlockedServantDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servantblock',
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
