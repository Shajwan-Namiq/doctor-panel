/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientNotificationMessage } from '../models/ClientNotificationMessage';
import type { PostPushNotificationTokenRequest } from '../models/PostPushNotificationTokenRequest';
import type { PushNotificationLogDto } from '../models/PushNotificationLogDto';
import type { PushNotificationLogDtoPagination } from '../models/PushNotificationLogDtoPagination';
import type { SendPanelPushNotificationRequest } from '../models/SendPanelPushNotificationRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PushNotificationService {

    /**
     * @returns ClientNotificationMessage Success
     * @throws ApiError
     */
    public static getNotificationsClient({
page,
limit,
}: {
page?: number,
limit?: number,
}): CancelablePromise<Array<ClientNotificationMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/pushnotification',
            query: {
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
     * @returns any Success
     * @throws ApiError
     */
    public static postNotificationToken({
requestBody,
}: {
requestBody?: PostPushNotificationTokenRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pushnotification/push-notification-token',
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
     * @returns void 
     * @throws ApiError
     */
    public static deleteNotification({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pushnotification/{id}/ignore',
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
    public static checkUnseenNotifications(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pushnotification/check-unseens',
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
    public static seenNotification({
requestBody,
}: {
requestBody?: Array<number>,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pushnotification/seen',
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
    public static seenAllNotifications(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pushnotification/seen-all',
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

    /**
     * @returns PushNotificationLogDto Success
     * @throws ApiError
     */
    public static getPushNotificationById({
id,
}: {
id: number,
}): CancelablePromise<PushNotificationLogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pushnotification/push-notification/{id}',
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
     * @returns PushNotificationLogDtoPagination Success
     * @throws ApiError
     */
    public static getNotifications({
startAt,
endAt,
page,
limit,
sortField,
sortDescending,
}: {
startAt?: string,
endAt?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<PushNotificationLogDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/pushnotification',
            query: {
                'startAt': startAt,
                'endAt': endAt,
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
    public static sendPushNotification({
requestBody,
}: {
requestBody?: SendPanelPushNotificationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/pushnotification',
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
    public static postCancelScheduledPanelPushNotification({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/pushnotification/{id}/cancel',
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
