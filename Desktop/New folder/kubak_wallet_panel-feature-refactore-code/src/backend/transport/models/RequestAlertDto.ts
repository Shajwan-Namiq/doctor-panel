/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantAlertModel } from './ServantAlertModel';

export type RequestAlertDto = {
    gapNumber?: number;
    gapRadius?: number;
    servants?: Array<ServantAlertModel> | null;
};
