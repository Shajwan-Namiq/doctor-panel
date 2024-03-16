/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAddressTitleResponse } from '../models/GetAddressTitleResponse';
import type { SearchMapResponse } from '../models/SearchMapResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AddressService {

    /**
     * @returns GetAddressTitleResponse Success
     * @throws ApiError
     */
    public static getAddressTitle({
locationLng,
locationLat,
}: {
locationLng?: number,
locationLat?: number,
}): CancelablePromise<GetAddressTitleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/address/get-title',
            query: {
                'location.lng': locationLng,
                'location.lat': locationLat,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns SearchMapResponse Success
     * @throws ApiError
     */
    public static searchMap({
locationName,
lng,
lat,
}: {
locationName: string,
lng?: number,
lat?: number,
}): CancelablePromise<SearchMapResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/address/search-map',
            query: {
                'locationName': locationName,
                'lng': lng,
                'lat': lat,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
                404: `Not Found`,
            },
        });
    }

}
