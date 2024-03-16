/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from '../models/Gender';
import type { GetUserCountResponse } from '../models/GetUserCountResponse';
import type { GetUserRoles } from '../models/GetUserRoles';
import type { GetUserRolesResponse } from '../models/GetUserRolesResponse';
import type { GetUsersByIdsResponse } from '../models/GetUsersByIdsResponse';
import type { JwtToken } from '../models/JwtToken';
import type { Language } from '../models/Language';
import type { PostLogoutRequest } from '../models/PostLogoutRequest';
import type { RevokeUserLoginRequest } from '../models/RevokeUserLoginRequest';
import type { UpdateUserLanguageRequest } from '../models/UpdateUserLanguageRequest';
import type { UpdateUserRolesRequest } from '../models/UpdateUserRolesRequest';
import type { UserDto } from '../models/UserDto';
import type { UserDtoPagination } from '../models/UserDtoPagination';
import type { UserSearchFieldEnum } from '../models/UserSearchFieldEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getCurrentUserClient(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/current',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static updateCurrentUserClient({
formData,
}: {
formData?: {
displayName: string;
photo?: Blob;
gender: Gender;
language: Language;
regionId: number;
removePhoto?: boolean;
},
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/current',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRoles Success
     * @throws ApiError
     */
    public static getApiV1UserCurrentRoles(): CancelablePromise<GetUserRoles> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static putApiV1UserCurrentLanguage({
requestBody,
}: {
requestBody?: UpdateUserLanguageRequest,
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/current/language',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns UserDto Success
     * @throws ApiError
     */
    public static putApiV1UserLanguage({
requestBody,
}: {
requestBody?: UpdateUserLanguageRequest,
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/language',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getUserProfile(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/profile',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns UserDto Success
     * @throws ApiError
     */
    public static updateUserProfile({
formData,
}: {
formData?: {
displayName: string;
photo?: Blob;
gender: Gender;
language: Language;
regionId: number;
removePhoto?: boolean;
},
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/profile',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Created
     * @throws ApiError
     */
    public static postUser({
formData,
}: {
formData?: {
email?: string;
emailVerified?: boolean;
password?: string;
displayName: string;
phoneNumber?: string;
photo?: Blob;
disabled?: boolean;
baseRoleIds: Array<number>;
gender: Gender;
language: Language;
regionId: number;
},
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/user',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDtoPagination Success
     * @throws ApiError
     */
    public static getUsers({
roleId,
regionId,
createdFrom,
createdTo,
searchField,
searchValue,
page,
limit,
sortField,
sortDescending,
}: {
roleId?: number,
regionId?: number,
createdFrom?: string,
createdTo?: string,
searchField?: UserSearchFieldEnum,
searchValue?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<UserDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user',
            query: {
                'roleId': roleId,
                'regionId': regionId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'searchField': searchField,
                'searchValue': searchValue,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postRevokeLogin({
requestBody,
}: {
requestBody?: RevokeUserLoginRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/user/revoke-login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getUserById({
id,
}: {
id: string,
}): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/{id}',
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
     * @returns GetUserRolesResponse Success
     * @throws ApiError
     */
    public static getUserRoles({
id,
userId,
}: {
id: string,
userId?: string,
}): CancelablePromise<GetUserRolesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/{id}/roles',
            path: {
                'id': id,
            },
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUsersByIdsResponse Success
     * @throws ApiError
     */
    public static getUserByIds({
ids,
}: {
ids?: Array<string>,
}): CancelablePromise<GetUsersByIdsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/by-ids',
            query: {
                'ids': ids,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns UserDto Success
     * @throws ApiError
     */
    public static getCurrentAdminUser(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/current',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateCurrentAdminUser({
formData,
}: {
formData?: {
displayName: string;
email?: string;
phoneNumber?: string;
photo?: Blob;
gender: Gender;
language: Language;
regionId: number;
removePhoto?: boolean;
disabled?: boolean;
},
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/user/current',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserRoles Success
     * @throws ApiError
     */
    public static getAdminApiV1UserCurrentRoles(): CancelablePromise<GetUserRoles> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/current/roles',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserCountResponse Success
     * @throws ApiError
     */
    public static getUsersCount({
roleId,
regionId,
createdFrom,
createdTo,
searchField,
searchValue,
page,
limit,
sortField,
sortDescending,
}: {
roleId?: number,
regionId?: number,
createdFrom?: string,
createdTo?: string,
searchField?: UserSearchFieldEnum,
searchValue?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<GetUserCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/user/count',
            query: {
                'roleId': roleId,
                'regionId': regionId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
                'searchField': searchField,
                'searchValue': searchValue,
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
     * @returns void 
     * @throws ApiError
     */
    public static updateUser({
userId,
formData,
}: {
userId?: string,
formData?: {
displayName: string;
email?: string;
phoneNumber?: string;
photo?: Blob;
gender: Gender;
language: Language;
regionId: number;
removePhoto?: boolean;
disabled?: boolean;
},
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/user/update',
            query: {
                'userId': userId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateUserBaseRole({
id,
requestBody,
}: {
id: string,
requestBody?: UpdateUserRolesRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/user/{id}/base-roles',
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
     * @returns void 
     * @throws ApiError
     */
    public static deleteUser({
userId,
}: {
userId?: string,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/user/delete',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static postLogout({
requestBody,
}: {
requestBody?: PostLogoutRequest,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/user/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
