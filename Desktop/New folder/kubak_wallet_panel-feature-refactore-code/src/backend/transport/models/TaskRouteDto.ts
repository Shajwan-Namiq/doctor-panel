/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskRouteType } from './TaskRouteType';

export type TaskRouteDto = {
    taskId?: number;
    id?: number;
    rawRoute?: string | null;
    routeDistance?: number;
    taskPriceForThisRoute?: number;
    optimizedRoute?: string | null;
    routeType?: TaskRouteType;
};
