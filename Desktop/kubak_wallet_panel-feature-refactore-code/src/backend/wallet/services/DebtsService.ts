/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelDebtAdminRequest } from '../models/CancelDebtAdminRequest';
import type { CreateDebtAdminRequest } from '../models/CreateDebtAdminRequest';
import type { DebtDto } from '../models/DebtDto';
import type { DebtStatus } from '../models/DebtStatus';
import type { ListDebtsAdminResultPagination } from '../models/ListDebtsAdminResultPagination';
import type { RecoverDebtAdminRequest } from '../models/RecoverDebtAdminRequest';
import type { UpdateDebtAdminRequest } from '../models/UpdateDebtAdminRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DebtsService {

    /**
     * @returns DebtDto Success
     * @throws ApiError
     */
    public static getDebtAdmin({
id,
}: {
id: string,
}): CancelablePromise<DebtDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Debts/{id}',
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
     * @returns ListDebtsAdminResultPagination Success
     * @throws ApiError
     */
    public static listDebtsAdmin({
walletUseIds,
walletIds,
from,
to,
debtStatuses,
min,
max,
overdue,
page,
limit,
sortField,
sortDescending,
}: {
walletUseIds?: Array<string>,
walletIds?: Array<number>,
from?: string,
to?: string,
debtStatuses?: Array<DebtStatus>,
min?: number,
max?: number,
overdue?: boolean,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<ListDebtsAdminResultPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/Debts',
            query: {
                'walletUseIds': walletUseIds,
                'walletIds': walletIds,
                'from': from,
                'to': to,
                'debtStatuses': debtStatuses,
                'min': min,
                'max': max,
                'overdue': overdue,
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
     * @returns DebtDto Success
     * @throws ApiError
     */
    public static createDebtAdmin({
requestBody,
}: {
requestBody?: CreateDebtAdminRequest,
}): CancelablePromise<DebtDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/Debts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns DebtDto Success
     * @throws ApiError
     */
    public static updateDebtAdmin({
id,
requestBody,
}: {
id?: string,
requestBody?: UpdateDebtAdminRequest,
}): CancelablePromise<DebtDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/Debts',
            query: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns DebtDto Success
     * @throws ApiError
     */
    public static cancelDebtAdmin({
id,
requestBody,
}: {
id?: string,
requestBody?: CancelDebtAdminRequest,
}): CancelablePromise<DebtDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/Debts/cancel',
            query: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns DebtDto Success
     * @throws ApiError
     */
    public static recoverDebtAdmin({
id,
requestBody,
}: {
id: string,
requestBody?: RecoverDebtAdminRequest,
}): CancelablePromise<DebtDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/Debts/{id}/recover',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
