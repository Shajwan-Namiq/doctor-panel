/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChangeDestinationRequestStatus } from './ChangeDestinationRequestStatus';
import type { LngLat } from './LngLat';

export type ChangeDestinationRequestStatusLogDto = {
    id?: string;
    changeDestinationRequestId?: string;
    status?: ChangeDestinationRequestStatus;
    dateTime?: string;
    location?: LngLat;
};
