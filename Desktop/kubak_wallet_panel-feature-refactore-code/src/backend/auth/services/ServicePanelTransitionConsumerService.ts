/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtToken } from '../models/JwtToken';
import type { PostConsumeServicePanelTransitionRequest } from '../models/PostConsumeServicePanelTransitionRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServicePanelTransitionConsumerService {

    /**
     * @returns JwtToken Success
     * @throws ApiError
     */
    public static postConsumeServicePanelTransition({
requestBody,
}: {
requestBody?: PostConsumeServicePanelTransitionRequest,
}): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/public/servicepaneltransitionconsumer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
