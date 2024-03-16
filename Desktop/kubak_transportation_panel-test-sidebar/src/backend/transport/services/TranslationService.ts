/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TextTranslation } from '../models/TextTranslation';
import type { UpdateTranslationRequest } from '../models/UpdateTranslationRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TranslationService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static checkUnTranslated(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/translation/check-untranslated',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TextTranslation Success
     * @throws ApiError
     */
    public static getTranslations(): CancelablePromise<Array<TextTranslation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/translation',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns TextTranslation Success
     * @throws ApiError
     */
    public static updateTranslation({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateTranslationRequest,
}): CancelablePromise<Array<TextTranslation>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/translation/{id}',
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
