/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Currency } from './Currency';
import type { UserDto } from './UserDto';
import type { WalletType } from './WalletType';

export type WalletDto = {
    id?: number;
    balance?: number;
    currency?: Currency;
    type?: WalletType;
    userId?: string | null;
    user?: UserDto;
};
