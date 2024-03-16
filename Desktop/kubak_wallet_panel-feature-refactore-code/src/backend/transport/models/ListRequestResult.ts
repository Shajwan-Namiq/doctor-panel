/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberResponse } from './MemberResponse';
import type { RequestType } from './RequestType';
import type { TripStatusEnum } from './TripStatusEnum';

export type ListRequestResult = {
    id?: number;
    rawPrice?: number;
    userPrice?: number;
    sourceLocationName?: string | null;
    type?: RequestType;
    statusEnum?: TripStatusEnum;
    createdAt?: string;
    requester?: MemberResponse;
};
