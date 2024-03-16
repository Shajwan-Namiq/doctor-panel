/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantDto } from './ServantDto';

export type ListServantsPerformancesResponse = {
    servant?: ServantDto;
    successTasks?: number;
    rating?: number | null;
};
