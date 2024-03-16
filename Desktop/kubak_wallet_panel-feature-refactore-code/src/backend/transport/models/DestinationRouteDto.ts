/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationRouteType } from './DestinationRouteType';

export type DestinationRouteDto = {
    id?: number;
    rawRoute?: string | null;
    routeDistance?: number;
    optimizedRoute?: string | null;
    taskPriceForThisRoute?: number;
    routeType?: DestinationRouteType;
    isAccepted?: boolean;
    destinationId?: number;
};
