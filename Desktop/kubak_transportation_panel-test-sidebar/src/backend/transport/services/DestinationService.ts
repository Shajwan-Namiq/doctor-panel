/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArriveAtDestinationRequest } from '../models/ArriveAtDestinationRequest';
import type { ChangeDestinationRequestDto } from '../models/ChangeDestinationRequestDto';
import type { DestinationClientDto } from '../models/DestinationClientDto';
import type { PostChangeDestinationRequest } from '../models/PostChangeDestinationRequest';
import type { PutChangeDestinationRequest } from '../models/PutChangeDestinationRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DestinationService {

    /**
     * @returns void 
     * @throws ApiError
     */
    public static arriveAtDestination({
requestBody,
}: {
requestBody?: ArriveAtDestinationRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/destination/arrive-at-destination',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ChangeDestinationRequestDto Success
     * @throws ApiError
     */
    public static postChangeDestinationRequest({
requestBody,
}: {
requestBody?: PostChangeDestinationRequest,
}): CancelablePromise<ChangeDestinationRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/destination/change-destination-request',
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
     * @returns DestinationClientDto Success
     * @throws ApiError
     */
    public static putChangeDestinationRequest({
requestBody,
}: {
requestBody?: PutChangeDestinationRequest,
}): CancelablePromise<Array<DestinationClientDto>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/destination/change-destination-request',
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

}
