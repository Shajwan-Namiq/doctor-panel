/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { MemberPaymentTypeDto } from './MemberPaymentTypeDto';
import type { UserDto } from './UserDto';

export type MemberDto = {
    id?: number;
    price?: number;
    status?: number;
    location?: LocationPoint;
    locationAddress?: string | null;
    user?: UserDto;
    memberPaymentTypes?: Array<MemberPaymentTypeDto> | null;
};
