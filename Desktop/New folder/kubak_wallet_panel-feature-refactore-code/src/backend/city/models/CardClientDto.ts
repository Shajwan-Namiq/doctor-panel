/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardLinkType } from './CardLinkType';
import type { CardType } from './CardType';

export type CardClientDto = {
    id?: number;
    title?: string | null;
    link?: string | null;
    linkType?: CardLinkType;
    imgUrl?: string | null;
    type?: CardType;
};
