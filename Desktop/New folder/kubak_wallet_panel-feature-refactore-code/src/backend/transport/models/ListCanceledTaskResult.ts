/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberResponse } from './MemberResponse';
import type { ServantMiniInfo } from './ServantMiniInfo';
import type { TaskStatusEnum } from './TaskStatusEnum';

export type ListCanceledTaskResult = {
    id?: number;
    region?: string | null;
    canceledBy?: string | null;
    cancelReason?: string | null;
    price?: number;
    servant?: ServantMiniInfo;
    member?: MemberResponse;
    cancelStatus?: TaskStatusEnum;
};
