/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServicePanelType } from './ServicePanelType';

export type ServicePanelDto = {
    id?: number;
    type?: ServicePanelType;
    url?: string | null;
};
