/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateVehicleRequest } from '../models/CreateVehicleRequest';
import type { ListVehicleRequestFilterField } from '../models/ListVehicleRequestFilterField';
import type { ServantDto } from '../models/ServantDto';
import type { UpdateVehicleRequest } from '../models/UpdateVehicleRequest';
import type { VehicleDto } from '../models/VehicleDto';
import type { VehicleDtoPagination } from '../models/VehicleDtoPagination';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VehicleService {

    /**
     * @returns VehicleDto Success
     * @throws ApiError
     */
    public static createVehicle({
requestBody,
}: {
requestBody?: CreateVehicleRequest,
}): CancelablePromise<VehicleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/api/v1/vehicle',
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
     * @returns VehicleDtoPagination Success
     * @throws ApiError
     */
    public static listVehicles({
searchField,
searchValue,
regionId,
page,
limit,
sortField,
sortDescending,
}: {
searchField?: ListVehicleRequestFilterField,
searchValue?: string,
regionId?: number,
page?: number,
limit?: number,
sortField?: string,
sortDescending?: boolean,
}): CancelablePromise<VehicleDtoPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/vehicle',
            query: {
                'searchField': searchField,
                'searchValue': searchValue,
                'regionId': regionId,
                'page': page,
                'limit': limit,
                'sortField': sortField,
                'sortDescending': sortDescending,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static updateDestinations(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/api/v1/vehicle',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * @returns VehicleDto Success
     * @throws ApiError
     */
    public static getVehicle({
id,
}: {
id: number,
}): CancelablePromise<VehicleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/vehicle/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static updateVehicle({
id,
requestBody,
}: {
id: number,
requestBody?: UpdateVehicleRequest,
}): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/api/v1/vehicle/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @returns ServantDto Success
     * @throws ApiError
     */
    public static getVehicleServant({
id,
}: {
id: number,
}): CancelablePromise<Array<ServantDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/api/v1/vehicle/{id}/servant',
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
