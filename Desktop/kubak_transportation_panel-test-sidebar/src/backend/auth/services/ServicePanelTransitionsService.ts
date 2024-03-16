/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostServicePanelTransitionRequest } from '../models/PostServicePanelTransitionRequest';
import type { ServicePanelTransitionDto } from '../models/ServicePanelTransitionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServicePanelTransitionsService {

    /**
     * @returns ServicePanelTransitionDto Success
     * @throws ApiError
     */
    public static postServicePanelTransition({
requestBody,
}: {
requestBody?: PostServicePanelTransitionRequest,
}): CancelablePromise<ServicePanelTransitionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/servicepaneltransitions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
