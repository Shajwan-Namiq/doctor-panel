/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateOrUpdatePlaqueRequest } from './CreateOrUpdatePlaqueRequest';
import type { FileUpload } from './FileUpload';

export type CreateVehicleRequest = {
    title: string;
    color: string;
    model: number;
    carCardImage: FileUpload;
    carCardBackImage: FileUpload;
    servantId: number;
    plaque: CreateOrUpdatePlaqueRequest;
};
