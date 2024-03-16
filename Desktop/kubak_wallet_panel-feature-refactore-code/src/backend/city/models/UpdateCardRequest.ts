/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardType } from './CardType';
import type { Language } from './Language';
import type { MobileAppType } from './MobileAppType';
import type { UpdateCardTranslationRequest } from './UpdateCardTranslationRequest';

export type UpdateCardRequest = {
    name: string;
    type: CardType;
    startDate: string;
    expireDate?: string | null;
    translations?: Array<UpdateCardTranslationRequest> | null;
    isEnabled?: boolean;
    regionIds?: Array<number> | null;
    baseRoleIds?: Array<number> | null;
    languages?: Array<Language> | null;
    mobileAppType?: MobileAppType;
};
