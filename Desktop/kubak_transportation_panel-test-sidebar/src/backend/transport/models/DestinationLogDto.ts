/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationStatusEnum } from './DestinationStatusEnum';

export type DestinationLogDto = {
    id?: number;
    destinationId?: number;
    status?: DestinationStatusEnum;
    date?: string;
};
