/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserMiniDto } from './UserMiniDto';

export type UserBlockDto = {
    id?: number;
    serviceTypeId?: number;
    userId?: string | null;
    user?: UserMiniDto;
    blockedByUserId?: string | null;
    blockedByUser?: UserMiniDto;
    blockedAt?: string;
    unblockedAt?: string | null;
};
