/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AggregatedRequest } from './AggregatedRequest';

export type ListAggregatedRequestResult = {
    userId?: string | null;
    name?: string | null;
    phoneNumber?: string | null;
    requests?: Array<AggregatedRequest> | null;
    allRequestsCount?: number;
    acceptedRequestsCount?: number;
    timedOutRequestsCount?: number;
    cancelledRequestsCount?: number;
    lastRequestAt?: string;
};
