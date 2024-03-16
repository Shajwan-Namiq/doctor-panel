/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppRouteParameterDto } from './AppRouteParameterDto';

export type AppRouteDto = {
    id?: number;
    name?: string | null;
    path?: string | null;
    parameters?: Array<AppRouteParameterDto> | null;
    readonly compiledPath?: string | null;
};
