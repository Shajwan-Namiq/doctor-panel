/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SmsProvider } from './SmsProvider';

export type OtpServer = {
    id?: number;
    provider?: SmsProvider;
    order?: number;
    isEnabled?: boolean;
    successMessagesCount?: number;
    failedMessagesCount?: number;
    otpConfigurationId?: number;
    positivePattern?: string | null;
    negativePattern?: string | null;
};
