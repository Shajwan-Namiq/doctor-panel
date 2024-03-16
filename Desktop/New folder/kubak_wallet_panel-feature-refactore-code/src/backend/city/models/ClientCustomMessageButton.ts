/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomMessageButtonType } from './CustomMessageButtonType';

export type ClientCustomMessageButton = {
    type?: CustomMessageButtonType;
    url?: string | null;
    color?: string | null;
    title?: string | null;
};
