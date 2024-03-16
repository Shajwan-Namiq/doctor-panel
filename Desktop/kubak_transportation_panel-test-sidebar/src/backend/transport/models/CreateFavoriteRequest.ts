/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FavoriteType } from './FavoriteType';

export type CreateFavoriteRequest = {
    title: string;
    type: FavoriteType;
    lat: number;
    lng: number;
};
