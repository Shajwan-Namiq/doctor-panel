/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOrRemoveUsersToGroupRequest } from '../models/AddOrRemoveUsersToGroupRequest';
import type { CreateOrUpdateGroupRequest } from '../models/CreateOrUpdateGroupRequest';
import type { GroupDto } from '../models/GroupDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GroupService {

    /**
     * @returns GroupDto Success
     * @throws ApiError
     */
    public static getAllGroups(): CancelablePromise<Array<GroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/group',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GroupDto Created
     * @throws ApiError
     */
    public static createGroup({
requestBody,
}: {
requestBody?: CreateOrUpdateGroupRequest,
}): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/group',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GroupDto Success
     * @throws ApiError
     */
    public static getGroupById({
id,
}: {
id: number,
}): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/group/{id}',
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
     * @returns GroupDto Created
     * @throws ApiError
     */
    public static updateGroup({
id,
requestBody,
}: {
id: number,
requestBody?: CreateOrUpdateGroupRequest,
}): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/group/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GroupDto Created
     * @throws ApiError
     */
    public static addUsersToGroup({
requestBody,
}: {
requestBody?: AddOrRemoveUsersToGroupRequest,
}): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/group/add-users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns GroupDto Created
     * @throws ApiError
     */
    public static removeUsersToGroup({
requestBody,
}: {
requestBody?: AddOrRemoveUsersToGroupRequest,
}): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/group/remove-users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
