/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegionDto } from './RegionDto';

export type CountryClientDto = {
    id?: number;
    code?: string | null;
    name?: string | null;
    regions?: Array<RegionDto> | null;
};
