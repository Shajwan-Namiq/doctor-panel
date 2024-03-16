/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantDeviceType } from './ServantDeviceType';

export type ServantDeviceDto = {
    id?: number;
    deviceId?: string | null;
    deviceName?: string | null;
    type?: ServantDeviceType;
    servantId?: number;
};
