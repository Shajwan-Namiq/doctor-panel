/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServicePanelDto } from './ServicePanelDto';
import type { UserMiniDto } from './UserMiniDto';

export type PanelUserDto = {
    id?: number;
    userId?: string | null;
    user?: UserMiniDto;
    servicePanels?: Array<ServicePanelDto> | null;
};
