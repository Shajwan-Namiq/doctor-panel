/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckAppVersionResult } from '../models/CheckAppVersionResult';
import type { MobileAppType } from '../models/MobileAppType';
import type { Platform } from '../models/Platform';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppVersionService {

    /**
     * @returns CheckAppVersionResult Success
     * @throws ApiError
     */
    public static checkAppVersion({
platform,
appVersion,
mobileAppType,
}: {
platform: Platform,
appVersion: string,
mobileAppType?: MobileAppType,
}): CancelablePromise<CheckAppVersionResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/public/appversion/check-app-version',
            query: {
                'platform': platform,
                'appVersion': appVersion,
                'mobileAppType': mobileAppType,
            },
        });
    }

}
