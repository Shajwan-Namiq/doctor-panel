/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LessonTranslationRequest } from './LessonTranslationRequest';
import type { MobileAppType } from './MobileAppType';

export type CreateUpdateLessonRequest = {
    translationRequest: Array<LessonTranslationRequest>;
    mobileAppType: MobileAppType;
};
