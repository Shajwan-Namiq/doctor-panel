/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MonthlyChartResponse = {
    year?: number;
    month?: number;
    readonly date?: string | null;
    requests?: number;
    noServantRequests?: number;
    noAcceptRequests?: number;
    canceledRequests?: number;
    successTasks?: number;
    canceledTasks?: number;
    onlineServants?: number;
    totalRequesters?: number;
};
