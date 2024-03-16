/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryClientDto } from '../models/CountryClientDto';
import type { CountryDto } from '../models/CountryDto';
import type { CreateOrUpdateCountryRequest } from '../models/CreateOrUpdateCountryRequest';
import type { Language } from '../models/Language';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CountryService {

    /**
     * @returns CountryClientDto Success
     * @throws ApiError
     */
    public static getClientCountries({
language,
}: {
language?: Language,
}): CancelablePromise<Array<CountryClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/country',
            query: {
                'language': language,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns CountryDto Success
     * @throws ApiError
     */
    public static getAdminCountries(): CancelablePromise<Array<CountryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/country',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns CountryDto Created
     * @throws ApiError
     */
    public static createCountry({
requestBody,
}: {
requestBody?: CreateOrUpdateCountryRequest,
}): CancelablePromise<CountryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/country',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns CountryDto Success
     * @throws ApiError
     */
    public static getCountryById({
id,
}: {
id: number,
}): CancelablePromise<CountryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/country/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateCountry({
id,
requestBody,
}: {
id: number,
requestBody?: CreateOrUpdateCountryRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/country/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
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
    public static deleteCountry({
id,
}: {
id: number,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/country/{id}',
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

}
