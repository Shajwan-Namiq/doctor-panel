/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RouteToClientUpdateMessage = {
    requestId?: number;
    taskId?: number;
    routeToClient?: string | null;
    durationToClient?: number;
    distanceToClient?: number;
};
