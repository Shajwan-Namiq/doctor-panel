/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';

export type PanelNotificationMessageLog = {
    id?: number;
    language?: Language;
    title?: string | null;
    subTitle?: string | null;
    description?: string | null;
    imageUrl?: string | null;
};
