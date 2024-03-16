/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NotificationMessage } from './NotificationMessage';
import type { PanelPushNotificationType } from './PanelPushNotificationType';
import type { PushNotificationButtonRequest } from './PushNotificationButtonRequest';

export type SendPanelPushNotificationRequest = {
    type: PanelPushNotificationType;
    route?: string | null;
    messages?: Array<NotificationMessage> | null;
    userIds?: Array<string> | null;
    baseRoleIds?: Array<number> | null;
    regionIds?: Array<number> | null;
    groupIds?: Array<number> | null;
    expirationDate?: string | null;
    button?: PushNotificationButtonRequest;
    scheduledTo?: string | null;
};
