/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NotifyServantPreferenceDto = {
    id?: number;
    firstDuration?: number;
    gapDuration?: number;
    gapDistance?: number;
    maxNewRequestAlertAllowedDistance?: number;
    defaultNewRequestAlertDistance?: number;
    minNewRequestAlertAllowedDistance?: number;
    requestTtl?: number;
    serviceId?: number;
};
