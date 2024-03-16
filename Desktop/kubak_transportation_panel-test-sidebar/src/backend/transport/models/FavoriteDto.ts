/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FavoriteType } from './FavoriteType';

export type FavoriteDto = {
    id?: number;
    title?: string | null;
    type?: FavoriteType;
    lat?: number;
    lng?: number;
};
