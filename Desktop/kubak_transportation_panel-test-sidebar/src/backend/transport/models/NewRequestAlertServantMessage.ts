/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationClientDto } from './DestinationClientDto';
import type { Direction } from './Direction';
import type { LngLat } from './LngLat';
import type { RequestType } from './RequestType';

export type NewRequestAlertServantMessage = {
    requestId?: number;
    requestType?: RequestType;
    sourceLocation?: LngLat;
    sourceLocationAddress?: string | null;
    destinations?: Array<DestinationClientDto> | null;
    rawPrice?: number;
    discountAmount?: number;
    routeToClient?: Direction;
};
