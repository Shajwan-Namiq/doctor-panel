/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationDto } from './DestinationDto';
import type { LngLat } from './LngLat';
import type { MemberResponse } from './MemberResponse';
import type { PaymentType } from './PaymentType';
import type { RequestType } from './RequestType';
import type { ServantMiniInfo } from './ServantMiniInfo';
import type { TaskDetailLog } from './TaskDetailLog';
import type { TaskInvoice } from './TaskInvoice';
import type { TaskRouteDto } from './TaskRouteDto';
import type { TaskStatusEnum } from './TaskStatusEnum';
import type { TaskStopLogDetail } from './TaskStopLogDetail';

export type TaskDetailResult = {
    id?: number;
    randomId?: number;
    tip?: number;
    status?: TaskStatusEnum;
    distance?: number;
    duration?: number;
    isDisrupted?: boolean;
    requestId?: number;
    paymentType?: PaymentType;
    servant?: ServantMiniInfo;
    member?: MemberResponse;
    origin?: LngLat;
    originName?: string | null;
    taskStatusLogs?: Array<TaskDetailLog> | null;
    taskStopLogDetail?: TaskStopLogDetail;
    taskRoutes?: Array<TaskRouteDto> | null;
    destinations?: Array<DestinationDto> | null;
    requestType?: RequestType;
    rawPrice?: number;
    discountAmount?: number;
    userPrice?: number;
    taskInvoice?: TaskInvoice;
};
