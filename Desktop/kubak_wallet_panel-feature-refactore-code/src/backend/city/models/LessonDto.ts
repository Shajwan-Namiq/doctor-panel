/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LessonTranslationDto } from './LessonTranslationDto';
import type { MobileAppType } from './MobileAppType';

export type LessonDto = {
    id?: number;
    order?: number;
    translations?: Array<LessonTranslationDto> | null;
    mobileAppType?: MobileAppType;
};
