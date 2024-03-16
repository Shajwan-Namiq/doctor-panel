/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Currency } from '../models/Currency';
import type { ListWalletResultPagination } from '../models/ListWalletResultPagination';
import type { WalletDto } from '../models/WalletDto';
import type { WalletDtoPagination } from '../models/WalletDtoPagination';
import type { WalletType } from '../models/WalletType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WalletService {

    /**
     * @returns WalletDto Success
     * @throws ApiError
     */
    public static getAdminWallet({
id,
}: {
id: number,
}): CancelablePromise<WalletDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Wallet/{id}',
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
     * @returns WalletDto Success
     * @throws ApiError
     */
    public static updateWallet({
id,
balance,
type,
currency,
}: {
id: number,
balance: number,
type: WalletType,
currency: Currency,
}): CancelablePromise<WalletDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/Wallet/{id}',
            path: {
                'id': id,
            },
            query: {
                'balance': balance,
                'type': type,
                'currency': currency,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @deprecated
     * @returns WalletDtoPagination Success
     * @throws ApiError
     */
    public static getAdminWallets({
phoneNumber,
baseRoleId,
page,
limit,
sortField,
sortDescending,
}: {
phoneNumber?: string,
baseRoleId?: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<WalletDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Wallet',
            query: {
                'phoneNumber': phoneNumber,
                'baseRoleId': baseRoleId,
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
     * @returns ListWalletResultPagination Success
     * @throws ApiError
     */
    public static listWallets({
userIds,
baseRoleIds,
minBalance,
maxBalance,
walletType,
page,
limit,
sortField,
sortDescending,
}: {
userIds?: Array<string>,
baseRoleIds?: Array<number>,
minBalance?: number,
maxBalance?: number,
walletType?: WalletType,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListWalletResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Wallet/list',
            query: {
                'userIds': userIds,
                'baseRoleIds': baseRoleIds,
                'minBalance': minBalance,
                'maxBalance': maxBalance,
                'walletType': walletType,
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
     * @returns WalletDto Success
     * @throws ApiError
     */
    public static getClientWallet(): CancelablePromise<WalletDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Wallet',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
