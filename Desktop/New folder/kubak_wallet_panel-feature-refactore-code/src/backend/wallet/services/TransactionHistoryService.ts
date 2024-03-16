/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionHistoryType } from '../models/TransactionHistoryType';
import type { WalletTransactionHistoryDto } from '../models/WalletTransactionHistoryDto';
import type { WalletTransactionHistoryDtoPagination } from '../models/WalletTransactionHistoryDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransactionHistoryService {

    /**
     * @returns WalletTransactionHistoryDtoPagination Success
     * @throws ApiError
     */
    public static getAdminTransactionHistories({
transactionHistoryType,
page,
limit,
sortField,
sortDescending,
}: {
transactionHistoryType?: TransactionHistoryType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<WalletTransactionHistoryDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/TransactionHistory',
            query: {
                'transactionHistoryType': transactionHistoryType,
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
     * @returns WalletTransactionHistoryDto Success
     * @throws ApiError
     */
    public static getAdminTransactionHistory({
id,
}: {
id: number,
}): CancelablePromise<WalletTransactionHistoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/TransactionHistory/{id}',
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
