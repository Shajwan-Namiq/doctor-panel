/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PushNotificationLogDto } from './PushNotificationLogDto';

export type PushNotificationLogDtoPagination = {
    readonly remainingItems?: number;
    count?: number;
    readonly page?: number;
    readonly limit?: number;
    readonly metadata?: any;
    items?: Array<PushNotificationLogDto> | null;
};
