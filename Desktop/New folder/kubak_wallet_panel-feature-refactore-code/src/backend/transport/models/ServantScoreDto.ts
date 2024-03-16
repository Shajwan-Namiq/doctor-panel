/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskRatingAspectDto } from './TaskRatingAspectDto';

export type ServantScoreDto = {
    id?: number;
    servantId?: number;
    totalRateValues?: number;
    numberOfRates?: number;
    readonly averageScore?: number;
    taskRatingAspectId?: number;
    taskRatingAspect?: TaskRatingAspectDto;
};
