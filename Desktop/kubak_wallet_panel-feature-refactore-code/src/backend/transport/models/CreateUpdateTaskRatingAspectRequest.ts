/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskRatingAspectTranslationRequest } from './TaskRatingAspectTranslationRequest';

export type CreateUpdateTaskRatingAspectRequest = {
    weight?: number;
    raterRole: RoleType;
    ratedRole: RoleType;
    translations: Array<TaskRatingAspectTranslationRequest>;
    serviceIds?: Array<number> | null;
};
