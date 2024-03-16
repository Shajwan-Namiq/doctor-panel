/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DebtClientDto } from '../models/DebtClientDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DebtService {

    /**
     * @returns DebtClientDto Success
     * @throws ApiError
     */
    public static getDebtClient({
id,
}: {
id: string,
}): CancelablePromise<DebtClientDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Debt/{id}',
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
