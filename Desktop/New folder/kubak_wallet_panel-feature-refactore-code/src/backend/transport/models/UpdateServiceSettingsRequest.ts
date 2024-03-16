/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateServiceSettingsRequest = {
    servantGettingCloseToClientNotifyRangeInMeter: number;
    userRequestLimit: number;
    userRequestLimitTimeToLiveInSecond: number;
    liveTaskStateUpdateRetrievalInSecond: number;
    dynamicInTaskServantRouteUpdateRetrievalInSecond: number;
    ableToReviewTaskDurationInDays: number;
    maxDistanceToArrive: number;
    distanceToUpdateServantDynamicRouteInMeter: number;
    removeCanceledTaskAndRequestDelayInMinute: number;
    removeCompletedTaskAndRequestDelayInMinute: number;
};
