/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetClientCustomMessageResult } from '../models/GetClientCustomMessageResult';
import type { Language } from '../models/Language';
import type { MobileAppType } from '../models/MobileAppType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomMessageService {

    /**
     * @returns GetClientCustomMessageResult Success
     * @throws ApiError
     */
    public static getClientCustomMessages({
cachedMessages,
language,
appType,
}: {
cachedMessages?: Array<string>,
language?: Language,
appType?: MobileAppType,
}): CancelablePromise<GetClientCustomMessageResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public/custommessage',
            query: {
                'cachedMessages': cachedMessages,
                'language': language,
                'appType': appType,
            },
        });
    }

}
