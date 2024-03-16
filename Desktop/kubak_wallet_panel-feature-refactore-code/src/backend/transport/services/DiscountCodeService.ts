/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckDiscountCodeResponse } from '../models/CheckDiscountCodeResponse';
import type { ClientDiscountCodeResponse } from '../models/ClientDiscountCodeResponse';
import type { CreateUpdateDiscountCodeRequest } from '../models/CreateUpdateDiscountCodeRequest';
import type { DiscountCodeDto } from '../models/DiscountCodeDto';
import type { DiscountCodeDtoPagination } from '../models/DiscountCodeDtoPagination';
import type { DiscountCodeSearchFieldEnum } from '../models/DiscountCodeSearchFieldEnum';
import type { ListDiscountUsageDiscountType } from '../models/ListDiscountUsageDiscountType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiscountCodeService {

    /**
     * @returns DiscountCodeDto Created
     * @throws ApiError
     */
    public static createDiscountCode({
requestBody,
}: {
requestBody?: CreateUpdateDiscountCodeRequest,
}): CancelablePromise<DiscountCodeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/discountcode',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns DiscountCodeDtoPagination Success
     * @throws ApiError
     */
    public static listDiscountCodes({
searchField,
searchValue,
activeCodesOnly,
includeDisable,
serviceId,
page,
limit,
sortField,
sortDescending,
}: {
searchField?: DiscountCodeSearchFieldEnum,
searchValue?: string,
activeCodesOnly?: boolean,
includeDisable?: boolean,
serviceId?: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<DiscountCodeDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/discountcode',
            query: {
                'searchField': searchField,
                'searchValue': searchValue,
                'activeCodesOnly': activeCodesOnly,
                'includeDisable': includeDisable,
                'serviceId': serviceId,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns DiscountCodeDto Success
     * @throws ApiError
     */
    public static getDiscountCodeDetails({
id,
}: {
id: number,
}): CancelablePromise<DiscountCodeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/discountcode/{id}',
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
     * @returns DiscountCodeDtoPagination Success
     * @throws ApiError
     */
    public static listDiscountUsages({
searchField,
searchValue,
discountType,
activeOnly,
regionId,
serviceId,
userId,
discountAmountLessThan,
discountAmountGreaterThan,
startDate,
endDate,
page,
limit,
}: {
searchField?: DiscountCodeSearchFieldEnum,
searchValue?: string,
discountType?: ListDiscountUsageDiscountType,
activeOnly?: boolean,
regionId?: number,
serviceId?: number,
userId?: string,
discountAmountLessThan?: number,
discountAmountGreaterThan?: number,
startDate?: string,
endDate?: string,
page?: number,
limit?: number,
}): CancelablePromise<DiscountCodeDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/discountcode/usages',
            query: {
                'searchField': searchField,
                'searchValue': searchValue,
                'discountType': discountType,
                'activeOnly': activeOnly,
                'regionId': regionId,
                'serviceId': serviceId,
                'userId': userId,
                'discountAmountLessThan': discountAmountLessThan,
                'discountAmountGreaterThan': discountAmountGreaterThan,
                'startDate': startDate,
                'endDate': endDate,
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
     * @returns DiscountCodeDto Success
     * @throws ApiError
     */
    public static deactivate({
codeId,
}: {
codeId: number,
}): CancelablePromise<DiscountCodeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/discountcode/{codeId}/deactivate',
            path: {
                'codeId': codeId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns void 
     * @throws ApiError
     */
    public static updateDiscountCode({
codeId,
requestBody,
}: {
codeId: number,
requestBody?: CreateUpdateDiscountCodeRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/discountcode/{codeId}',
            path: {
                'codeId': codeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns CheckDiscountCodeResponse Success
     * @throws ApiError
     */
    public static check({
code,
locationLng,
locationLat,
serviceTypeId,
}: {
code: string,
locationLng?: number,
locationLat?: number,
serviceTypeId?: number,
}): CancelablePromise<CheckDiscountCodeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/discountcode/check',
            query: {
                'code': code,
                'location.lng': locationLng,
                'location.lat': locationLat,
                'serviceTypeId': serviceTypeId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ClientDiscountCodeResponse Success
     * @throws ApiError
     */
    public static listClientDiscountCodes({
lng,
lat,
}: {
lng: number,
lat: number,
}): CancelablePromise<Array<ClientDiscountCodeResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/discountcode',
            query: {
                'lng': lng,
                'lat': lat,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
