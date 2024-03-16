/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type OtpCodeMessageTranslation = {
    id?: number;
    language?: Language;
    message?: string | null;
    otpConfigurationId?: number;
};
