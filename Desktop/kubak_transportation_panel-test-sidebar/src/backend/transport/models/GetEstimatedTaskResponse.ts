/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Direction } from './Direction';
import type { EstimatedServiceResponse } from './EstimatedServiceResponse';

export type GetEstimatedTaskResponse = {
    directions?: Array<Direction> | null;
    services?: Array<EstimatedServiceResponse> | null;
    loan?: number;
};
