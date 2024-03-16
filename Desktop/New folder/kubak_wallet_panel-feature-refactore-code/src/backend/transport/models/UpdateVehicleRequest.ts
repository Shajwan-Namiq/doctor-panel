/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateOrUpdatePlaqueRequest } from './CreateOrUpdatePlaqueRequest';
import type { FileUpload } from './FileUpload';
import type { UpdateVehicleDetailRequest } from './UpdateVehicleDetailRequest';

export type UpdateVehicleRequest = {
    title: string;
    plaqueDetail: CreateOrUpdatePlaqueRequest;
    vehicleDetail: UpdateVehicleDetailRequest;
    carCardImage?: FileUpload;
    carCardBackImage?: FileUpload;
};
