/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantStatusEnum } from './ServantStatusEnum';

export type ListServantsResult = {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    readonly fullName?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    avatarUrl?: string | null;
    blocked?: boolean;
    createdAt?: string;
    averageRating?: number;
    status?: ServantStatusEnum;
};
