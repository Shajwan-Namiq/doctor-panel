/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ServiceSettingsDto = {
    id?: number;
    servantGettingCloseToClientNotifyRangeInMeter?: number;
    userRequestLimit?: number;
    userRequestLimitTimeToLiveInSecond?: number;
    liveTaskStateUpdateRetrievalInSecond?: number;
    dynamicInTaskServantRouteUpdateRetrievalInSecond?: number;
    ableToRateTaskDurationInDays?: number;
    maxDistanceToArrive?: number;
    distanceToUpdateServantDynamicRouteInMeter?: number;
    removeCanceledTaskAndRequestDelayInMinute?: number;
    removeCompletedTaskDelayInMinute?: number;
    serviceId?: number;
};
