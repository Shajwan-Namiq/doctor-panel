/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppInitializationResult } from '../models/AppInitializationResult';
import type { MobileAppType } from '../models/MobileAppType';
import type { Platform } from '../models/Platform';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppInitializationService {

    /**
     * @returns AppInitializationResult Success
     * @throws ApiError
     */
    public static initializeApp({
platform,
appVersion,
deviceId,
deviceName,
fmcToken,
mobileAppType,
cachedCustomMessages,
}: {
platform: Platform,
appVersion: string,
deviceId: string,
deviceName: string,
fmcToken: string,
mobileAppType?: MobileAppType,
cachedCustomMessages?: Array<string>,
}): CancelablePromise<AppInitializationResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/appinitialization/initialize-app',
            query: {
                'mobileAppType': mobileAppType,
                'platform': platform,
                'appVersion': appVersion,
                'deviceId': deviceId,
                'deviceName': deviceName,
                'fmcToken': fmcToken,
                'cachedCustomMessages': cachedCustomMessages,
            },
            errors: {
                401: `Unauthorized swagger !!!!!`,
                403: `Forbidden swagger !!!!!!`,
            },
        });
    }

}
