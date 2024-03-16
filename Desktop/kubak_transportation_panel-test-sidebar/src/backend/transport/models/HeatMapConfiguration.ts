/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HeatMapType } from './HeatMapType';

export type HeatMapConfiguration = {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    id?: number;
    heatMapType?: HeatMapType;
    fromValue?: number;
    lengthInHour?: number;
};
