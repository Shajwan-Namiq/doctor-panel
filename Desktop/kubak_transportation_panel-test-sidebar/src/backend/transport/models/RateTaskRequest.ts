/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RateTaskAspectRequest } from './RateTaskAspectRequest';

export type RateTaskRequest = {
    taskId: number;
    aspects: Array<RateTaskAspectRequest>;
};
