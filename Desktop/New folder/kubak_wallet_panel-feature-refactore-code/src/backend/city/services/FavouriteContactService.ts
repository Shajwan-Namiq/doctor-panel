/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FavouriteContactDto } from '../models/FavouriteContactDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FavouriteContactService {

    /**
     * @returns FavouriteContactDto Success
     * @throws ApiError
     */
    public static getAllFavouriteContacts(): CancelablePromise<Array<FavouriteContactDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/favouritecontact',
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
    public static createFavouriteContact({
contactUserId,
}: {
contactUserId: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/favouritecontact',
            query: {
                'contactUserId': contactUserId,
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
    public static deleteFavouriteContact({
contactUserId,
}: {
contactUserId: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/favouritecontact',
            query: {
                'contactUserId': contactUserId,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
