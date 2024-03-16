/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseRoleDto } from './BaseRoleDto';
import type { GroupDto } from './GroupDto';
import type { PanelNotificationMessageLog } from './PanelNotificationMessageLog';
import type { PanelPushNotificationStatus } from './PanelPushNotificationStatus';
import type { PanelPushNotificationType } from './PanelPushNotificationType';
import type { PushNotificationButton } from './PushNotificationButton';
import type { RegionDto } from './RegionDto';
import type { UserMiniDto } from './UserMiniDto';

export type PushNotificationLogDto = {
    id?: number;
    successCount?: number;
    failureCount?: number;
    date?: string;
    expirationDate?: string | null;
    type?: PanelPushNotificationType;
    scheduledTo?: string | null;
    status?: PanelPushNotificationStatus;
    route?: string | null;
    button?: PushNotificationButton;
    messages?: Array<PanelNotificationMessageLog> | null;
    users?: Array<UserMiniDto> | null;
    regions?: Array<RegionDto> | null;
    baseRoles?: Array<BaseRoleDto> | null;
    groups?: Array<GroupDto> | null;
};
