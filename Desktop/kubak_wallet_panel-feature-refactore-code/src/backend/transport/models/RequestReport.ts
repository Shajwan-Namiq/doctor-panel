/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RequestReport = {
    totalRequests?: number;
    noServantRequests?: number;
    canceledRequests?: number;
    timedOutRequests?: number;
    singleDestinationRequests?: number;
    multiDestinationRequests?: number;
    withDestinationRequests?: number;
    withoutDestinationRequests?: number;
    numberOfRequesters?: number;
};
