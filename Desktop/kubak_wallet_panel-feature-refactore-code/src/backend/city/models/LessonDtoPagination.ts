/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LessonDto } from './LessonDto';

export type LessonDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<LessonDto> | null;
};
