/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppRouteParameterRequest } from './AppRouteParameterRequest';

export type CreateUpdateAppRouteRequest = {
    name: string;
    path: string;
    parameters?: Array<AppRouteParameterRequest> | null;
};
