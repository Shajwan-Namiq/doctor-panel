/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PanelPushNotificationType } from './PanelPushNotificationType';
import type { PushNotificationButton } from './PushNotificationButton';

export type ClientNotificationMessage = {
    id?: number;
    title?: string | null;
    subTitle?: string | null;
    description?: string | null;
    type?: PanelPushNotificationType;
    route?: string | null;
    imageUrl?: string | null;
    date?: string;
    button?: PushNotificationButton;
    seen?: boolean;
};
