/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateDiscountOfferRequest } from '../models/CreateUpdateDiscountOfferRequest';
import type { DiscountOfferDto } from '../models/DiscountOfferDto';
import type { DiscountOfferDtoPagination } from '../models/DiscountOfferDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiscountOffersService {

    /**
     * @returns DiscountOfferDto Success
     * @throws ApiError
     */
    public static postDiscountOffer({
requestBody,
}: {
requestBody?: CreateUpdateDiscountOfferRequest,
}): CancelablePromise<DiscountOfferDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/discountoffers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns DiscountOfferDtoPagination Success
     * @throws ApiError
     */
    public static getDiscountOffers({
serviceIds,
userIds,
locationLng,
locationLat,
isActive,
page,
limit,
}: {
serviceIds?: Array<number>,
userIds?: Array<string>,
locationLng?: number,
locationLat?: number,
isActive?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<DiscountOfferDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/discountoffers',
            query: {
                'serviceIds': serviceIds,
                'userIds': userIds,
                'location.lng': locationLng,
                'location.lat': locationLat,
                'isActive': isActive,
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
     * @returns DiscountOfferDto Success
     * @throws ApiError
     */
    public static getDiscountOffer({
id,
}: {
id: number,
}): CancelablePromise<DiscountOfferDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/discountoffers/{id}',
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
     * @returns DiscountOfferDto Success
     * @throws ApiError
     */
    public static updateDiscountOffer({
id,
requestBody,
}: {
id: number,
requestBody?: CreateUpdateDiscountOfferRequest,
}): CancelablePromise<DiscountOfferDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/discountoffers/{id}',
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

}
