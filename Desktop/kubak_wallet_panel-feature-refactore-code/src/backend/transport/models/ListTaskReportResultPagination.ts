/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListTaskReportResult } from './ListTaskReportResult';

export type ListTaskReportResultPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<ListTaskReportResult> | null;
};
