/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadedFile } from '../models/UploadedFile';
import type { UploadedFilePagination } from '../models/UploadedFilePagination';
import type { UploadedFileType } from '../models/UploadedFileType';
import type { UploadFileRequest } from '../models/UploadFileRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UploadedFileService {

    /**
     * @returns UploadedFile Success
     * @throws ApiError
     */
    public static uploadFile({
requestBody,
}: {
requestBody?: UploadFileRequest,
}): CancelablePromise<UploadedFile> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/uploadedfile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns UploadedFilePagination Success
     * @throws ApiError
     */
    public static getUploadedFiles({
type,
page,
limit,
sortField,
sortDescending,
}: {
type?: UploadedFileType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UploadedFilePagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/uploadedfile',
            query: {
                'type': type,
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

    /**
     * @returns void 
     * @throws ApiError
     */
    public static deleteUploadedFiles({
id,
}: {
id: string,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/uploadedfile/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
