/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountType } from './DiscountType';

export type LiveTaskStats = {
    taskId?: number;
    distance?: number;
    duration?: number;
    currentRawPrice?: number;
    stopCompensation?: number;
    discountAmount?: number;
    discountType?: DiscountType;
};
