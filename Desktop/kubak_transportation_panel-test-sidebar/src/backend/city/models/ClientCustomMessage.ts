/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCustomMessageButton } from './ClientCustomMessageButton';
import type { CustomMessageShowType } from './CustomMessageShowType';

export type ClientCustomMessage = {
    id?: string | null;
    isBlocker?: boolean;
    showType?: CustomMessageShowType;
    spot?: string | null;
    imageUrl?: string | null;
    title?: string | null;
    description?: string | null;
    buttons?: Array<ClientCustomMessageButton> | null;
};
