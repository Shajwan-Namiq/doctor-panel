/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationLogDto } from './DestinationLogDto';
import type { DestinationRouteDto } from './DestinationRouteDto';
import type { DestinationStatusEnum } from './DestinationStatusEnum';
import type { DestinationType } from './DestinationType';
import type { LngLat } from './LngLat';

export type DestinationDto = {
    id?: number;
    price?: number;
    distance?: number;
    duration?: number;
    route?: string | null;
    status?: DestinationStatusEnum;
    step?: number;
    targetLocation?: LngLat;
    targetLocationTitle?: string | null;
    changedLocationFrom?: LngLat;
    type?: DestinationType;
    logs?: Array<DestinationLogDto> | null;
    routes?: Array<DestinationRouteDto> | null;
    requestId?: number;
};
