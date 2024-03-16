/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCustomMessage } from './ClientCustomMessage';

export type GetClientCustomMessageResult = {
    customMessages?: Array<ClientCustomMessage> | null;
    removeCachedCustomMessages?: Array<string> | null;
    clearAllCustomMessages?: boolean;
};
