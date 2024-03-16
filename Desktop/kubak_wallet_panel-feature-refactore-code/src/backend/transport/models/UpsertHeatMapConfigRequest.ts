/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HeatMapType } from './HeatMapType';

export type UpsertHeatMapConfigRequest = {
    heatMapType: HeatMapType;
    fromValue: number;
    lengthInHour: number;
};
