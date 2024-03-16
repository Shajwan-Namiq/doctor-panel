/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicResponse } from '../models/BasicResponse';
import type { ClientTransaction } from '../models/ClientTransaction';
import type { GetClientTransactionsType } from '../models/GetClientTransactionsType';
import type { GetTransactionsAdminResultPagination } from '../models/GetTransactionsAdminResultPagination';
import type { GetTransactionsClientSortBy } from '../models/GetTransactionsClientSortBy';
import type { SendBalanceRequest } from '../models/SendBalanceRequest';
import type { WalletDto } from '../models/WalletDto';
import type { WalletTransactionDto } from '../models/WalletTransactionDto';
import type { WalletTransactionType } from '../models/WalletTransactionType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransactionService {

    /**
     * @returns WalletTransactionDto Success
     * @throws ApiError
     */
    public static getTransactionAdmin({
id,
}: {
id: number,
}): CancelablePromise<WalletTransactionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Transaction/{id}',
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

    /**
     * @returns GetTransactionsAdminResultPagination Success
     * @throws ApiError
     */
    public static getTransactionsAdmin({
transactionType,
sourceWalletUserId,
destinationWalletUserId,
transactionContainsUserId,
minTransactionPrice,
maxTransactionPrice,
fromDateTime,
toDateTime,
senderWalletUserRegionId,
receiverWalletUserRegionId,
page,
limit,
sortField,
sortDescending,
}: {
transactionType?: WalletTransactionType,
sourceWalletUserId?: string,
destinationWalletUserId?: string,
transactionContainsUserId?: string,
minTransactionPrice?: number,
maxTransactionPrice?: number,
fromDateTime?: string,
toDateTime?: string,
senderWalletUserRegionId?: number,
receiverWalletUserRegionId?: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<GetTransactionsAdminResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Transaction',
            query: {
                'transactionType': transactionType,
                'sourceWalletUserId': sourceWalletUserId,
                'destinationWalletUserId': destinationWalletUserId,
                'transactionContainsUserId': transactionContainsUserId,
                'minTransactionPrice': minTransactionPrice,
                'maxTransactionPrice': maxTransactionPrice,
                'fromDateTime': fromDateTime,
                'toDateTime': toDateTime,
                'senderWalletUserRegionId': senderWalletUserRegionId,
                'receiverWalletUserRegionId': receiverWalletUserRegionId,
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
     * @returns BasicResponse Success
     * @throws ApiError
     */
    public static depositWallet({
requestBody,
}: {
requestBody?: SendBalanceRequest,
}): CancelablePromise<BasicResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/Transaction/Deposit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ClientTransaction Success
     * @throws ApiError
     */
    public static getClientTransaction({
id,
}: {
id: number,
}): CancelablePromise<ClientTransaction> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Transaction/{id}',
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

    /**
     * @returns ClientTransaction Success
     * @throws ApiError
     */
    public static getTransactionsClient({
fromDate,
toDate,
transactionType,
getClientTransactionsType,
sortBy,
descending,
page,
limit,
}: {
fromDate?: string,
toDate?: string,
transactionType?: WalletTransactionType,
getClientTransactionsType?: GetClientTransactionsType,
sortBy?: GetTransactionsClientSortBy,
descending?: boolean,
page?: number,
limit?: number,
}): CancelablePromise<Array<ClientTransaction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Transaction/list',
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'transactionType': transactionType,
                'getClientTransactionsType': getClientTransactionsType,
                'sortBy': sortBy,
                'descending': descending,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns ClientTransaction Success
     * @throws ApiError
     */
    public static sendBalanceClientRequest({
requestBody,
}: {
requestBody?: SendBalanceRequest,
}): CancelablePromise<ClientTransaction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Transaction/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns WalletTransactionDto Success
     * @throws ApiError
     */
    public static getClientTransactions({
transactionType,
page,
limit,
sortField,
sortDescending,
}: {
transactionType?: WalletTransactionType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<Array<WalletTransactionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Transaction',
            query: {
                'transactionType': transactionType,
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
     * @deprecated
     * @returns WalletDto Success
     * @throws ApiError
     */
    public static postToWallet({
requestBody,
}: {
requestBody?: SendBalanceRequest,
}): CancelablePromise<WalletDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Transaction',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
