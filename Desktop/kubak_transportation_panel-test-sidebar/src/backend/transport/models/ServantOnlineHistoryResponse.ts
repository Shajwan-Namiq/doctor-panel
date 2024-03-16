/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ServantOnlineHistoryResponse = {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    readonly fullName?: string | null;
    onlineDurationInHours?: string | null;
    onlineDurationInSeconds?: number;
    inTaskDurationInHours?: string | null;
    inTaskDurationInSeconds?: number;
    totalDurationInHours?: string | null;
};
