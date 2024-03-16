/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationDto } from './DestinationDto';
import type { DiscountDto } from './DiscountDto';
import type { MemberDto } from './MemberDto';
import type { PaymentType } from './PaymentType';
import type { RequestStatusEnum } from './RequestStatusEnum';
import type { RequestType } from './RequestType';
import type { RequestTypeEnum } from './RequestTypeEnum';
import type { ServiceDto } from './ServiceDto';

export type RequestDto = {
    id?: number;
    reserveTime?: string | null;
    rawPrice?: number;
    kubakPrice?: number;
    userPrice?: number;
    discount?: DiscountDto;
    type?: RequestTypeEnum;
    requestType?: RequestType;
    status?: RequestStatusEnum;
    paymentType?: PaymentType;
    serviceId?: number;
    service?: ServiceDto;
    requester?: MemberDto;
    destinations?: Array<DestinationDto> | null;
    createdAt?: string;
};
