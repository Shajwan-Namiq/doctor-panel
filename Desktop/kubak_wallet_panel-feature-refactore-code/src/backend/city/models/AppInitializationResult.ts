/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GetClientCustomMessageResult } from './GetClientCustomMessageResult';
import type { SupportNumberDto } from './SupportNumberDto';

export type AppInitializationResult = {
    customMessages?: GetClientCustomMessageResult;
    supportNumber?: Array<SupportNumberDto> | null;
};
