/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServiceRequest } from '../models/CreateServiceRequest';
import type { ListServiceHourlyStatisticResultPagination } from '../models/ListServiceHourlyStatisticResultPagination';
import type { ServiceDto } from '../models/ServiceDto';
import type { UpdateCommissionRequest } from '../models/UpdateCommissionRequest';
import type { UpdateNotifyServantPreferenceRequest } from '../models/UpdateNotifyServantPreferenceRequest';
import type { UpdateServantWalletLoanThresholdRequest } from '../models/UpdateServantWalletLoanThresholdRequest';
import type { UpdateServiceParamsRequest } from '../models/UpdateServiceParamsRequest';
import type { UpdateServiceRequest } from '../models/UpdateServiceRequest';
import type { UpdateServiceSettingsRequest } from '../models/UpdateServiceSettingsRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * @returns ServiceDto Created
     * @throws ApiError
     */
    public static createService({
requestBody,
}: {
requestBody?: CreateServiceRequest,
}): CancelablePromise<ServiceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/service',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ServiceDto Success
     * @throws ApiError
     */
    public static getServices({
ids,
}: {
ids?: Array<number>,
}): CancelablePromise<ServiceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/service',
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
     * @returns ServiceDto Success
     * @throws ApiError
     */
    public static getService({
id,
}: {
id: number,
}): CancelablePromise<ServiceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/service/{id}',
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
    public static updateService({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServiceRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}',
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
     * @returns ListServiceHourlyStatisticResultPagination Success
     * @throws ApiError
     */
    public static listHourlyServiceStatistic({
startAt,
endAt,
serviceId,
regionId,
page,
limit,
}: {
startAt?: string,
endAt?: string,
serviceId?: number,
regionId?: number,
page?: number,
limit?: number,
}): CancelablePromise<ListServiceHourlyStatisticResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/service/hourly-statistics',
            query: {
                'startAt': startAt,
                'endAt': endAt,
                'serviceId': serviceId,
                'regionId': regionId,
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
    public static updateCommission({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateCommissionRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}/commission',
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
    public static updateNotifyServantPreference({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateNotifyServantPreferenceRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}/notify-servant-preference',
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
    public static updateServiceParams({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServiceParamsRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}/params',
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
    public static updateServiceServantWalletLoanThreshold({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServantWalletLoanThresholdRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}/servant-wallet-loan-threshold',
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
    public static updateServiceSettings({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateServiceSettingsRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/service/{id}/settings',
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
    public static getServiceByRole(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/service/active',
        });
    }

}
