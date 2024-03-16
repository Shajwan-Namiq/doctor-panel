/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationRequest } from './TranslationRequest';

export type CreateUpdateCancelReasonRequest = {
    roleId: number;
    translations: Array<TranslationRequest>;
};
