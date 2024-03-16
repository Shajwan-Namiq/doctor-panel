/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantWalletLoanThresholdDirection } from './ServantWalletLoanThresholdDirection';
import type { WalletLoanThresholdActionType } from './WalletLoanThresholdActionType';

export type ServantWalletLoanThresholdActionRequest = {
    threshold: number;
    direction: ServantWalletLoanThresholdDirection;
    actionType: WalletLoanThresholdActionType;
};
