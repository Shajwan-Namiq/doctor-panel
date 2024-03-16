/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationPoint } from './LocationPoint';
import type { ServantStatusEnum } from './ServantStatusEnum';
import type { ServiceTypeDto } from './ServiceTypeDto';

export type ServantStatusLogDto = {
    id?: number;
    status?: ServantStatusEnum;
    location?: LocationPoint;
    date?: string;
    serviceId?: number;
    serviceType?: ServiceTypeDto;
};
