/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomMessageButtonTranslationRequest } from './CustomMessageButtonTranslationRequest';
import type { CustomMessageButtonType } from './CustomMessageButtonType';

export type CustomMessageButtonRequest = {
    type: CustomMessageButtonType;
    url?: string | null;
    color?: string | null;
    translations?: Array<CustomMessageButtonTranslationRequest> | null;
};
