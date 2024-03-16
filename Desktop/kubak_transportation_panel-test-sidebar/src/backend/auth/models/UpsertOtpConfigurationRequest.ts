/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OtpConfigurationCodeMessageTranslationRequest } from './OtpConfigurationCodeMessageTranslationRequest';
import type { OtpServersRequest } from './OtpServersRequest';

export type UpsertOtpConfigurationRequest = {
    otpServers: Array<OtpServersRequest>;
    codeExpirationTimeInMinutes: number;
    codeInvalidationTimeInMinutes: number;
    maxNumberOfAttempts: number;
    maxNumberOfAttemptsDurationInMinutes: number;
    codeMessageTranslations: Array<OtpConfigurationCodeMessageTranslationRequest>;
};
