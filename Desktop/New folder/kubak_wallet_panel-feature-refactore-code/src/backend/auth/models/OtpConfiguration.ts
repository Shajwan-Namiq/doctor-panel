/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OtpCodeMessageTranslation } from './OtpCodeMessageTranslation';
import type { OtpServer } from './OtpServer';

export type OtpConfiguration = {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    id?: number;
    servers?: Array<OtpServer> | null;
    codeMessageTranslations?: Array<OtpCodeMessageTranslation> | null;
    codeExpirationTimeInMinutes?: number;
    codeInvalidationTimeInMinutes?: number;
    maxNumberOfAttempts?: number;
    maxNumberOfAttemptsDurationInMinutes?: number;
};
