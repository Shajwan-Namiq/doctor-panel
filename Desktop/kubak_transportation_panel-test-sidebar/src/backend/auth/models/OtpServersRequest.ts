/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SmsProvider } from './SmsProvider';

export type OtpServersRequest = {
    provider: SmsProvider;
    order: number;
    isEnabled: boolean;
    positivePattern?: string | null;
    negativePattern?: string | null;
};
