/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiscountCodeDto } from './DiscountCodeDto';
import type { DiscountOfferDto } from './DiscountOfferDto';
import type { DiscountType } from './DiscountType';
import type { UserDto } from './UserDto';

export type DiscountDto = {
    id?: number;
    discountAmount?: number;
    discountValue?: number;
    discountType?: DiscountType;
    count?: number;
    discountCodeId?: number;
    discountCode?: DiscountCodeDto;
    discountOfferId?: number;
    discountOffer?: DiscountOfferDto;
    userId?: string | null;
    user?: UserDto;
};
