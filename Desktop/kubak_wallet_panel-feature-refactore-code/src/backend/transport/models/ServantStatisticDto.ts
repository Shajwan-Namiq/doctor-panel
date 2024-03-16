/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ServantStatisticDto = {
    id?: number;
    requestAlerts?: number;
    rejectedRequest?: number;
    ignoredRequest?: number;
    acceptedRequest?: number;
    outOfRangeRequest?: number;
    successTask?: number;
    canceledTask?: number;
    onlineDuration?: number;
    durationOnTask?: number;
    distanceOnTask?: number;
    tasksAmount?: number;
    tasksCommission?: number;
    dateTime?: string;
    servantId?: number;
    serviceId?: number;
};
