/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';

export type ServantUpdateLocationRequest = {
    location: LocationPoint;
    speed: number;
    deviceId: string;
};
