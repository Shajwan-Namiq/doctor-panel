/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlaqueDetailDto } from './PlaqueDetailDto';
import type { VehicleDetailDto } from './VehicleDetailDto';

export type VehicleDto = {
    id?: number;
    title?: string | null;
    carCardImageUrl?: string | null;
    carCardBackImageUrl?: string | null;
    vehicleDetail?: VehicleDetailDto;
    plaqueDetail?: PlaqueDetailDto;
};
