/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveTripDataResponse } from '../models/ActiveTripDataResponse';
import type { ClientCancelTaskRequest } from '../models/ClientCancelTaskRequest';
import type { DestinationType } from '../models/DestinationType';
import type { GetServantRouteInTask } from '../models/GetServantRouteInTask';
import type { GetTaskCountResponse } from '../models/GetTaskCountResponse';
import type { GetTaskDetailClientResult } from '../models/GetTaskDetailClientResult';
import type { ListCanceledTaskResultPagination } from '../models/ListCanceledTaskResultPagination';
import type { ListTaskClientResult } from '../models/ListTaskClientResult';
import type { ListTaskResultPagination } from '../models/ListTaskResultPagination';
import type { ReviewTaskRequest } from '../models/ReviewTaskRequest';
import type { RoleType } from '../models/RoleType';
import type { ServantUpdateTaskRequest } from '../models/ServantUpdateTaskRequest';
import type { TaskDetailResult } from '../models/TaskDetailResult';
import type { TaskStatusEnum } from '../models/TaskStatusEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TaskService {

    /**
     * @returns ListCanceledTaskResultPagination Success
     * @throws ApiError
     */
    public static getCanceledTasks({
startAt,
endAt,
servantId,
clientUserId,
regionId,
cancellerRole,
page,
limit,
sortField,
sortDescending,
}: {
startAt: string,
endAt: string,
servantId?: number,
clientUserId?: string,
regionId?: number,
cancellerRole?: RoleType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListCanceledTaskResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/canceled-task',
            query: {
                'servantId': servantId,
                'clientUserId': clientUserId,
                'regionId': regionId,
                'cancellerRole': cancellerRole,
                'startAt': startAt,
                'endAt': endAt,
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
     * @returns GetServantRouteInTask Success
     * @throws ApiError
     */
    public static getServantRouteInTask({
id,
}: {
id: number,
}): CancelablePromise<GetServantRouteInTask> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/{id}/servant-route',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns GetTaskCountResponse Success
     * @throws ApiError
     */
    public static getTaskCount({
id,
randomId,
regionId,
serviceId,
servantId,
clientUserId,
startAt,
endAt,
status,
belowStatus,
destinationType,
page,
limit,
}: {
id?: number,
randomId?: number,
regionId?: number,
serviceId?: number,
servantId?: number,
clientUserId?: string,
startAt?: string,
endAt?: string,
status?: TaskStatusEnum,
belowStatus?: TaskStatusEnum,
destinationType?: DestinationType,
page?: number,
limit?: number,
}): CancelablePromise<GetTaskCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/count',
            query: {
                'id': id,
                'randomId': randomId,
                'regionId': regionId,
                'serviceId': serviceId,
                'servantId': servantId,
                'clientUserId': clientUserId,
                'startAt': startAt,
                'endAt': endAt,
                'status': status,
                'belowStatus': belowStatus,
                'destinationType': destinationType,
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
     * @returns TaskDetailResult Success
     * @throws ApiError
     */
    public static getTaskDetail({
id,
}: {
id: number,
}): CancelablePromise<TaskDetailResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns TaskDetailResult Success
     * @throws ApiError
     */
    public static getTaskDetailByRequestId({
requestId,
}: {
requestId: number,
}): CancelablePromise<TaskDetailResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/request/{requestId}',
            path: {
                'requestId': requestId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ListTaskResultPagination Success
     * @throws ApiError
     */
    public static listTasks({
id,
randomId,
regionId,
serviceId,
servantId,
clientUserId,
startAt,
endAt,
status,
belowStatus,
destinationType,
page,
limit,
}: {
id?: number,
randomId?: number,
regionId?: number,
serviceId?: number,
servantId?: number,
clientUserId?: string,
startAt?: string,
endAt?: string,
status?: TaskStatusEnum,
belowStatus?: TaskStatusEnum,
destinationType?: DestinationType,
page?: number,
limit?: number,
}): CancelablePromise<ListTaskResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task',
            query: {
                'id': id,
                'randomId': randomId,
                'regionId': regionId,
                'serviceId': serviceId,
                'servantId': servantId,
                'clientUserId': clientUserId,
                'startAt': startAt,
                'endAt': endAt,
                'status': status,
                'belowStatus': belowStatus,
                'destinationType': destinationType,
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
     * @returns ListTaskResultPagination Success
     * @throws ApiError
     */
    public static listTasksByClient({
clientId,
servantId,
includeRequest,
includeServant,
id,
randomId,
regionId,
serviceId,
clientUserId,
startAt,
endAt,
status,
belowStatus,
destinationType,
page,
limit,
}: {
clientId: string,
servantId?: number,
includeRequest?: boolean,
includeServant?: boolean,
id?: number,
randomId?: number,
regionId?: number,
serviceId?: number,
clientUserId?: string,
startAt?: string,
endAt?: string,
status?: TaskStatusEnum,
belowStatus?: TaskStatusEnum,
destinationType?: DestinationType,
page?: number,
limit?: number,
}): CancelablePromise<ListTaskResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/task/client/{clientId}',
            path: {
                'clientId': clientId,
            },
            query: {
                'servantId': servantId,
                'includeRequest': includeRequest,
                'includeServant': includeServant,
                'id': id,
                'randomId': randomId,
                'regionId': regionId,
                'serviceId': serviceId,
                'clientUserId': clientUserId,
                'startAt': startAt,
                'endAt': endAt,
                'status': status,
                'belowStatus': belowStatus,
                'destinationType': destinationType,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @deprecated
     * @returns any Success
     * @throws ApiError
     */
    public static reviewTask({
requestBody,
}: {
requestBody?: ReviewTaskRequest,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/task/review-task',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ActiveTripDataResponse Success
     * @throws ApiError
     */
    public static getActiveTask({
lng,
lat,
direction,
}: {
lng?: number,
lat?: number,
direction?: number,
}): CancelablePromise<ActiveTripDataResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/task/active-task',
            query: {
                'lng': lng,
                'lat': lat,
                'direction': direction,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetTaskDetailClientResult Success
     * @throws ApiError
     */
    public static getTaskDetailClient({
id,
roleId,
}: {
id: number,
roleId: number,
}): CancelablePromise<GetTaskDetailClientResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/task/{id}',
            path: {
                'id': id,
            },
            query: {
                'roleId': roleId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ListTaskClientResult Success
     * @throws ApiError
     */
    public static getTasksClient({
roleId,
page,
limit,
sortField,
sortDescending,
}: {
roleId: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<Array<ListTaskClientResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/task/task-history',
            query: {
                'roleId': roleId,
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
    public static clientUpdateTask({
requestBody,
}: {
requestBody?: ClientCancelTaskRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/task/client-cancel-task',
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
    public static servantUpdateTask({
requestBody,
}: {
requestBody?: ServantUpdateTaskRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/task/servant-update-task',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
