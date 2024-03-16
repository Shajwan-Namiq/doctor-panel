/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationDto } from './DestinationDto';
import type { Gender } from './Gender';
import type { LocationPoint } from './LocationPoint';
import type { PaymentType } from './PaymentType';
import type { RequestType } from './RequestType';
import type { ServantStatusEnum } from './ServantStatusEnum';
import type { TaskStopLogDetail } from './TaskStopLogDetail';
import type { TripStatusEnum } from './TripStatusEnum';

export type TripStatusDetail = {
    requestId?: number;
    taskId?: number | null;
    tripStatus?: TripStatusEnum;
    requestType?: RequestType;
    paymentType?: PaymentType;
    discountName?: string | null;
    clientId?: string | null;
    clientName?: string | null;
    clientPhoneNumber?: string | null;
    clientPhotoUrl?: string | null;
    clientGender?: Gender;
    sourceLocation?: LocationPoint;
    sourceLocationName?: string | null;
    destinations?: Array<DestinationDto> | null;
    rawPrice?: number;
    discountedPrice?: number | null;
    servantId?: number | null;
    servantUserId?: string | null;
    servantStatus?: ServantStatusEnum;
    servantAddress?: string | null;
    servantFullName?: string | null;
    servantPhoneNumber?: string | null;
    servantAvatarUrl?: string | null;
    servantRegionName?: string | null;
    servantCurrentLocation?: LocationPoint;
    vehicleModel?: string | null;
    vehiclePlaque?: string | null;
    taskStatusLogDetail?: TaskStopLogDetail;
};
