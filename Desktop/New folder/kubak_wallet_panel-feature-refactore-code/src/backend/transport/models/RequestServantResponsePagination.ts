/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RequestServantResponse } from './RequestServantResponse';

export type RequestServantResponsePagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<RequestServantResponse> | null;
};
