/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientLesson } from '../models/ClientLesson';
import type { CreateUpdateLessonRequest } from '../models/CreateUpdateLessonRequest';
import type { Language } from '../models/Language';
import type { LessonDto } from '../models/LessonDto';
import type { LessonDtoPagination } from '../models/LessonDtoPagination';
import type { MobileAppType } from '../models/MobileAppType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonService {

    /**
     * @returns ClientLesson Success
     * @throws ApiError
     */
    public static getLessonsClient({
language,
mobileAppType,
page,
limit,
}: {
language?: Language,
mobileAppType?: MobileAppType,
page?: number,
limit?: number,
}): CancelablePromise<Array<ClientLesson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public/lesson',
            query: {
                'language': language,
                'mobileAppType': mobileAppType,
                'page': page,
                'limit': limit,
            },
        });
    }

    /**
     * @returns ClientLesson Success
     * @throws ApiError
     */
    public static getLessonClient({
id,
language,
}: {
id: number,
language?: Language,
}): CancelablePromise<ClientLesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public/lesson/{id}',
            path: {
                'id': id,
            },
            query: {
                'language': language,
            },
        });
    }

    /**
     * @returns LessonDto Success
     * @throws ApiError
     */
    public static getLessonAdmin({
id,
}: {
id: number,
}): CancelablePromise<LessonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/lesson/{id}',
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
     * @returns any Success
     * @throws ApiError
     */
    public static updateLesson({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateLessonRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/lesson/{id}',
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
    public static deleteLesson({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/lesson/{id}',
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
     * @returns LessonDtoPagination Success
     * @throws ApiError
     */
    public static listLessonsAdmin({
mobileAppType,
page,
limit,
sortField,
sortDescending,
}: {
mobileAppType?: MobileAppType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<LessonDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/lesson',
            query: {
                'mobileAppType': mobileAppType,
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
     * @returns LessonDto Created
     * @throws ApiError
     */
    public static createLesson({
requestBody,
}: {
requestBody?: CreateUpdateLessonRequest,
}): CancelablePromise<LessonDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/lesson',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static updateLessonOrder({
id,
order,
}: {
id: number,
order: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/lesson/{id}/reorder/{order}',
            path: {
                'id': id,
                'order': order,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
