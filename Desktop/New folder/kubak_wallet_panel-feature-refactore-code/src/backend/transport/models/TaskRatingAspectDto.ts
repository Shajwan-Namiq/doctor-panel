/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleType } from './RoleType';
import type { TaskRatingAspectTranslationDto } from './TaskRatingAspectTranslationDto';

export type TaskRatingAspectDto = {
    id?: number;
    raterRole?: RoleType;
    ratedRole?: RoleType;
    weight?: number;
    translations?: Array<TaskRatingAspectTranslationDto> | null;
};
