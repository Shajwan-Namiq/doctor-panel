/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantStatusDto } from './ServantStatusDto';
import type { TripStatusDto } from './TripStatusDto';

export type StartMonitoringResponse = {
    servants?: Array<ServantStatusDto> | null;
    trips?: Array<TripStatusDto> | null;
};
