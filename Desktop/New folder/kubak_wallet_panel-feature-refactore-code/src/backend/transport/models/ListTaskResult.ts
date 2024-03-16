/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberResponse } from './MemberResponse';
import type { ServantMiniInfo } from './ServantMiniInfo';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type ListTaskResult = {
    id?: number;
    randomId?: number;
    requestId?: number;
    userPaidPrice?: number;
    tip?: number;
    status?: TaskStatusEnum;
    createdAt?: string | null;
    distance?: number | null;
    duration?: number | null;
    servant?: ServantMiniInfo;
    member?: MemberResponse;
};
