/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChangeDestinationRequestStatus } from './ChangeDestinationRequestStatus';
import type { ChangeDestinationRequestStatusLogDto } from './ChangeDestinationRequestStatusLogDto';

export type ChangeDestinationRequestDto = {
    id?: string;
    taskId?: number;
    status?: ChangeDestinationRequestStatus;
    logs?: Array<ChangeDestinationRequestStatusLogDto> | null;
};
