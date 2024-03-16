/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PolicyDto } from './PolicyDto';

export type BaseRoleDto = {
    id?: number;
    name?: string | null;
    policies?: Array<PolicyDto> | null;
};
