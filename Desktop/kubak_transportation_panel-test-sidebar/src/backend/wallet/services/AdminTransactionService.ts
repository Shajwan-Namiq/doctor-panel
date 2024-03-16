/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminBalanceRequest } from '../models/AdminBalanceRequest';
import type { ListAdminWalletTransactions } from '../models/ListAdminWalletTransactions';
import type { ListAdminWalletTransactionsPagination } from '../models/ListAdminWalletTransactionsPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminTransactionService {

    /**
     * @returns ListAdminWalletTransactionsPagination Success
     * @throws ApiError
     */
    public static listAdminTransactions({
page,
limit,
sortField,
sortDescending,
}: {
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListAdminWalletTransactionsPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/AdminTransaction',
            query: {
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ListAdminWalletTransactions Success
     * @throws ApiError
     */
    public static addToAdminWalletBalance({
requestBody,
}: {
requestBody?: AdminBalanceRequest,
}): CancelablePromise<ListAdminWalletTransactions> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/AdminTransaction',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
