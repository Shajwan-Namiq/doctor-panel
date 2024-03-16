/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveTripDataResponse } from '../models/ActiveTripDataResponse';
import type { DestinationType } from '../models/DestinationType';
import type { EstimateRequestForPanelResult } from '../models/EstimateRequestForPanelResult';
import type { GetPanelEstimateRequestModel } from '../models/GetPanelEstimateRequestModel';
import type { GetRequestCountResponse } from '../models/GetRequestCountResponse';
import type { ListAggregatedRequestResultPagination } from '../models/ListAggregatedRequestResultPagination';
import type { ListRequestResultPagination } from '../models/ListRequestResultPagination';
import type { NewRequestModel } from '../models/NewRequestModel';
import type { PanelCreateRequestForClientModel } from '../models/PanelCreateRequestForClientModel';
import type { PostNewRequest } from '../models/PostNewRequest';
import type { RequestAlertDto } from '../models/RequestAlertDto';
import type { RequestDto } from '../models/RequestDto';
import type { RequestReport } from '../models/RequestReport';
import type { RequestServantResponsePagination } from '../models/RequestServantResponsePagination';
import type { RequestStatusEnum } from '../models/RequestStatusEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RequestService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static createNewRequestForClient({
requestBody,
}: {
requestBody?: PanelCreateRequestForClientModel,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/request/new-request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns EstimateRequestForPanelResult Success
     * @throws ApiError
     */
    public static getEstimatedRequest({
requestBody,
}: {
requestBody?: GetPanelEstimateRequestModel,
}): CancelablePromise<EstimateRequestForPanelResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/request/estimate-request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RequestAlertDto Success
     * @throws ApiError
     */
    public static getRequestAlerts({
id,
}: {
id: number,
}): CancelablePromise<Array<RequestAlertDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/{id}/request-alert',
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
     * @returns RequestDto Success
     * @throws ApiError
     */
    public static getRequestById({
id,
}: {
id: number,
}): CancelablePromise<RequestDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/{id}',
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
     * @returns GetRequestCountResponse Success
     * @throws ApiError
     */
    public static getRequestCount({
startAt,
endAt,
regionId,
serviceId,
status,
destinationType,
userIds,
page,
limit,
}: {
startAt?: string,
endAt?: string,
regionId?: number,
serviceId?: number,
status?: RequestStatusEnum,
destinationType?: DestinationType,
userIds?: Array<string>,
page?: number,
limit?: number,
}): CancelablePromise<GetRequestCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/count',
            query: {
                'startAt': startAt,
                'endAt': endAt,
                'regionId': regionId,
                'serviceId': serviceId,
                'status': status,
                'destinationType': destinationType,
                'userIds': userIds,
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
     * @returns RequestServantResponsePagination Success
     * @throws ApiError
     */
    public static getRequestOnlineServant({
id,
page,
limit,
}: {
id: number,
page?: number,
limit?: number,
}): CancelablePromise<RequestServantResponsePagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/{id}/servants/online',
            path: {
                'id': id,
            },
            query: {
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
     * @returns RequestServantResponsePagination Success
     * @throws ApiError
     */
    public static getRequestPassiveServant({
id,
page,
limit,
}: {
id: number,
page?: number,
limit?: number,
}): CancelablePromise<RequestServantResponsePagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/{id}/servants/passive',
            path: {
                'id': id,
            },
            query: {
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
     * @returns ListRequestResultPagination Success
     * @throws ApiError
     */
    public static getRequests({
startAt,
endAt,
regionId,
serviceId,
status,
destinationType,
userIds,
page,
limit,
}: {
startAt?: string,
endAt?: string,
regionId?: number,
serviceId?: number,
status?: RequestStatusEnum,
destinationType?: DestinationType,
userIds?: Array<string>,
page?: number,
limit?: number,
}): CancelablePromise<ListRequestResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request',
            query: {
                'startAt': startAt,
                'endAt': endAt,
                'regionId': regionId,
                'serviceId': serviceId,
                'status': status,
                'destinationType': destinationType,
                'userIds': userIds,
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
     * @returns ListAggregatedRequestResultPagination Success
     * @throws ApiError
     */
    public static listAggregatedRequests({
startAt,
endAt,
regionId,
serviceId,
status,
destinationType,
userIds,
page,
limit,
}: {
startAt?: string,
endAt?: string,
regionId?: number,
serviceId?: number,
status?: RequestStatusEnum,
destinationType?: DestinationType,
userIds?: Array<string>,
page?: number,
limit?: number,
}): CancelablePromise<ListAggregatedRequestResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/aggregated',
            query: {
                'startAt': startAt,
                'endAt': endAt,
                'regionId': regionId,
                'serviceId': serviceId,
                'status': status,
                'destinationType': destinationType,
                'userIds': userIds,
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
     * @returns RequestDto Success
     * @throws ApiError
     */
    public static listLastHoursRequest({
regionId,
}: {
regionId?: number,
}): CancelablePromise<Array<RequestDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/last-hour',
            query: {
                'regionId': regionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RequestReport Success
     * @throws ApiError
     */
    public static requestReport({
regionId,
serviceId,
fromDate,
toDate,
statuses,
}: {
regionId?: number,
serviceId?: number,
fromDate?: string,
toDate?: string,
statuses?: Array<RequestStatusEnum>,
}): CancelablePromise<RequestReport> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/request/report/request',
            query: {
                'regionId': regionId,
                'serviceId': serviceId,
                'fromDate': fromDate,
                'toDate': toDate,
                'statuses': statuses,
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
    public static askForHelp({
requestId,
}: {
requestId: number,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/request/{requestId}/ask-for-help',
            path: {
                'requestId': requestId,
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
    public static cancelRequest(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/request/cancel-request',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns void 
     * @throws ApiError
     */
    public static newRequest({
requestBody,
}: {
requestBody?: NewRequestModel,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/request/new-request',
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
    public static postRequestClient({
requestBody,
}: {
requestBody?: PostNewRequest,
}): CancelablePromise<ActiveTripDataResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/request',
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
    public static rejectRequest({
requestId,
}: {
requestId: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/request/{requestId}/reject-request',
            path: {
                'requestId': requestId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
