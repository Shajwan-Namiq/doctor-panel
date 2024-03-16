/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelReasonTranslationDto } from './CancelReasonTranslationDto';
import type { RoleDto } from './RoleDto';

export type CancelReasonDto = {
    id?: number;
    roleId?: number;
    translations?: Array<CancelReasonTranslationDto> | null;
    role?: RoleDto;
};
