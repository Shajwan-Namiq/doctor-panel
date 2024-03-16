/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomMessageButtonRequest } from './CustomMessageButtonRequest';
import type { CustomMessageShowType } from './CustomMessageShowType';
import type { CustomMessageTranslationRequest } from './CustomMessageTranslationRequest';
import type { Language } from './Language';
import type { MobileAppType } from './MobileAppType';
import type { OptionalFileUpload } from './OptionalFileUpload';

export type CreateUpdateCustomMessageRequest = {
    isEnabled: boolean;
    isBlocker: boolean;
    startDate: string;
    expirationDate?: string | null;
    showType: CustomMessageShowType;
    spot: string;
    image?: OptionalFileUpload;
    buttons?: Array<CustomMessageButtonRequest> | null;
    translations?: Array<CustomMessageTranslationRequest> | null;
    isForDisabledUser?: boolean | null;
    regionIds?: Array<number> | null;
    baseRoleIds?: Array<number> | null;
    userIds?: Array<string> | null;
    languages?: Array<Language> | null;
    mobileAppType?: MobileAppType;
};
