/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServantRequest } from '../models/CreateServantRequest';
import type { CreateServantResponse } from '../models/CreateServantResponse';
import type { GetServantClientStatisticsResult } from '../models/GetServantClientStatisticsResult';
import type { GetServantCountResponse } from '../models/GetServantCountResponse';
import type { GetServantServiceConfigurationResult } from '../models/GetServantServiceConfigurationResult';
import type { GetServantServices } from '../models/GetServantServices';
import type { GetServantSessions } from '../models/GetServantSessions';
import type { GetSubscribedServantServiceTypesResponse } from '../models/GetSubscribedServantServiceTypesResponse';
import type { GetUserByPhoneNumberResponse } from '../models/GetUserByPhoneNumberResponse';
import type { ListServantsPerformancesResponsePagination } from '../models/ListServantsPerformancesResponsePagination';
import type { ListServantsResultPagination } from '../models/ListServantsResultPagination';
import type { RankedServantByTaskReportPagination } from '../models/RankedServantByTaskReportPagination';
import type { ServantDto } from '../models/ServantDto';
import type { ServantHourlyStatsResponse } from '../models/ServantHourlyStatsResponse';
import type { ServantOnlineHistoryResponse } from '../models/ServantOnlineHistoryResponse';
import type { ServantPerformanceResponse } from '../models/ServantPerformanceResponse';
import type { ServantSearchFieldEnum } from '../models/ServantSearchFieldEnum';
import type { ServantStatisticDto } from '../models/ServantStatisticDto';
import type { ServantStatusDto } from '../models/ServantStatusDto';
import type { ServantStatusEnum } from '../models/ServantStatusEnum';
import type { ServantUpdateLocationRequest } from '../models/ServantUpdateLocationRequest';
import type { UpdateServantRequest } from '../models/UpdateServantRequest';
import type { UpdateServantServiceConfigurationRequest } from '../models/UpdateServantServiceConfigurationRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServantService {

    /**
     * @returns CreateServantResponse Created
     * @throws ApiError
     */
    public static createServant({
requestBody,
}: {
requestBody?: CreateServantRequest,
}): CancelablePromise<CreateServantResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/servant',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ListServantsResultPagination Success
     * @throws ApiError
     */
    public static listServants({
status,
searchField,
searchValue,
incompleteOnly,
regionId,
createdFrom,
createdTo,
page,
limit,
sortField,
sortDescending,
}: {
status?: ServantStatusEnum,
searchField?: ServantSearchFieldEnum,
searchValue?: string,
incompleteOnly?: boolean,
regionId?: number,
createdFrom?: string,
createdTo?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListServantsResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant',
            query: {
                'status': status,
                'searchField': searchField,
                'searchValue': searchValue,
                'incompleteOnly': incompleteOnly,
                'regionId': regionId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
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
     * @returns GetServantSessions Success
     * @throws ApiError
     */
    public static getOnlineServantSessions({
id,
startDate,
endDate,
excludeStartHour,
excludeEndHour,
page,
limit,
}: {
id: number,
startDate?: string,
endDate?: string,
excludeStartHour?: number,
excludeEndHour?: number,
page?: number,
limit?: number,
}): CancelablePromise<Array<GetServantSessions>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{id}/online-session',
            path: {
                'id': id,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'excludeStartHour': excludeStartHour,
                'excludeEndHour': excludeEndHour,
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
     * @returns ServantDto Success
     * @throws ApiError
     */
    public static getServantById({
id,
}: {
id: number,
}): CancelablePromise<ServantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateServant({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServantRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servant/{id}',
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
    public static deleteServant({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/servant/{id}',
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
     * @returns GetServantCountResponse Success
     * @throws ApiError
     */
    public static getServantCount({
status,
searchField,
searchValue,
incompleteOnly,
regionId,
createdFrom,
createdTo,
page,
limit,
sortField,
sortDescending,
}: {
status?: ServantStatusEnum,
searchField?: ServantSearchFieldEnum,
searchValue?: string,
incompleteOnly?: boolean,
regionId?: number,
createdFrom?: string,
createdTo?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<GetServantCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/count',
            query: {
                'status': status,
                'searchField': searchField,
                'searchValue': searchValue,
                'incompleteOnly': incompleteOnly,
                'regionId': regionId,
                'createdFrom': createdFrom,
                'createdTo': createdTo,
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
     * @returns ServantHourlyStatsResponse Success
     * @throws ApiError
     */
    public static getServantHourlyStats({
serviceId,
regionId,
startDateTime,
endDateTime,
page,
limit,
}: {
serviceId: number,
regionId?: number,
startDateTime?: string,
endDateTime?: string,
page?: number,
limit?: number,
}): CancelablePromise<Array<ServantHourlyStatsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/hourly-statistics',
            query: {
                'regionId': regionId,
                'serviceId': serviceId,
                'startDateTime': startDateTime,
                'endDateTime': endDateTime,
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
     * @returns GetServantServices Success
     * @throws ApiError
     */
    public static getServantServices({
id,
}: {
id: number,
}): CancelablePromise<GetServantServices> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{id}/services',
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
     * @returns ServantStatisticDto Success
     * @throws ApiError
     */
    public static getServantStatistic({
id,
startAt,
endAt,
serviceId,
}: {
id: number,
startAt: string,
endAt: string,
serviceId: number,
}): CancelablePromise<ServantStatisticDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{id}/statistic',
            path: {
                'id': id,
            },
            query: {
                'startAt': startAt,
                'endAt': endAt,
                'serviceId': serviceId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetUserByPhoneNumberResponse Success
     * @throws ApiError
     */
    public static isUserExist({
phone,
includeServant,
}: {
phone: string,
includeServant?: boolean,
}): CancelablePromise<GetUserByPhoneNumberResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{phone}/exists',
            path: {
                'phone': phone,
            },
            query: {
                'includeServant': includeServant,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ListServantsPerformancesResponsePagination Success
     * @throws ApiError
     */
    public static listServantPerformances({
regionId,
startAt,
endAt,
page,
limit,
sortField,
sortDescending,
}: {
regionId?: number,
startAt?: string,
endAt?: string,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListServantsPerformancesResponsePagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/ranking',
            query: {
                'regionId': regionId,
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
     * @deprecated
     * @returns ServantOnlineHistoryResponse Success
     * @throws ApiError
     */
    public static listServantsOnlineHistory({
startDate,
endDate,
servantIds,
includeStartHour,
includeEndHour,
regionId,
minHours,
calculateInTaskDuration,
paginated,
page,
limit,
}: {
startDate: string,
endDate: string,
servantIds?: Array<number>,
includeStartHour?: string,
includeEndHour?: string,
regionId?: number,
minHours?: number,
calculateInTaskDuration?: boolean,
paginated?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<Array<ServantOnlineHistoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/online-history',
            query: {
                'servantIds': servantIds,
                'startDate': startDate,
                'endDate': endDate,
                'includeStartHour': includeStartHour,
                'includeEndHour': includeEndHour,
                'regionId': regionId,
                'minHours': minHours,
                'calculateInTaskDuration': calculateInTaskDuration,
                'paginated': paginated,
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
     * @deprecated
     * @returns ServantPerformanceResponse Success
     * @throws ApiError
     */
    public static servantPerformance({
id,
startAt,
endAt,
}: {
id: number,
startAt?: string,
endAt?: string,
}): CancelablePromise<ServantPerformanceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/{id}/performance',
            path: {
                'id': id,
            },
            query: {
                'startAt': startAt,
                'endAt': endAt,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServantStatusDto Success
     * @throws ApiError
     */
    public static getServantStatus({
userId,
}: {
userId: string,
}): CancelablePromise<ServantStatusDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/servant/{userId}/status',
            path: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns RankedServantByTaskReportPagination Success
     * @throws ApiError
     */
    public static getRankedServantByTaskReport({
regionId,
serviceId,
createdFromDate,
createdTillDate,
tasksFromDate,
tasksTillDate,
minTask,
maxTask,
servantIds,
paginated,
page,
limit,
}: {
regionId?: number,
serviceId?: number,
createdFromDate?: string,
createdTillDate?: string,
tasksFromDate?: string,
tasksTillDate?: string,
minTask?: number,
maxTask?: number,
servantIds?: Array<number>,
paginated?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<RankedServantByTaskReportPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/servant/report/ranked-servant-by-task',
            query: {
                'regionId': regionId,
                'serviceId': serviceId,
                'createdFromDate': createdFromDate,
                'createdTillDate': createdTillDate,
                'tasksFromDate': tasksFromDate,
                'tasksTillDate': tasksTillDate,
                'minTask': minTask,
                'maxTask': maxTask,
                'servantIds': servantIds,
                'paginated': paginated,
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
     * @returns void 
     * @throws ApiError
     */
    public static offline({
deviceId,
}: {
deviceId?: string,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/servant/offline',
            query: {
                'deviceId': deviceId,
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
    public static updateLocation({
requestBody,
}: {
requestBody?: ServantUpdateLocationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/servant/update-location',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetServantServiceConfigurationResult Success
     * @throws ApiError
     */
    public static getServantServiceConfiguration({
serviceId,
}: {
serviceId?: number,
}): CancelablePromise<GetServantServiceConfigurationResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servant/service-configuration',
            query: {
                'serviceId': serviceId,
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
    public static updateServantServiceConfiguration({
requestBody,
}: {
requestBody?: UpdateServantServiceConfigurationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/servant/service-configuration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetSubscribedServantServiceTypesResponse Success
     * @throws ApiError
     */
    public static getSubscribedServiceTypes(): CancelablePromise<Array<GetSubscribedServantServiceTypesResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servant/subscribed-service-types',
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
    public static onlineCheck({
deviceId,
}: {
deviceId?: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servant/online-check',
            query: {
                'deviceId': deviceId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns GetServantClientStatisticsResult Success
     * @throws ApiError
     */
    public static statistics({
oneDay = true,
}: {
oneDay?: boolean,
}): CancelablePromise<GetServantClientStatisticsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/servant/statistics',
            query: {
                'oneDay': oneDay,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
