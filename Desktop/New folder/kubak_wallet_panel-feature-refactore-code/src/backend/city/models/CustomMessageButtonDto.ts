/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomMessageButtonTranslationDto } from './CustomMessageButtonTranslationDto';
import type { CustomMessageButtonType } from './CustomMessageButtonType';

export type CustomMessageButtonDto = {
    id?: number;
    type?: CustomMessageButtonType;
    url?: string | null;
    color?: string | null;
    translations?: Array<CustomMessageButtonTranslationDto> | null;
    customMessageId?: number;
};
