/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationClientDto } from './DestinationClientDto';
import type { LngLat } from './LngLat';
import type { TaskStatusLogDto } from './TaskStatusLogDto';

export type GetTaskDetailClientResult = {
    taskId?: number;
    serviceId?: number;
    serviceType?: string | null;
    servantScore?: number | null;
    rawPrice?: number;
    userPaidPrice?: number;
    discountedAmount?: number;
    userPaidWithCash?: number;
    userPaidWithBalance?: number;
    userLoan?: number;
    tip?: number;
    compensation?: number;
    logs?: Array<TaskStatusLogDto> | null;
    destinations?: Array<DestinationClientDto> | null;
    taskDuration?: number;
    taskDistance?: number;
    commission?: number;
    servantName?: string | null;
    sourcePoint?: LngLat;
    sourceAddress?: string | null;
    clientName?: string | null;
    servantAvatarUrl?: string | null;
    vehicleDetail?: string | null;
    dateTime?: string;
    isRated?: boolean;
};
