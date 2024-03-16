/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardType } from './CardType';
import type { CreateCardTranslationRequest } from './CreateCardTranslationRequest';
import type { Language } from './Language';
import type { MobileAppType } from './MobileAppType';

export type CreateCardRequest = {
    name: string;
    type: CardType;
    startDate: string;
    expireDate?: string | null;
    translations?: Array<CreateCardTranslationRequest> | null;
    isEnabled?: boolean;
    regionIds?: Array<number> | null;
    baseRoleIds?: Array<number> | null;
    languages?: Array<Language> | null;
    mobileAppType?: MobileAppType;
};
