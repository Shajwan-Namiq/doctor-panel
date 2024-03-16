/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Currency } from './Currency';
import type { WalletType } from './WalletType';

export type ListWalletResult = {
    walletId?: number;
    balance?: number;
    currency?: Currency;
    type?: WalletType;
    userId?: string | null;
    userDisplayName?: string | null;
    userPhoneNumber?: string | null;
    userPhotoUrl?: string | null;
};
