/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BlockedServantDto = {
    id?: number;
    servantId?: number;
    serviceTypeId?: number;
    blockedByUserId?: string | null;
    blockedAt?: string;
    unblockedAt?: string | null;
};
