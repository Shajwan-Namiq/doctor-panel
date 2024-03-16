/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetServantSessionItem } from './GetServantSessionItem';
import type { TimeSpan } from './TimeSpan';

export type GetServantSessions = {
    id?: number;
    totalOnlineTime?: TimeSpan;
    date?: string | null;
    items?: Array<GetServantSessionItem> | null;
};
